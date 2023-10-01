'use strict';
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { dict } from '@/global/translation';
import Link from 'next/link';
import 'react-datepicker/dist/react-datepicker.css';
import { Doctor, Appointment, HealthCenter, Patient, Prescription, Problem, TimeSlot } from '@/app/models/dbModels';


const divisions = ["ময়মনসিংহ", "বরিশাল", "চট্টগ্রাম", "ঢাকা", "খুলনা", "রাজশাহী", "রংপুর", "সিলেট"];
const upozillas = ["ময়মনসিংহ সদর", "মুক্তাগাছা", "ভালুকা", "হালুয়াঘাট", "গৌরীপুর", "ধোবাউড়া", "ফুলবাড়িয়া ", "গফরগাঁও", "ত্রিশাল", "ফুলপুর", "নান্দাইল", "ঈশ্বরগঞ্জ"];
const districts = ["ময়মনসিংহ", "নেত্রকোণা", "শেরপুর", "জামালপুর"];
const doctor_type = ["MBBS", "BDS"];
const departments = [
  "Medicine",
  "Neuromedicine",
  "Physical Medicine",
  "Surgery",
  "Neurosurgery",
  "Pediatric Surgery",
  "Orthopedic Surgery",
  "Burn Plastic & Reconstructive Surgery",
  "Dermatology",
  "Nephrology",
  "Psychiatry",
  "Cardiology & CCU",
  "Pediatrics",
  "Medical Oncology",
  "Gastroenterology",
  "Radiology & Imaging",
  "Anesthesiology",
  "Traumatology",
  "Urology",
  "ENT",
  "Ophthalmology",
  "Gynae & Obstetrics",
  "Transfusion Medicine",
  "Pediatric Nephrology",
  "Hepatology",
  "Neurology"
];

const classnames = {
  "textbox": "py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-500 placeholder-opacity-90"
}

export default function NewAppointmentPatient() {
  // Define state variables for input fields
  const [description, setDescription] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upozilla, setUpozilla] = useState('');
  const [doctorType, setDoctorType] = useState('');
  const [department, setDepartment] = useState('');
  const [aiSuggestion, setAISuggestion] = useState("");
  const [aiSuggestionFetched, setAISuggestionFetched] = useState(false);
  const initialDoctors: Doctor[] = [
    {
      id: 1,
      email: "",
      password: "",
      name: "1",
      contact_no: "",
      doctor_type: "",
      department: "",
      designation: "",
      institution: "",
      degrees: "",
      chamber_location: "",
      bmdc_registration_no: "", // Change to a number if it should be a number
      bmdc_registration_year: "",
      bio: "",
      photo: [], // Provide actual image data here if needed
      timeSlot: [
        { time: "1", max_count: 0 },
        { time: "2", max_count: 0 },

      ] as TimeSlot[],
    }, {
      id: 2,
      email: "",
      password: "",
      name: "2",
      contact_no: "",
      doctor_type: "",
      department: "",
      designation: "",
      institution: "",
      degrees: "",
      chamber_location: "",
      bmdc_registration_no: "", // Change to a number if it should be a number
      bmdc_registration_year: "",
      bio: "",
      photo: [], // Provide actual image data here if needed
      timeSlot: [
        { time: "1", max_count: 0 },
        { time: "2", max_count: 0 },

      ] as TimeSlot[],
    },
  ]
  const [suggestedDoctors, setSuggestedDoctors] = useState(initialDoctors)
  const [doctorFetched, setDoctorFetched] = useState(false)
  const initiaHCenters: HealthCenter[] = [
    {
      id: 1,
      email: "",
      password: "",
      name: "1",
      contact_no: "",
      division: "",
      district: "",
      upozilla: "",
      photo: [],
      timeSlot: [
        { time: "", max_count: 0 },
      ] as TimeSlot[],
    },
    {
      id: 2,
      email: "",
      password: "",
      name: "2",
      contact_no: "",
      division: "",
      district: "",
      upozilla: "",
      photo: [],
      timeSlot: [
        { time: "", max_count: 0 },
      ] as TimeSlot[],
    },
  ]
  const [suggestedHCenters, setSuggestedHCenters] = useState(initiaHCenters)
  const [hCenterFetched, setHCenterFetched] = useState(false)

  // Function to handle input field change and update state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, stateUpdater: (value: string) => void): void => {
    const value = event.target.value;
    stateUpdater(value);
  };

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const ui2ApiAtrrNameMap: {
      [key: string
      ]: string
    } = {
      "af-account-description": "description",

      "af-account-doctor-type": "doctor_type",
      "af-account-department": "blood_group",

      "af-account-division": "division",
      "af-account-district": "district",
      "af-account-upozilla": "upozilla",
    };

    const formData = new FormData(event.currentTarget)

    let drKey = null;
    let hcKey = null;

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("dr-select-checkbox-")) {
        drKey = key;
      } else if (key.startsWith("hc-select-checkbox-")) {
        hcKey = key;
      }
    }

    if (drKey !== null) {
      formData.delete(drKey);
    }
    if (hcKey !== null) {
      formData.delete(hcKey);
    }

    const drMatch = drKey?.match(/dr-select-checkbox-(\d+)-(\d+)/);
    const hcMatch = hcKey?.match(/hc-select-checkbox-(\d+)/);

    const drID = drMatch ? drMatch[1] : null;
    const drTimeSlotIdx = drMatch ? drMatch[2] : null;
    const hcID = hcMatch ? hcMatch[1] : null;

    console.log("drID: " + drID)
    console.log("drTimeSlotIdx: " + drTimeSlotIdx)
    console.log("hcID: " + hcID)

    for (const uiAttrName in ui2ApiAtrrNameMap) {
      let apiAttrName = ui2ApiAtrrNameMap[uiAttrName]
      let data = formData.get(uiAttrName)?.toString() || ''
      formData.delete(uiAttrName)
      if (uiAttrName != "af-account-confirm-password")
        formData.append(apiAttrName, data)
    }

    // use the formdata data
    // use drID, drTimeSlotIdx in suggestedDoctors to get the doctor and their time slot
    // use hcID in similar way in suggestedHCenters
    // do the api request
    // reply e server ki dibe eta significant kisu? idk ota diye ki korte hobe


    console.log(JSON.stringify(Object.fromEntries(formData)))
    // console.log(data)
  }

  /***************** <TUBA> *****************/

  async function handleAiCall() {
    console.log(description)
    if (description == "") {
      setAISuggestion("এআই সাজেশন জেনারেট করার জন্য অনুগ্রহ করে রোগের বিবরণ প্রদান করুন।")
      setAISuggestionFetched(true)
      return
    }
    else {
      // fetch the ai responmse
      // store that response in aiSuggestion using setAISuggestion
      const response = await fetch('http://localhost:8080/api/doctor/departmentSuggestion?problem=headache', {
        method: 'GET',
      })

      alert("Generating")
      // Handle response if necessary
      const data = await response.text()
      //console.log(JSON.stringify(Object.fromEntries(formData)))
      console.log(data)
      setAISuggestion(data.toString())
      console.log(aiSuggestion);
      setAISuggestionFetched(true)
    }
  }

  async function handleFetchDoctorsByDept() {
    setDoctorType("MBBS")
    setDepartment("Medicine")
    console.log(doctorType)
    console.log(department)
    const url = `http://localhost:8080/api/doctor/doctorsByDepartmentAndType?type=${doctorType}&dept=${department}`;

    // fetch the doctor info
    // store that info into suggestedDoctors

    setDoctorFetched(true)
  }

  async function handleFetchHCenters() {
    console.log(division)
    console.log(district)
    console.log(upozilla)

    setDivision("ময়মনসিংহ")
    setDistrict("ময়মনসিংহ")
    setUpozilla("ভালুকা")

    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTYxMzQ1NjksImV4cCI6MTY5NjE0ODk2OSwiSWQiOjMwMiwiZW1haWwiOiJtdWppYnVsMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJwYXRpZW50In0.SM0-VO6GQGvf2rQGU7TmsnlU-c6RC6_u_NGuPd_ShyY'



    // fetch the HCenter info
    // store that info into suggestedHCenters
    const response = await fetch(`http://localhost:8080/api/healthCenter/hcByAddrss?div=${division}&dist=${district}&upo=${upozilla}`, {
      method: 'GET',

    })
    alert("Searching")
    // Handle response if necessary
    const data = await response.json()
    //console.log(JSON.stringify(Object.fromEntries(formData)))
    console.log(data)

    setSuggestedHCenters(data)
    setHCenterFetched(true)
  }




  //appointment create korar function koi??

  /***************** </TUBA> *****************/

  return (
    <>
      {/* <!-- Card Section --> */}
      <div className="max-w-4xl z-50 h-full px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        {/* <!-- Card --> */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">

          <form
            onSubmit={(event) => onFormSubmit(event)}
          >
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className='col-span-12'>
                <div className="mb-4">
                  <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {"অসুস্থতার বিবরণ"}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {"রোগ নির্ণয়ে ডাক্তারের সুবিধায় জন্য অসুস্থতার বিবরণ প্রদান করুন"}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"রোগের বিবরণ"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-description"
                  name="af-account-description"
                  onChange={(e) => handleInputChange(e, setDescription)}
                  className={classnames.textbox}
                  rows={4} placeholder={"রোগের সংক্ষিপ্ত বিবরণ"}></textarea>
              </div>
              {/* <!-- End Col description--> */}


              {aiSuggestionFetched &&
                <div className="col-span-12">
                  <Link href="#">
                    <p className='pl-1 pb-1 text-green-500 font-mono font-normal hover:text-green-700'>✨ AI generated suggestion (experimental)</p>
                  </Link>
                  <div className="h-[36] flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="items-stretch">
                      <div className="p-8">
                        <p className="mt-2 text-gray-800 dark:text-gray-400">
                          {aiSuggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* End col AI suggestion */}

              <div className="flex col-span-12 justify-end">
                <button
                  type="button"
                  onClick={(e) => { handleAiCall() }}
                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                // onClick={(e) => { onClickFormSubmit }}
                >
                  এআই সাজেশন জেনারেট করুন
                </button>
              </div>

              {/* Divider */}
              <div className="col-span-12 my-4 border-b border-gray-900/10"></div>

              <div className='col-span-12'>
                <div className="mb-4">
                  <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {"ডাক্তার সিলেক্ট"}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {"আপনার পছন্দের ডাক্তার সিলেক্ট করুন"}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="af-account-doctor-type" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"ডাক্তারের শ্রেণি"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-doctor-type"
                    name="af-account-doctor-type"
                    onChange={(e) => handleInputChange(e, setDoctorType)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {doctor_type.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col doctor type--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-department" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"ডাক্তারের ডিপার্টমেন্ট"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-department"
                    name="af-account-department"
                    onChange={(e) => handleInputChange(e, setDepartment)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {departments.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="flex col-span-12 justify-end">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={(e) => { handleFetchDoctorsByDept() }}
                >
                  সার্চ করুন
                </button>
              </div>

              {doctorFetched &&
                <div className='col-span-12'>
                  <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400">সিলেক্ট</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">নাম</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">পদবি</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">প্রতিষ্ঠান</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">সময়</th>
                              </tr>
                            </thead>


                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                              {suggestedDoctors.map((doctor) => (
                                doctor.timeSlot?.map((timeSlot, index) => (
                                  <tr key={`${doctor.id}-${index}`}>
                                    <td className="flex flex-grow p-2 justify-center">
                                      <label htmlFor={`dr-select-checkbox-${doctor.id}-${index}`}>
                                        <input
                                          type="checkbox"
                                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                          id={`dr-select-checkbox-${doctor.id}-${index}`}
                                          name={`dr-select-checkbox-${doctor.id}-${index}`}
                                        />
                                      </label>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {doctor.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {doctor.designation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {doctor.institution}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {timeSlot.time}
                                    </td>
                                  </tr>
                                ))
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }


              <div className="col-span-12 my-4 border-b border-gray-900/10"></div>

              <div className='col-span-12'>
                <div className="mb-4">
                  <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {"হেলথ সেন্টার সিলেক্ট"}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {"নিকটস্থ হেলথ সেন্টার সিলেক্ট করুন"}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="af-account-division" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"বিভাগ"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-division"
                    name="af-account-division"
                    onChange={(event) => handleInputChange(event, setDivision)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {divisions.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col division--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-district" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"জেলা"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-district"
                    name="af-account-district"
                    onChange={(event) => handleInputChange(event, setDistrict)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {districts.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col district--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-upozilla" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"উপজেলা"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-upozilla"
                    name="af-account-upozilla"
                    onChange={(event) => handleInputChange(event, setUpozilla)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {upozillas.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col upozilla--> */}

              <div className="flex col-span-12 justify-end">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={(e) => { handleFetchHCenters() }}
                >
                  সার্চ করুন
                </button>
              </div>

              {hCenterFetched &&
                <div className='col-span-12'>
                  <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400">সিলেক্ট</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">নাম</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">ফোন নাম্বার</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">ইমেইল</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                              {suggestedHCenters.map((hCenter) => (
                                <tr key={`${hCenter.id}`}>
                                  <td className="flex flex-grow p-2 justify-center">
                                    <label htmlFor={`hc-select-checkbox-${hCenter.id}`}>
                                      <input
                                        type="checkbox"
                                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        id={`hc-select-checkbox-${hCenter.id}`}
                                        name={`hc-select-checkbox-${hCenter.id}`}
                                      />
                                    </label>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {hCenter.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {hCenter.contact_no}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {hCenter.email}
                                  </td>
                                </tr>
                              )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }


            </div>
            {/* <!-- End Grid --> */}

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                {dict.register_form.doctor.cancel}
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              // onClick={(e) => { onClickFormSubmit }}
              >
                {"অ্যাপয়েন্টমেন্ট তৈরি করুন"}
              </button>
            </div>
          </form>
        </div >
        {/* <!-- End Card --> */}
      </div >
      {/* <!-- End Card Section --> */}
    </>
  );
}
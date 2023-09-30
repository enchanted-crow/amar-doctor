'use strict';
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { dict } from '@/global/translation';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Doctor, Appointment, HealthCenter, Patient, Prescription, Problem, TimeSlot } from '@/app/models/dbModels';


const divisions = ["পুরুষ", "মহিলা", "অন্যান্য"];
const upozillas = ["A", "hajaribag"];
const districts = ["Dhaka", "Rangpur"];
const doctor_type = ["সাধারণ (MBBS)", "ডেন্টাল (BDS)"];
const departments = ["A", "hajaribag"];

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
  const [aiResponseFetched, setAIresponseFeteched] = useState(true);


  // Function to handle input field change and update state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, stateUpdater: (value: string) => void): void => {
    const value = event.target.value;
    stateUpdater(value);
  };

  const handleDateChange = (date: { preventDefault: () => void; }) => {
    // Prevent the default form submission behavior
    if (date && date.preventDefault) {
      date.preventDefault();
    }
    // Handle the selected date as needed
    // setDateOfBirth(date);
  };

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const ui2ApiAtrrNameMap: {
      [key: string
      ]: string
    } = {
      "af-account-full-name": "name",
      "af-account-email": "email",
      "af-account-password": "password",
      "af-account-confirm-password": "d",
      "af-account-phone": "contact_no",
      "af-account-gender": "sex",
      "af-account-blood-group": "blood_group",
      // "af-account-date-of-birth": "dob", // handled seperately
      "af-account-division": "division",
      "af-account-district": "district",
      "af-account-upozilla": "upozilla",
    };

    // console.log(JSON.stringify(dateOfBirth))

    const formData = new FormData(event.currentTarget)
    // formData.append("dob", JSON.stringify(dateOfBirth))

    for (const uiAttrName in ui2ApiAtrrNameMap) {
      let apiAttrName = ui2ApiAtrrNameMap[uiAttrName]
      let data = formData.get(uiAttrName)?.toString() || ''
      formData.delete(uiAttrName)
      if (uiAttrName != "af-account-confirm-password")
        formData.append(apiAttrName, data)
    }

    const response = await fetch('/api/patient/register', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    console.log(JSON.stringify(Object.fromEntries(formData)))
    // console.log(data)
  }

  /***************** <TUBA> *****************/

  async function handleAiCall() {
    console.log(description)


  }

  async function handleFetchDoctorsByDept() {
    console.log(doctorType)
    console.log(department)
  }

  async function handleFetchHCenters() {
    console.log(division)
    console.log(district)
    console.log(upozilla)
  }

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



              <div className="col-span-12">
                <Link href="#">
                  <p className='pl-1 pb-1 text-green-500 font-mono font-normal hover:text-green-700'>✨ AI generated suggestion (experimental)</p>
                </Link>
                <div className="h-[36] flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                  <div className="items-stretch">
                    <div className="p-8">
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {`রোগের বিবরণের উপর ভিত্তি করে আপনি নিচের প্রকারের ডাক্তারদের সাথে যোগাযোগ করতে পারেন।
                        ১। Cardiologist
                        ২। Gastrologist`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End col AI suggestion */}

              <div className="flex col-span-12 justify-end">
                <button
                  type="button"
                  onClick={(e) => { handleAiCall() }}
                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                // onClick={(e) => { onClickFormSubmit }}
                >
                  জেনারেট করুন
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
                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="dr-select-checkbox" >
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="dr-select-checkbox">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">John Brown</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">45</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                              {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a className="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                              </td> */}
                            </tr>

                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="dr-select-checkbox" className="p-2">
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="dr-select-checkbox">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Jim Green</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">27</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">London No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                            </tr>

                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="dr-select-checkbox" className="p-2">
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Joe Black</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">31</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Sidney No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">ঠিকানা</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">সময়</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="hc-select-checkbox" className="p-2">
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hc-select-checkbox">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">John Brown</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">45</td>
                            </tr>

                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="hc-select-checkbox" className="p-2">
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hc-select-checkbox">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Jim Green</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">London No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">27</td>
                            </tr>

                            <tr>
                              <td className="flex flex-grow p-2 justify-center">
                                <label htmlFor="hc-select-checkbox" className="p-2">
                                  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form">
                                  </input>
                                </label>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Joe Black</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Sidney No. 1 Lake Park</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">31</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




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
                {dict.register_form.doctor.create_account}
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
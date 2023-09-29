'use strict';
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { dict } from '@/global/translation';
import Link from 'next/link';

const doctor_type = ["MBBS", "BDS", "Psychology"];
const departments = ["A", "hajaribag"];
const genders = ["পুরুষ", "মহিলা", "অন্যান্য"];
const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const classnames = {
  "textbox": "py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-500 placeholder-opacity-90"
}

interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  startAmPm: string;
  endTime: string;
  endAmPm: string;
  personLimit: string;
}

interface MapStr2Str {
  [key: string]: string;
}

export default function RegisterDoctor() {
  // Define state variables for input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  // const [gender, setGender] = useState('');
  const [doctorType, setDoctorType] = useState('');
  const [department, setDepartment] = useState('');
  const [institution, setInstitution] = useState('');
  const [designation, setDesignation] = useState('');
  const [degrees, setDegrees] = useState('');
  const [bmdcRegNo, setBmdcRegNo] = useState('');
  const [bmdcRegYear, setBmdcRegYear] = useState('');
  const [chamberLocation, setChamberLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('../../../../public/images/signup/user_profile_picture_default.jpg');
  const initialTimeSlots: TimeSlot[] = [
    {
      id: 1,
      day: days[0],
      startTime: times[0],
      startAmPm: 'AM',
      endTime: times[0],
      endAmPm: 'AM',
      personLimit: "0",
    },
  ];
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  const addTimeSlot = () => {
    // Generate a unique ID for the new div
    const newId = Math.max(...timeSlots.map((slot) => slot.id), 0) + 1;

    const newSlot: TimeSlot = {
      id: newId, // You can use a unique ID generator
      day: days[0],
      startTime: times[0],
      startAmPm: 'AM',
      endTime: times[0],
      endAmPm: 'AM',
      personLimit: "0",
    };

    // Add a new div with the generated ID
    setTimeSlots([...timeSlots, newSlot]);
  };

  const removeTimeSlot = (idToRemove: number) => {
    // Filter out the div with the specified ID
    const updatedSlots = timeSlots.filter((slot) => slot.id !== idToRemove);
    setTimeSlots(updatedSlots);
  };

  // Function to handle input field change and update state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, stateUpdater: (value: string) => void): void => {
    const value = event.target.value;
    stateUpdater(value);
  };

  const handleTimeSlotInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string,
    slotId: number
  ): void => {
    const value = event.target.value;

    // Use slotId to find the correct time slot object in the array
    const updatedTimeSlots = timeSlots.map((slot) =>
      slot.id === slotId ? { ...slot, [fieldName]: value } : slot
    );

    // Update the state with the modified timeSlots array
    setTimeSlots(updatedTimeSlots);
  };


  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert("ok")

    const ui2ApiAtrrNameMap: { [key: string]: string } = {
      "af-account-full-name": "name",
      "af-account-email": "email",
      "af-account-password": "password",
      "af-account-confirm-password": "d",
      "af-account-phone": "contact_no",
      "af-account-gender": "gender", // GENDER YET NOT AVAILABLE IN BACKEND
      "af-account-type": "doctor_type",
      "af-account-department": "department",
      "af-account-institution": "institution",
      "af-account-designation": "designation",
      "af-account-degrees": "degrees",
      "af-account-bmdc-reg-no": "bmdc_registration_no",
      "af-account-bmdc-reg-year": "bmdc_registration_year",
      "af-account-chamber-location": "chamber_location",
      "af-account-bio": "bio",
      // "af-account-timeslots": "time_slot", // this has been handled seperately
    };

    function uiTimeslot2Api(ui_timeslot: TimeSlot) {
      let dayBn2EnApi: MapStr2Str = {}

      dayBn2EnApi = {
        "রবিবার": "Sunday",
        "সোমবার": "Monday",
        "মঙ্গলবার": "Tuesday",
        "বুধবার": "Wednesday",
        "বৃহস্পতিবার": "Thursday",
        "শুক্রবার": "Friday",
        "শনিবার": "Saturday"
      }

      function time12to24(startTime: string, startAmPm: string): string {
        let hours: number = +startTime
        if (startAmPm.toLowerCase() === 'pm' && hours !== 12) {
          hours += 12;
        } else if (startAmPm.toLowerCase() === 'am' && hours === 12) {
          hours = 0;
        }
        const formattedHours = hours.toString().padStart(2, '0');
        return formattedHours
      }

      let api_timeslot_time = ""
      // api_timeslot = ui_timeslot.id.toString();
      api_timeslot_time += dayBn2EnApi[ui_timeslot.day]
      api_timeslot_time += "_" + time12to24(ui_timeslot.startTime, ui_timeslot.startAmPm) + "_00"
      api_timeslot_time += "_" + time12to24(ui_timeslot.endTime, ui_timeslot.endAmPm) + "_00"

      let api_timeslot_max_count = ui_timeslot.personLimit

      return {
        "time": api_timeslot_time,
        "max_count": api_timeslot_max_count,
      }
    }

    const formData = new FormData(event.currentTarget)

    let apiTimeslots = []
    for (let timeSlot of timeSlots) {
      apiTimeslots.push(uiTimeslot2Api(timeSlot))
    }
    const timeSlotsJSON = JSON.stringify(apiTimeslots);
    formData.append('time_slot', timeSlotsJSON);

    let photoDummy = [1, 2]
    formData.append('photo', JSON.stringify(photoDummy));

    for (const uiAttrName in ui2ApiAtrrNameMap) {
      let apiAttrName = ui2ApiAtrrNameMap[uiAttrName]
      let data = formData.get(uiAttrName)?.toString() || ''
      formData.delete(uiAttrName)
      if (uiAttrName != "af-account-confirm-password")
        formData.append(apiAttrName, data)
      if (uiAttrName == "af-account-bmdc-reg-no" || uiAttrName == "af-account-bmdc-reg-year")
        formData.append(apiAttrName, data)
    }

    const response = await fetch('/api/doctor/register', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    console.log(JSON.stringify(Object.fromEntries(formData)))
    // console.log(data)
  }


  return (
    <>
      {/* <!-- Card Section --> */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              {dict.register_form.doctor.form_header}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {dict.register_form.doctor.form_description}
            </div>
          </div>

          <form onSubmit={(event) => onFormSubmit(event)}>
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.profile_photo}
                </label>
              </div>
              {/* <!-- End Profile photo} --> */}

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Image
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    height={200}
                    width={200}
                    src="/images/signup/user_profile_picture_default.jpg" // Used state variable
                    alt="Profile picture"
                  />
                  <div className="flex gap-x-2">
                    <div>
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                        {dict.register_form.doctor.upload_photo}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Col --> */}
              <div className="sm:col-span-3">
                <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.full_name}
                </label>
                {/* "Required" icon and button */}
                {/* <div className="hs-tooltip inline-block">
                  <button type="button" >
                    <svg className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg"
                      width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                </div> */}
                {/* </div> */}
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* First name */}
                  <input
                    id="af-account-full-name"
                    name="af-account-full-name"
                    type="text"
                    onChange={(e) => handleInputChange(e, setFullName)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_name}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-email" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.email}
                </label>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  name="af-account-email"
                  type="email"
                  onChange={(e) => handleInputChange(e, setEmail)}
                  className={classnames.textbox}
                  placeholder={dict.register_form.doctor.PH_email} >
                </input>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-password" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.password}
                </label>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    name="af-account-password"
                    type="text"
                    onChange={(e) => handleInputChange(e, setPassword)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_enter_password}>
                  </input>
                  <input
                    id="af-account-confirm-password"
                    name="af-account-confirm-password"
                    type="text"
                    onChange={(e) => handleInputChange(e, setConfirmPassword)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_confirm_password}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col --> */}

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label htmlFor="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                    {dict.register_form.doctor.phone}
                  </label>
                  {/* {' '}
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    {"(" + dict.register_form.doctor.optional + ')'}
                  </span> */}
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-phone"
                    name="af-account-phone"
                    type="text"
                    onChange={(e) => handleInputChange(e, setPhone)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_phone_number}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col phone--> */}

              {/* <div className="sm:col-span-3">
                <label htmlFor="af-account-gender" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.gender}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <select
                    id="af-account-gender"
                    name="af-account-gender"
                    onChange={(event) => handleInputChange(event, setGender)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {genders.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div> */}
              {/* <!-- End Col gender--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-type" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.doctor_type}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-type"
                    name="af-account-type"
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
                  {dict.register_form.doctor.department}
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

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label htmlFor="af-account-institution" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                    {dict.register_form.doctor.institution}
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-institution"
                    name="af-account-institution"
                    type="text"
                    onChange={(e) => handleInputChange(e, setInstitution)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_institution}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col institution --> */}

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label htmlFor="af-account-designation" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                    {dict.register_form.doctor.designation}
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-designation"
                    name="af-account-designation"
                    type="text"
                    onChange={(e) => handleInputChange(e, setDesignation)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_designation}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col designation --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-degrees" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.degrees}
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-degrees"
                  name="af-account-degrees"
                  onChange={(e) => handleInputChange(e, setDegrees)}
                  className={classnames.textbox}
                  rows={3} placeholder={dict.register_form.doctor.PH_degrees}></textarea>
              </div>
              {/* <!-- End Col Degrees --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-time-slots" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.time_slot}
                </label>
              </div>

              <div className="sm:col-span-9">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex flex-col w-full">
                    {/* First three selects in one line */}
                    <div className="flex w-full">
                      <label htmlFor={`af-account-days-${slot.id}`} className="flex-grow py-2 pr-3 mr-2">
                        <select
                          className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          id={`af-account-days-${slot.id}`}
                          onChange={(e) =>
                            handleTimeSlotInputChange(e, 'day', slot.id) // Pass 'day' as fieldName
                          }
                        >
                          {days.map(function (data) {
                            return <option key={data} value={data}> {data}</option>;
                          })}
                        </select>
                      </label>
                      <div className="pt-4 mr-2">শুরু</div>
                      <label htmlFor={`af-account-begin-time-${slot.id}`} className="flex-grow py-2 pl-3 mr-2">
                        <select
                          id={`af-account-begin-time-${slot.id}`}
                          onChange={(e) =>
                            handleTimeSlotInputChange(e, 'startTime', slot.id) // Pass 'day' as fieldName
                          }
                          className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          {times.map(function (data) {
                            return <option key={data} value={data}> {data}</option>;
                          })}
                        </select>
                      </label>
                      <label htmlFor={`af-account-begin-am-pm-${slot.id}`} className="flex-grow py-2">
                        <select
                          id={`af-account-begin-am-pm-${slot.id}`}
                          onChange={(e) =>
                            handleTimeSlotInputChange(e, 'startAmPm', slot.id) // Pass 'day' as fieldName
                          }
                          className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </label>
                    </div>

                    {/* Next elements in the line below */}
                    <>
                      <div className="flex w-full mt-2">
                        <div className="py-2 mr-2">শেষ</div>
                        <label htmlFor={`af-account-end-time-${slot.id}`} className="flex-grow pb-2 mr-2">
                          <select
                            id={`af-account-end-time-${slot.id}`}
                            onChange={(e) =>
                              handleTimeSlotInputChange(e, 'endTime', slot.id) // Pass 'day' as fieldName
                            }
                            className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          >
                            {times.map(function (data) {
                              return <option key={data} value={data}> {data}</option>;
                            })}
                          </select>
                        </label>

                        <label htmlFor={`af-account-end-am-pm-${slot.id}`} className="flex flex-grow pb-2">
                          <select
                            id={`af-account-end-am-pm-${slot.id}`}
                            onChange={(e) =>
                              handleTimeSlotInputChange(e, 'endAmPm', slot.id) // Pass 'day' as fieldName
                            }
                            className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-50 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          >
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </label>
                        <div className="pt-2 mx-2">সর্বোচ্চ</div>
                        <div className="mr-4">
                          <input
                            id={`af-account-time-slot-person-limit-${slot.id}`}
                            onChange={(e) =>
                              handleTimeSlotInputChange(e, 'personLimit', slot.id) // Pass 'day' as fieldName
                            }
                            type="text"
                            className={classnames.textbox}
                            placeholder="রোগী সংখ্যা"
                          />
                        </div>
                        <div className="py-2 mr-2">জন</div>
                        {/* Button for removing the current div */}
                        {timeSlots.length > 1 && (
                          <button
                            type="button"
                            className="px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-red-200 hover:text-red-500 focus:outline-none focus:ring-2 ring-offset-white transition-all text-sm"
                            onClick={() => removeTimeSlot(slot.id)}
                          >
                            X
                          </button>
                        )}
                      </div>
                      {
                        timeSlots.length > 1 && (
                          <p className="mb-6" />)
                      }
                    </>
                  </div>
                ))}

                {/* Button for adding new div */}
                <div className="mt-3" >
                  <button type="button" className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" onClick={addTimeSlot}>
                    <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    {dict.register_form.doctor.add_time_slot}
                  </button>
                </div>
              </div>
              {/* <!-- End Col time slot --> */}


              <div className="sm:col-span-3" >
                <label htmlFor="af-account-bmdc-reg-no" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.bmdc_reg_no}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-bmdc-reg-no"
                    name="af-account-bmdc-reg-no"
                    type="text"
                    onChange={(e) => handleInputChange(e, setBmdcRegNo)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_bmdc_reg_no}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col bmdc registratiohn number --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-bmdc-reg-year" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.bmdc_reg_year}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-bmdc-reg-year"
                    name="af-account-bmdc-reg-year"
                    type="text"
                    onChange={(e) => handleInputChange(e, setBmdcRegYear)}
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_bmdc_reg_year}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col bmdc registration year --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-chamber-location" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.chamber_location}
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-chamber-location"
                  name="af-account-chamber-location"
                  onChange={(e) => handleInputChange(e, setChamberLocation)}
                  className={classnames.textbox}
                  rows={3} placeholder={dict.register_form.doctor.PH_chamber_location}></textarea>
              </div>
              {/* <!-- End Col Degrees --> */}


              <div className="sm:col-span-3">
                <label htmlFor="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.bio}
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-bio"
                  name="af-account-bio"
                  onChange={(e) => handleInputChange(e, setBio)}
                  className={classnames.textbox}
                  rows={6} placeholder={dict.register_form.doctor.PH_bio}></textarea>
              </div>
              {/* <!-- End Col bio--> */}
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
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                {dict.register_form.doctor.create_account}
              </button>
            </div>
          </form >
        </div >
        {/* <!-- End Card --> */}
      </div >
      {/* <!-- End Card Section --> */}
    </>
  );
}

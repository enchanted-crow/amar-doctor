'use strict';
'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { dict } from '@/global/translation';
import Link from 'next/link';

const divisions = ["বিভাগ সিলেক্ট করুন", "পুরুষ", "মহিলা", "অন্যান্য"];
const upozillas = ["সিলেক্ট করুন", "A", "hajaribag"];
const districts = ["সিলেক্ট করুন", "MBBS", "BDS"];
const days = ["বার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const times = ["সময়", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const classnames = {
  "textbox": "py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-500 placeholder-opacity-90"
}

export default function RegisterHCenter() {
  // Define state variables for input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upozilla, setUpozilla] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [photo, setPhoto] = useState('../../../../public/images/signup/profile_picture_default.jpg');

  const [timeSlots, setTimeSlots] = useState([{ id: 1 }]); // Initial state with one div

  const addTimeSlot = () => {
    // Generate a unique ID for the new div
    const newId = Math.max(...timeSlots.map((slot) => slot.id), 0) + 1;
    // Add a new div with the generated ID
    setTimeSlots([...timeSlots, { id: newId }]);
  };

  const removeTimeSlot = (idToRemove: number) => {
    // Filter out the div with the specified ID
    const updatedSlots = timeSlots.filter((slot) => slot.id !== idToRemove);
    setTimeSlots(updatedSlots);
  };

  // Function to handle input field change and update state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, stateUpdater: (value: string) => void): void => {
    const value = event.target.value;
    stateUpdater(value);
  };

  // Function to validate required fields
  const validateFields = () => {
    if (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      division &&
      district &&
      upozilla &&
      fullAddress
    ) {
      return true;
    }
    return false;
  };

  // Function to handle "Create Account" button click
  const handleCreateAccountClick = () => {
    const userData = {
      fullName,
      email,
      password,
      phone,
      division,
      district,
      upozilla,
      fullAddress,
      photo,
    };
    if (validateFields()) {
      // Construct a JSON object with the entered data


      // Do something with the userData JSON object, such as sending it to a server
      console.log(userData);
    } else {
      alert('Please fill in all required fields.');
      console.log(userData);
    }
  };

  return (
    <>
      {/* <!-- Card Section --> */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              হেলথ সেন্টার রেজিস্ট্রেশন
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {dict.register_form.doctor.form_description}
            </div>
          </div>

          <form>
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  ছবি
                </label>
              </div>
              {/* <!-- End Profile photo} --> */}

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Image
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    height={200}
                    width={200}
                    src="/images/signup/building_picture_default.png" // Used state variable
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
                  <input id="af-account-full-name" type="text"
                    onChange={(e) => handleInputChange(e, setFullName)}
                    className={classnames.textbox}
                    placeholder={"হোপ স্বাস্থ্য কমপ্লেক্স"}>
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
                <input id="af-account-email" type="email"
                  className={classnames.textbox}
                  placeholder={"hope.healthcare@gmail.com"} >
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
                  <input id="af-account-password" type="text"
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_enter_password}>
                  </input>
                  <input type="text"
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
                  <input id="af-account-phone" type="text"
                    className={classnames.textbox}
                    placeholder={dict.register_form.doctor.PH_phone_number}>
                  </input>
                </div>
              </div>
              {/* <!-- End Col phone--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-division-checkbox" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"বিভাগ"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {divisions.map(function (data) {
                      return (
                        <option>{data}</option>
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
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {districts.map(function (data) {
                      return (
                        <option>{data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col division--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-upozilla" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"উপজেলা"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {upozillas.map(function (data) {
                      return (
                        <option>{data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="af-account-full-address" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"ঠিকানা"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea id="af-account-full-address"
                  className={classnames.textbox}
                  rows={3} placeholder={"২৫ (প্রাইমারি স্কুলের বিপরীতে), নয়াবাজার, ফুলবাড়ি, কুড়িগ্রাম"}></textarea>
              </div>
              {/* <!-- End Col full-address --> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-time-slots" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"সেন্টার খোলা থাকার সময়"}
                </label>
              </div>

              <div className="sm:col-span-9">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex flex-col w-full">
                    {/* First three selects in one line */}
                    <div className="flex w-full">
                      <select
                        className="flex-grow py-2 px-3 mr-2 border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        {days.map(function (data) {
                          return <option key={data}>{data}</option>;
                        })}
                      </select>
                      <div className="py-2 mr-2">শুরু</div>
                      <select
                        className="flex-grow py-2 px-3 mr-2 border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        {times.map(function (data) {
                          return <option key={data}>{data}</option>;
                        })}
                      </select>
                      <select
                        className="flex-grow py-2 px-3 pr-4 mr-2 border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        <option>AM/PM</option>
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>

                    {/* Next elements in the line below */}
                    <>
                      <div className="flex w-full mt-2">
                        <div className="py-2 mr-2">শেষ</div>
                        <select
                          className="flex-grow py-2 px-3 mr-2 border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          {times.map(function (data) {
                            return <option key={data}>{data}</option>;
                          })}
                        </select>
                        <select
                          className="flex-grow py-2 px-3 pr-2 mr-2 border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-50 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        >
                          <option>AM/PM</option>
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                        <div className="h-full flex-grow mr-2">
                          <input
                            id="af-account-time-slot-person-limit"
                            type="text"
                            className={classnames.textbox}
                            placeholder="সর্বোচ্চ"
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
                      {timeSlots.length > 1 && (
                        <p className='mb-6' />)}
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
                type="button"
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleCreateAccountClick}
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

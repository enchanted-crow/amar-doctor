'use strict';
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { dict } from '@/global/translation';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const divisions = ["পুরুষ", "মহিলা", "অন্যান্য"];
const upozillas = ["A", "hajaribag"];
const districts = ["MBBS", "BDS"];
const genders = ["পুরুষ", "মহিলা", "অন্যান্য"];
const blood_groups = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"];

const classnames = {
  "textbox": "py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-500 placeholder-opacity-90"
}

export default function RegisterPatient() {
  // Define state variables for input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upozilla, setUpozilla] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date("2000-01-01"));
  const [profileImage, setProfileImage] = useState('../../../../public/images/signup/user_profile_picture_default.jpg');

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

    console.log(JSON.stringify(dateOfBirth))

    const formData = new FormData(event.currentTarget)
    formData.append("dob", JSON.stringify(dateOfBirth))

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

  return (
    <>
      {/* <!-- Card Section --> */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              {"রোগীর রেজিস্ট্রেশন"}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {dict.register_form.doctor.form_description}
            </div>
          </div>

          <form
            onSubmit={(event) => onFormSubmit(event)}
          // onClick={(event) => { event.preventDefault(); console.log("on click form") }}
          >
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
                        d="m8.93 6.58 8-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
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

              <div className="sm:col-span-3">
                <label htmlFor="af-account-gender" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {dict.register_form.doctor.gender}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-gender"
                    name="af-account-gender"
                    onChange={(e) => handleInputChange(e, setGender)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {genders.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col gender--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-blood-group" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"রক্তের গ্রুপ"}
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Dropdown menu */}
                  <select
                    id="af-account-blood-group"
                    name="af-account-blood-group"
                    onChange={(e) => handleInputChange(e, setBloodGroup)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {blood_groups.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              {/* <!-- End Col gender--> */}

              <div className="sm:col-span-3">
                <label htmlFor="af-account-date-of-birth" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  {"জন্ম তারিখ"}
                </label>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  {/* Date time picker */}
                  <DatePicker
                    selected={dateOfBirth}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    onChange={date => date && setDateOfBirth(date)}
                    maxDate={new Date()}
                  />
                </div>
              </div>
              {/* <!-- End Col date of birth--> */}

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
                    onChange={(e) => handleInputChange(e, setDivision)}
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
                    onChange={(e) => handleInputChange(e, setDistrict)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {districts.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
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
                    id="af-account-upozilla"
                    name="af-account-upozilla"
                    onChange={(e) => handleInputChange(e, setUpozilla)}
                    className="flex py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    {upozillas.map(function (data) {
                      return (
                        <option key={data} value={data}> {data}</option>
                      )
                    })}
                  </select>
                </div>
                {/* <!-- End Col upozilla--> */}
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
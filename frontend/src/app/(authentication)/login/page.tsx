'use client';

import React, { FormEvent } from 'react'
import { dict } from '@/global/translation'
import Link from 'next/link'
import { LoginCredentials, UserTypes } from '@/global/credentials';

const Login = () => {

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    let acc_type = formData.get("account-type")
    formData.delete('account-type')

    let api_url = ''
    if (acc_type == "রোগী") {
      api_url = 'http://localhost:8080/api/patient/login'
    }
    if (acc_type == "ডাক্তার") {
      api_url = 'http://localhost:8080/api/doctor/login'
    }
    if (acc_type == "হেলথ সেন্টার") {
      api_url = 'http://localhost:8080/api/healthCenter/login'
    }

    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the correct Content-Type
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })

    alert("requesting")
    // Handle response if necessary
    const data = await response.json()
    console.log(JSON.stringify(Object.fromEntries(formData)))
    console.log(data)

    const token = data["token"]
    console.log(token)

    if (token) {
      LoginCredentials.authToken = token
      LoginCredentials.isLoggedIn = true
      if (acc_type == "রোগী") {
        LoginCredentials.userType = UserTypes.patient
      }
      if (acc_type == "ডাক্তার") {
        LoginCredentials.userType = UserTypes.doctor
      }
      if (acc_type == "হেলথ সেন্টার") {
        LoginCredentials.userType = UserTypes.health_center
      }
      console.log("hoise")
      alert("login successful")
    }
    else{
      alert("Error occured")
    }

  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-md mx-auto p-6">
          <div className=" flex h-full items-center py-16">
            <main className="w-full">
              <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{dict.login.header_login}</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {dict.login.dont_have_account + " "}
                      <Link className="text-blue-600 decoration-2 hover:underline font-medium"
                        href="../register">
                        {dict.login.sign_up_here}
                      </Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    {/* <!-- Form --> */}
                    <form onSubmit={onFormSubmit}>
                      <div className="grid gap-y-4">
                        {/* <!-- Form Group --> */}
                        <div>
                          <label htmlFor="email" className="block text-sm mb-2 dark:text-white">{dict.login.email}</label>
                          <div className="relative">
                            <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error">
                            </input><div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                              <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p className="hidden text-xs text-red-600 mt-2" id="email-error">{dict.login.invalid_email}</p>
                        </div>
                        {/* <!-- End Form Group --> */}

                        {/* <!-- Form Group --> */}
                        <div>
                          <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-sm mb-2 dark:text-white">{dict.login.password}</label>
                            <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">{dict.login.forgot_password}</a>
                          </div>
                          <div className="relative">
                            <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error">
                            </input>
                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                              <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p className="hidden text-xs text-red-600 mt-2" id="password-error">{dict.login.password_8_plus_char_required}</p>
                        </div>
                        {/* <!-- End Form Group --> */}

                        <div>
                          <label htmlFor="account-name" className="block text-sm mb-2 dark:text-white">অ্যাকাউন্ট টাইপ</label>
                          <div className="relative">
                            <select
                              id={"account-type"}
                              name={"account-type"}
                              onChange={(e) =>
                                // handleTimeSlotInputChange(e, 'startAmPm', slot.id) // Pass 'day' as fieldName
                                e.preventDefault()
                              }
                              className="w-full h-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            >
                              <option>রোগী</option>
                              <option>ডাক্তার</option>
                              <option>হেলথ সেন্টার</option>
                            </select>
                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                              <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p className="hidden text-xs text-red-600 mt-2" id="email-error">{dict.login.invalid_email}</p>
                        </div>

                        {/* <label htmlFor={"account-type"} className="flex-grow py-2">
                          <select
                            id={"account-type"}
                            name={"account-type"}
                            onChange={(e) =>
                              // handleTimeSlotInputChange(e, 'startAmPm', slot.id) // Pass 'day' as fieldName
                              e.preventDefault()
                            }
                            className="w-full border-gray-200 shadow-sm rounded-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          >
                            <option>রোগী</option>
                            <option>ডাক্তার</option>
                            <option>হেলথ সেন্টার</option>
                          </select>
                        </label> */}


                        {/* <!-- Checkbox --> */}
                        <div className="flex items-center">
                          <div className="flex">
                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                            </input>
                          </div>
                          <div className="ml-3">
                            <label htmlFor="remember-me" className="text-sm dark:text-white">{dict.login.remember_me}</label>
                          </div>
                        </div>
                        {/* <!-- End Checkbox --> */}

                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">{dict.login.sign_in}</button>
                      </div>
                    </form>
                    {/* <!-- End Form --> */}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
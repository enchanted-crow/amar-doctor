'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'

interface UIInterface {
  "doctor_name": string
  "doctor_designation": string
  "doctor_institution": string
  "doctor_meeting_start_time": string
  "problem_description": string
  "hc_name": string
  "appt_meeting_link": string
}


function CurrentMeetingPatient() {
  const initialUIInterface: UIInterface =
  {
    "doctor_name": "ড. মুজিবুল হক",
    "doctor_designation": "প্রফেসর",
    "doctor_institution": "ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা",
    "doctor_meeting_start_time": "17:00",
    "problem_description": "দীর্ঘদিন ধরে দুই পায়ে ব্যাথা।",
    "hc_name": "হোপ হেলথ সেন্টার",
    "appt_meeting_link": "https://www.google.com",
  }

  const [uiInterface, setUIInterface] = useState(initialUIInterface)

  // ------------- TUBA -------------

  function fetchUIInterfaceData(): UIInterface {
    // fetch the required data - (dore nao ig apatoto ekta patient er at a time ektai appt thakbe or idk)
    // feed the data into another UIInterface type variable 'data' and return it


    let returned: UIInterface =
    {
      "doctor_name": "ড. মুজিবুল হক",
      "doctor_designation": "প্রফেসর",
      "doctor_institution": "ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা",
      "doctor_meeting_start_time": "17:00",
      "problem_description": "দীর্ঘদিন ধরে দুই পায়ে ব্যাথা।",
      "hc_name": "হোপ হেলথ সেন্টার",
      "appt_meeting_link": "https://www.google.com",
    }
    return returned
  }

  // ------------- TUBA -------------

  useEffect(() => {
    let uiData = fetchUIInterfaceData()
    setUIInterface(uiData)
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="h-full max-w-4xl mx-auto my-auto p-3">
          <div className="flex h-full items-center">
            <div className="w-full grid sm:grid-cols-1 lg:grid-rows-5 lg:grid-cols-4 gap-2 justify-center">

              <div className="flex flex-col group col-span-2 row-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {uiInterface.doctor_name}
                      </p>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">

                        {uiInterface.doctor_designation}
                      </p>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {uiInterface.doctor_institution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group col-span-2 row-span-4 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        রোগের বিবরণ
                      </p>
                    </div>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-400"></div>
                      {/* <span className="flex-shrink mx-4 text-gray-400">Content</span> */}
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div>
                      {/* <h3 className="text-lg font-bold text-gray-600 dark:text-white">
                        বিবরণ
                      </h3> */}
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {uiInterface.problem_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group col-span-2 row-span-1 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-10">
                    <div className="flex flex-grow">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg> */}
                      <p className="text-2xl font-bold text-gray-800 dark:text-white justify-middle">
                        {uiInterface.hc_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group col-span-2 row-span-1 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-10">
                    <div className="flex flex-grow justify-between">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg> */}
                      <div>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white justify-middle">
                          সময়
                        </p>
                      </div>
                      <p className="text-2xl font-semibold text-gray-500 dark:text-white justify-middle">
                        ৭:০০ PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex w-full col-span-4'>
                <div className="flex flex-grow flex-col mr-1 group row-span-1 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                  <div className="item-stretch">
                    <div className="flex flex-grow p-4 md:p-10 justify-between">
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        মিটিং লিংক
                      </p>
                      <a className=" text-blue-500 hover:text-blue-700 dark:text-gray-400 align-start" href={uiInterface.appt_meeting_link} target="_blank">
                        মিটিং ওপেন করতে ক্লিক করুন
                      </a>
                      {/* <p className="mt-2 text-gray-800 dark:text-gray-400">
                      {"পূর্ববর্তী মিটিংসমূহ দেখুন"}
                    </p> */}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default CurrentMeetingPatient
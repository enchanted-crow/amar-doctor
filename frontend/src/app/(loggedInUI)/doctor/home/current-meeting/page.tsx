'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'

interface UIInterface {
  "meeting_id": number
  "patient_name": string
  "patient_age": string
  "patient_gender": string
  "problem_description": string
}

function CurrentMeetingDoctor() {
  const initialUIInterface: UIInterface =
  {
    "meeting_id": 0,
    "patient_name": "রওশন আখতার",
    "patient_age": "৫৬", // use the converttoBangla function for this
    "patient_gender": "মহিলা",
    "problem_description": "দীর্ঘদিন ধরে দুই পায়ে ব্যাথা।",
  }
  const [uiInterface, setUIInterface] = useState(initialUIInterface)
  const [meetingIDs, setMeetingIDs] = useState([])
  const [meetingIDIndex, setMeetingIDIndex] = useState(0)

  function convertToBangla(number: number): string {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const numberString = number.toString();
    let banglaString = '';

    for (let i = 0; i < numberString.length; i++) {
      const digit = parseInt(numberString[i], 10);

      if (!isNaN(digit) && digit >= 0 && digit <= 9) {
        banglaString += banglaDigits[digit];
      } else {
        // If the character is not a digit, keep it unchanged
        banglaString += numberString[i];
      }
    }

    return banglaString;
  }

  // ----------------- <TUBA> -----------------

  function fetchAllMeetingIDofDoctor(): [] {
    // after fetching, create a number array 'arr' of meeting ids and return that

    return []
  }

  function fetchUIInterfaceDataFromMeetingID(id: number): UIInterface {
    // we need to fetch the UIInterface data by taking a meeting ID
    // after fetching return a UIInterface object with the fetched data


    let returned: UIInterface =
    {
      "meeting_id": 0,
      "patient_name": "রওশন আখতার",
      "patient_age": "৫৬", // use the converttoBangla function for this
      "patient_gender": "মহিলা",
      "problem_description": "দীর্ঘদিন ধরে দুই পায়ে ব্যাথা।",
    }
    return returned
  }

  // ----------------- </TUBA> -----------------


  useEffect(() => {
    // fetch the required data
    // feed the data into UIIntervace type array 'data[]' - see at how that array is created looking at initialUIInterface
    // setUIInterface(data)

    let meetingIDArr = fetchAllMeetingIDofDoctor()
    setMeetingIDs(meetingIDArr)

    if (meetingIDArr.length > 0) {
      setMeetingIDIndex(0)
      let uiInterfaceData = fetchUIInterfaceDataFromMeetingID(meetingIDs[meetingIDIndex])
      setUIInterface(uiInterfaceData)
    }
  }, []);

  function handleShowNextPatient() {
    if (meetingIDIndex + 1 < meetingIDs.length) {
      setMeetingIDIndex(meetingIDIndex + 1)
      let uiInterfaceData = fetchUIInterfaceDataFromMeetingID(meetingIDs[meetingIDIndex])
      setUIInterface(uiInterfaceData)
    }
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="h-full max-w-4xl mx-auto my-auto p-3">
          <div className="flex h-full items-center">
            <div className="w-full grid sm:grid-cols-1 lg:grid-rows-5 lg:grid-cols-4 gap-2 justify-center">

              <div className="flex flex-col group col-span-4 row-span-5 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {uiInterface.patient_name}
                      </p>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {uiInterface.patient_age} বছর, {uiInterface.patient_gender}
                      </p>
                      {/* <p className="mt-2 text-gray-800 dark:text-gray-400">
                        ঢাকা
                      </p> */}
                    </div>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-400"></div>
                      {/* <span className="flex-shrink mx-4 text-gray-400">Content</span> */}
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-600 dark:text-white">
                        বিবরণ
                      </h3>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {uiInterface.problem_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              <Link
                className='flex flex-grow flex-col mr-1 group row-span-1 col-span-2'
                href={"/doctor/home/current-meeting/create-prescription"}
              >
                <div >
                  <div className="flex flex-grow flex-col group row-span-1 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="item-stretch">
                      <div className="p-4 md:p-10">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          আপলোড প্রেসক্রিপশন
                        </h3>
                        {/* <p className="mt-2 text-gray-800 dark:text-gray-400">
                      {"পূর্ববর্তী মিটিংসমূহ দেখুন"}
                    </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <button onClick={(e) => { handleShowNextPatient() }} className="flex flex-grow flex-col ml-1 group row-span-1 col-span-2  bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      পরবর্তী মিটিংয়ে যান
                    </h3>
                    {/* <p className="mt-2 text-gray-800 dark:text-gray-400">
                        {"আপনার প্রোফাইলে যান"}
                      </p> */}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CurrentMeetingDoctor
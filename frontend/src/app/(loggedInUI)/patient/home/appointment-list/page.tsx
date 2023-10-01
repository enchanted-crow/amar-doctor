'use client'

import React from 'react'
import { TimeSlot, HealthCenter } from '@/app/models/dbModels';
import { useState } from 'react'

interface UIInterface {
  "problem_id": string
  "doctor_id": string
  "doctor_name": string
  "problem_description": string
  "appointment_day": string
  "appointment_time": string
}

function AppointmentListPatient() {
  const initiaPatientList: UIInterface[] = [
    {
      "problem_id": "",
      "doctor_id": "",
      "doctor_name": "",
      "problem_description": "",
      "appointment_day": "",
      "appointment_time": "",
    },
    {
      "problem_id": "",
      "doctor_id": "",
      "doctor_name": "",
      "problem_description": "",
      "appointment_day": "",
      "appointment_time": "",
    },
  ]
  const [patientList, setPatientList] = useState(initiaPatientList)

  return (
    <>
      <div className="w-full h-screen">
        {/* <!-- Card Section --> */}
        <div className="max-w-4xl z-50 h-full px-4 py-4 sm:px-6 lg:px-8 mx-auto">
          {/* <!-- Card --> */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">

            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">ডাক্তারের নাম</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">রোগের বিবরণ</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">দিন</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">সময়</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                        {patientList.map((problem) => (
                          <tr key={`${problem.problem_id}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {problem.doctor_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {problem.problem_description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {problem.appointment_day}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {problem.appointment_time}
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

          </div >
          {/* <!-- End Card --> */}
        </div >
        {/* <!-- End Card Section --> */}
      </div>
    </>
  );
}

export default AppointmentListPatient
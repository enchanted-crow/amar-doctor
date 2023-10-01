import { LoginCredentials, UserTypes } from "@/global/credentials"
import Link from "next/link";
import { redirect } from 'next/navigation';

export default function DoctorHome() {
  return (
    <>
      <_DoctorHome />
    </>
  )
}

function _DoctorHome() {
  return (
    <>
      <div className="w-full h-full">
        <div className="h-full max-w-4xl mx-auto my-auto p-3 lg:p-6">
          <div className="flex h-full items-center">
            <div className="w-full grid sm:grid-cols-1 lg:grid-rows-4 lg:grid-cols-4 gap-2 justify-center lg:p-3">
              <div className="flex flex-col group col-span-2 row-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      চলমান মিটিং
                    </h3>
                    <p className="mt-2 text-gray-800 dark:text-gray-400">
                      ৩০ জুন, সন্ধ্যা ৭টা
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group row-span-2 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="item-stretch rounded-xl">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      পরবর্তী মিটিংসমূহ
                    </h3>
                    <p className="mt-2 text-gray-800 dark:text-gray-400">
                      {"পরবর্তী মিটিংসমূহ দেখুন"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group row-span-2 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="item-stretch">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      পূর্ববর্তী মিটিংসমূহ
                    </h3>
                    <p className="mt-2 text-gray-800 dark:text-gray-400">
                      {"পূর্ববর্তী মিটিংসমূহ দেখুন"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group row-span-2 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      প্রোফাইল
                    </h3>
                    <p className="mt-2 text-gray-800 dark:text-gray-400">
                      {"আপনার প্রোফাইলে যান"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

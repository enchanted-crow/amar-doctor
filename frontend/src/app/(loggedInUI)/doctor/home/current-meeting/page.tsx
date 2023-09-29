import Link from 'next/link'
import React from 'react'


function CurrentMeetingDoctor() {
  return (
    <>
      <div className="w-full h-full">
        <div className="h-full max-w-4xl mx-auto my-auto p-3">
          <div className="flex h-full items-center">
            <div className="w-full grid sm:grid-cols-1 lg:grid-rows-5 lg:grid-cols-4 gap-2 justify-center">
              <div className="flex flex-col group col-span-4 row-span-5 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="items-stretch">
                  <div className="p-4 md:p-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        রওশন আখতার
                      </p>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">
                        ৫৬ বছর, মহিলা
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
                        দীর্ঘদিন ধরে দুই পায়ে ব্যাথা।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col group row-span-4 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="item-stretch rounded-xl">
                  <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      রোগীর ফাইলসমূহ
                    </h3>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-400"></div>
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">image_1.jpg</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link className="text-blue-500 hover:text-blue-700" href="#">ডাউনলোড</Link>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">image_2.jpg</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link className="text-blue-500 hover:text-blue-700" href="#">ডাউনলোড</Link>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">image_3.jpg</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link className="text-blue-500 hover:text-blue-700" href="#">ডাউনলোড</Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className='flex w-full col-span-4'>
                <div className="flex flex-grow flex-col mr-1 group row-span-1 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
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

                <div className="flex flex-grow flex-col ml-1 group row-span-1 col-span-2 bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CurrentMeetingDoctor
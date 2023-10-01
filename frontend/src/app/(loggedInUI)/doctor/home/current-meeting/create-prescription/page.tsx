import React from 'react'

const classnames = {
  "textbox": "py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-500 placeholder-opacity-90"
}


function Create() {
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
                        মিটিং লিংক
                      </p>
                      <p className="mt-2 text-gray-800 dark:text-gray-400">

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
                    <div className="sm:col-span-9">
                      <div className="sm:flex">
                        <input
                          id="af-account-phone"
                          name="af-account-phone"
                          type="text"
                          // onChange={(e) => handleInputChange(e, setPhone)}
                          className={classnames.textbox}
                          placeholder={"মিটিং লিংক প্রদান করুন"}>
                        </input>
                      </div>
                    </div>

                    <div className="pt-3 flex col-span-12 justify-end">
                      <button
                        type="button"
                        // onClick={(e) => { handleAiCall() }}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        সেভ করুন
                      </button>
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
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Create
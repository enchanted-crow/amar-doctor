'use client';

import Link from "next/link"
import { useState, useEffect } from "react";

const selectedPageClassName = "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white"

const unselectedPageClassName = "flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"

export default function DashboardLayoutPatient({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [selectedPageName, setSelectedPageName] = useState("current-meeting");

  useEffect(() => {
    console.log(selectedPageName)
  }, [selectedPageName]);

  function handleLogOut() {
    setSelectedPageName("log-out")
    console.log("logout")
  }

  return (
    <div className="w-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      {/* <!-- ========== HEADER ========== --> */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
        <nav className="relative w-11/12 mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:ml-64" aria-label="Global">
          <div className="flex items-center justify-between">
            {/* <Link className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">
              আমার ডাক্তার
            </Link> */}
            <div className="sm:hidden md:hidden">
              <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
              <div className="pt-1 text-gray-800 sm:py-6 dark:text-gray-400">
                {(selectedPageName == 'current-meeting') &&
                  <p className="font-medium">
                    চলমান মিটিং
                  </p>}
                {(selectedPageName == 'appointment-list') &&
                  <p className="font-medium">
                    সকল অ্যাপয়েন্টমেন্ট
                  </p>}
                {(selectedPageName == 'new-appointment') &&
                  <p className="font-medium">
                    নতুন অ্যাপয়েন্টমেন্ট
                  </p>}
              </div>

              <Link className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-gray-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p className="ml-1 pt-1">রওশন আখতার</p>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}


      {/* <!-- ========== MAIN CONTENT ========== --> */}
      {/* <!-- Sidebar Toggle --> */}
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center py-4">
          {/* <!-- Navigation Toggle --> */}
          <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
            <span className="sr-only">Toggle Navigation</span>
            <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          {/* <!-- End Navigation Toggle --> */}

          {/* <!-- Breadcrumb --> */}
          <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
            <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">হোম
              <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </li>
            {/* <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
              চলমান মিটিং
            </li> */}
          </ol>
          {/* <!-- End Breadcrumb --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <div id="application-sidebar" className="h-full hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center px-6">
          <Link className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">
            <p>আমার ডাক্তার</p>
          </Link>
        </div>

        <nav className="hs-accordion-group p-6 w-full h-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul className="space-y-1.5 h-full">
            <div className="flex flex-wrap flex-col h-full justify-between">
              <div>
                <li>
                  <Link className={
                    (selectedPageName == 'current-meeting') ? selectedPageClassName : unselectedPageClassName
                  }
                    href="/patient/home/current-meeting"
                    onClick={() => { setSelectedPageName("current-meeting") }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" /></svg>
                    <p className="ml-1 pt-1">চলমান মিটিং</p>
                  </Link>
                </li>

                <li>
                  <Link className={
                    (selectedPageName == 'appointment-list') ? selectedPageClassName : unselectedPageClassName
                  }
                    href="/patient/home/appointment-list"
                    onClick={() => { setSelectedPageName("appointment-list") }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <p className="ml-1 pt-1">অ্যাপয়েন্টমেন্ট লিস্ট</p>
                  </Link>
                </li>
              </div>

              <div>
                <li>
                  <Link className={
                    (selectedPageName == 'new-appointment') ? selectedPageClassName : unselectedPageClassName
                  }
                    href="/patient/home/new-appointment"
                    onClick={() => { setSelectedPageName("new-appointment") }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <p className="ml-1 pt-1">নতুন অ্যাপয়েন্টমেন্ট</p>
                  </Link>
                </li>

                <li><Link className={
                  (selectedPageName == 'log-out') ? selectedPageClassName : unselectedPageClassName
                }
                  href="#"
                  onClick={() => { handleLogOut() }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" /></svg>
                  <p className="ml-1 pt-1">লগ আউট</p>
                </Link></li>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      {/* <!-- End Sidebar --> */}

      {/* <!-- Content --> */}
      <div className="w-full h-full py-10 px-4 sm:px-6 md:px-8 lg:pl-72">
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  )
}

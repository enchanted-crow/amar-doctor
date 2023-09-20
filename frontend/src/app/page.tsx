import Link from "next/link";
import { LoginCredentials } from "@/global/credentials";
import { dict } from "@/global/translation";

export default function Home() {
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 min-h-screen flex items-center"> {/* Set min-h-screen for full-height background and use flex for vertical centering */}
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                    {/* Title */}
                    <div className="mt-5 max-w-2xl text-center mx-auto">
                        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                            {dict.landing.header[1] + ' '}
                            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">{dict.landing.header[2]}</span>
                            {/* {dict.landing.header[3]} */}
                        </h1>
                    </div>
                    {/* End Title */}
                    <div className="mt-5 max-w-3xl text-center mx-auto">
                        <p className="text-lg text-gray-600 dark:text-gray-400">{dict.landing.description}</p>
                    </div>
                    {/* Buttons */}
                    <div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
                        <Link href='/login'>
                            <div className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800">
                                {dict.landing.get_started}
                                <svg className="w-3 h-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </Link>
                        <Link href="/about-us">
                            <div className="inline-flex justify-center items-center gap-x-3.5 text-sm lg:text-base text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:border-gray-800 dark:hover:border-gray-600 dark:shadow-slate-700/[.7] dark:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
                                {dict.landing.about_us}
                            </div>
                        </Link>
                    </div>
                    {/* End Buttons */}
                </div >
            </div >
            {/* End Hero */}
        </>
    )
}

// gets executed at build time
export async function getStaticProps() {
    LoginCredentials.isLoggedIn = false;
    LoginCredentials.authToken = "";
}

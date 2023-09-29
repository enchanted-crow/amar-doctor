import Link from "next/link"

const Register = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-3xl mx-auto p-6">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2">
            {/* <!-- Icon Blocks --> */}
            <Link className="h-[36] flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]" href="/register/doctor">
              <div className="items-stretch">
                <div className="p-4 md:p-10">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    ডাক্তার
                  </h3>
                  <p className="mt-2 text-gray-800 dark:text-gray-400">
                    দেশের সকল প্রান্তের রোগী দেখুন যেকোনো জায়গায়
                  </p>
                </div>
              </div>
            </Link>

            <Link className="h-[36] flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]" href="/register/health-center">
              <div className="item-stretch rounded-xl">
                <div className="p-4 md:p-10">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    হেলথ সেন্টার
                  </h3>
                  <p className="mt-2 text-gray-800 dark:text-gray-400">
                    রোগীর সেবায় নিয়োজিত দেশের যেকোনো প্রান্তে
                  </p>
                </div>
              </div>
            </Link>

            <Link className="h-[36] flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]" href="/register/patient">
              <div className="item-stretch">
                <div className="p-4 md:p-10">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    রোগী
                  </h3>
                  <p className="mt-2 text-gray-800 dark:text-gray-400">
                    ঘরে বসেই দেখান সারা দেশের ডাক্তার
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
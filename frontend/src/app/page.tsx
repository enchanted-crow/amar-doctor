'use client';

import { useEffect, useState } from "react";
import { LoginCredentials } from "@/global/credentials";
import { redirect } from 'next/navigation';

export default function App() {
  const [userType, setUserType] = useState(0)

  useEffect(() => {
    if (LoginCredentials.isPatientAndLoggedIn()) setUserType(1)
    if (LoginCredentials.isDoctorAndLoggedIn()) setUserType(2)
    if (LoginCredentials.isHCenterAndLoggedIn()) setUserType(3)
  }, []);

  return (
    <>
      {userType == 1 ? redirect("/patient") :
        <>
          {
            userType == 2 ? redirect("/doctor") :
              <>
                {
                  userType == 3 ? redirect("/health-center") :
                    redirect("/welcome")
                }
              </>
          }
        </>
      }
    </>
  )
}

// gets executed at build time
// export async function getServerSideProps() {
//     LoginCredentials.isLoggedIn = false;
//     LoginCredentials.authToken = "";
// }

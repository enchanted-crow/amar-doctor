'use client';

import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";

function PatientHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    /*if (LoginCredentials.isPatientAndLoggedIn())*/
     setIsLoggedIn(true)
  }, [])

  return (
    <>
      {isLoggedIn ? redirect('/patient/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default PatientHome
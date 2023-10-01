'use client';

import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";

function DoctorHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (LoginCredentials.isDoctorAndLoggedIn()) setIsLoggedIn(true)
  }, [])

  return (
    <>
      {isLoggedIn ? redirect('/doctor/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default DoctorHome
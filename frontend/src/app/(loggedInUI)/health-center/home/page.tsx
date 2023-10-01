'use client';

import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";

function HCenterHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (LoginCredentials.isHCenterAndLoggedIn()) setIsLoggedIn(true)
  }, [])

  return (
    <>
      {isLoggedIn ? redirect('/health-center/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default HCenterHome
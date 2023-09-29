import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function Patient() {
  LoginCredentials.isLoggedIn = true
  LoginCredentials.userType = UserTypes.patient
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.patient) ? redirect('/patient/home/')
        : redirect('/login')}
    </>
  )
}

export default Patient
import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function Doctor() {
  LoginCredentials.isLoggedIn = true
  LoginCredentials.userType = UserTypes.doctor
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.doctor) ? redirect('/doctor/home')
        : redirect('/login')}
    </>
  )
}

export default Doctor
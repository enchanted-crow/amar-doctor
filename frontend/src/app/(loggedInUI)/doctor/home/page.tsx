import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function DoctorHome() {
  LoginCredentials.isLoggedIn = true
  LoginCredentials.userType = UserTypes.doctor
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.doctor) ? redirect('/doctor/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default DoctorHome
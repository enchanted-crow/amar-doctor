import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function PatientHome() {
  LoginCredentials.isLoggedIn = true
  LoginCredentials.userType = UserTypes.patient
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.patient) ? redirect('/patient/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default PatientHome
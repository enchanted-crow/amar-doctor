import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function HCenter() {
  LoginCredentials.isLoggedIn = true
  LoginCredentials.userType = UserTypes.health_center
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.health_center) ? redirect('/health-center/home')
        : redirect('/login')}
    </>
  )
}

export default HCenter
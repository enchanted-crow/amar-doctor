import { LoginCredentials, UserTypes } from "@/global/credentials"
import { redirect } from 'next/navigation';

function HCenterHome() {
  // LoginCredentials.isLoggedIn = true
  // LoginCredentials.userType = UserTypes.health_center
  return (
    <>
      {(LoginCredentials.isLoggedIn == true && LoginCredentials.userType == UserTypes.health_center) ? redirect('/health-center/home/current-meeting')
        : redirect('/login')}
    </>
  )
}

export default HCenterHome
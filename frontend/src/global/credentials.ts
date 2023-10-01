export enum UserTypes {
  "patient",
  "doctor",
  "health_center"
}

export class LoginCredentials {

  // -------------- <PUBLIC> --------------

  public static saveLogin(type: UserTypes, token: string) {
    LoginCredentials.userType = type
    LoginCredentials.token = token
  }

  public static clearLogin() {
    LoginCredentials.clearStorage()
  }

  public static get isLoggedIn(): boolean {
    let token = localStorage.getItem("token")
    let userType = localStorage.getItem("userType")

    if (!token || !userType) return false
    return true;
  }

  public static isDoctorAndLoggedIn() {
    if (LoginCredentials.isLoggedIn) {
      return localStorage.getItem("userType") == "doctor"
    }
  }

  public static isPatientAndLoggedIn() {
    if (LoginCredentials.isLoggedIn) {
      return localStorage.getItem("userType") == "patient"
    }
  }

  public static isHCenterAndLoggedIn() {
    if (LoginCredentials.isLoggedIn) {
      return localStorage.getItem("userType") == "health_center"
    }
  }

  public static get token(): string | null {
    let token = localStorage.getItem("token")
    if (token) return token
    return null
  }

  public static get userType(): UserTypes | null {
    let type = localStorage.getItem("userType")
    if (type) {
      if (type == "doctor") return UserTypes.doctor
      if (type == "patient") return UserTypes.patient
      if (type == "health_center") return UserTypes.health_center
    }
    return null
  }

  // -------------- </PUBLIC> --------------

  private static clearStorage() {
    if (localStorage.getItem("token")) localStorage.removeItem("token")
    if (localStorage.getItem("userType")) localStorage.removeItem("userType")
  }
  private static set token(value: string) {
    localStorage.setItem("token", value)
  }
  private static set userType(value: UserTypes) {
    let toStore = ""

    if (value == UserTypes.doctor) toStore = "doctor"
    if (value == UserTypes.patient) toStore = "patient"
    if (value == UserTypes.health_center) toStore = "health_center"

    localStorage.setItem("token", toStore)
  }

}
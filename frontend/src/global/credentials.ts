export enum UserTypes {
  "patient",
  "doctor",
  "health_center"
}

export class LoginCredentials {
  private static _isLoggedIn: boolean = false;
  private static _authToken: string = "";
  private static _userType: UserTypes;

  public static get authToken(): string {
    return LoginCredentials._authToken;
  }
  public static set authToken(value: string) {
    LoginCredentials._authToken = value;
  }

  public static get userType(): UserTypes {
    return LoginCredentials._userType;
  }
  public static set userType(value: UserTypes) {
    LoginCredentials._userType = value;
  }

  public static get isLoggedIn(): boolean {
    return LoginCredentials._isLoggedIn;
  }
  public static set isLoggedIn(value: boolean) {
    LoginCredentials._isLoggedIn = value;
  }
}
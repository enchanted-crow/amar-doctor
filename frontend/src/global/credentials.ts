export class LoginCredentials {
    private static _isLoggedIn: boolean;
    private static _authToken: string;

    public static get authToken(): string {
        return LoginCredentials._authToken;
    }
    public static set authToken(value: string) {
        LoginCredentials._authToken = value;
    }

    public static get isLoggedIn(): boolean {
        return LoginCredentials._isLoggedIn;
    }
    public static set isLoggedIn(value: boolean) {
        LoginCredentials._isLoggedIn = value;
    }
}
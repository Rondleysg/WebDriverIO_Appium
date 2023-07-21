import AppScreen from "./AppScreen.js";

class LoginScreen extends AppScreen {
    constructor() {
        super('//*[@resource-id="Login-screen"]');
    }

    private get email() {
        return $('//*[@resource-id="input-email"]');
    }
    private get password() {
        return $('//*[@resource-id="input-password"]');
    }
    private get goToSignUpScreenButton() {
        return $('//*[@resource-id="btn-goto-signUp"]');
    }
    private get loginButton() {
        return $('//*[@resource-id="btn-login"]');
    }
    private get alertMessageError() {
        return $('//*[@resource-id="android:id/parentPanel"]');
    }

    get getAlertMessageError() {
        const messageErrorContainer = this.alertMessageError;
        const objMessageError = {
            title: messageErrorContainer.$('//*[@resource-id="android:id/alertTitle"]'),
            message: messageErrorContainer.$('//*[@resource-id="android:id/message"]'),
        }
        return objMessageError;
    }

    async tapOnGoToSignUpScreenButton() {
        await this.goToSignUpScreenButton.click();
    }

    async tapOnLoginButton() {
        await this.loginButton.click();
    }

    async submitLoginForm({ email, password }: { email: string; password: string }) {
        await this.email.setValue(email);
        await this.password.setValue(password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
        await this.loginButton.click();
    }
}

export default new LoginScreen();

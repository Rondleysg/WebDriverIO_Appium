import AppScreen from "./AppScreen.js";

class SignUpScreen extends AppScreen {
    constructor() {
        super('//*[@resource-id="signup-screen"]');
    }

    private get name() {
        return $('//*[@resource-id="input-name"]');
    }
    private get email() {
        return $('//*[@resource-id="input-email"]');
    }
    private get password() {
        return $('//*[@resource-id="input-password"]');
    }
    private get goToLoginScreenButton() {
        return $('//*[@resource-id="btn-goto-login"]');
    }
    private get signUpButton() {
        return $('//*[@resource-id="btn-signup"]');
    }

    async tapOnGoToLoginScreenButton() {
        await this.goToLoginScreenButton.click();
    }

    async tapOnSignUpButton() {
        await this.signUpButton.click();
    }

    async submitSignUpForm({ name, email, password }: { name: string; email: string; password: string }) {
        await this.name.setValue(name);
        await this.email.setValue(email);
        await this.password.setValue(password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
        await this.signUpButton.click();
    }
}

export default new SignUpScreen();

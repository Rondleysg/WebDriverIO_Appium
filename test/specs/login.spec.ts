import LoginScreen from "../pageobjects/LoginScreen.js";
import MyDayScreen from "../pageobjects/MyDayScreen.js";
import RegisterScreen from "../pageobjects/RegisterScreen.js";

describe("Funcionalidade de login", () => {
    beforeEach(async () => {
        await driver.launchApp();
        await RegisterScreen.waitForIsShown();
        await RegisterScreen.tapOnGoToLoginScreenButton();
        await LoginScreen.waitForIsShown();
    });

    afterEach(async () => {
        await driver.closeApp();
    });

    it("Deve fazer login com credenciais corretas", async () => {
        await LoginScreen.submitLoginForm({
            email: "rondley@gmail.com",
            password: "123456",
        });

        const contentNotificationPerm = await $(
            '//*[@resource-id="com.android.permissioncontroller:id/grant_singleton"]'
        );
        await contentNotificationPerm.waitForDisplayed();
        const allowNotificationPerm = await $(
            '//*[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'
        );
        await allowNotificationPerm.click();

        await MyDayScreen.waitForIsShown();
        await expect(MyDayScreen.textMessageWelcome).toHaveTextContaining("Olá, Rondley");
    });

    it("Deve mostrar mensagem de erro de campos obrigatórios quando email estiver vazio", async () => {
        await LoginScreen.submitLoginForm({
            email: "",
            password: "123456",
        });

        await LoginScreen.getAlertMessageError.title.waitForDisplayed();
        await expect(LoginScreen.getAlertMessageError.title).toHaveTextContaining("Atenção");
        await expect(LoginScreen.getAlertMessageError.message).toHaveTextContaining(
            "Todos os campos são obrigatórios"
        );
    });

    it("Deve mostrar mensagem de erro de campos obrigatórios quando senha estiver vazia", async () => {
        await LoginScreen.submitLoginForm({
            email: "rondley@gmail.com",
            password: "",
        });

        await LoginScreen.getAlertMessageError.title.waitForDisplayed();
        await expect(LoginScreen.getAlertMessageError.title).toHaveTextContaining("Atenção");
        await expect(LoginScreen.getAlertMessageError.message).toHaveTextContaining(
            "Todos os campos são obrigatórios"
        );
    });

    it("Deve mostrar mensagem de erro de dados incorretos quando email e senha não conferem", async () => {
        await LoginScreen.submitLoginForm({
            email: "rondley@gmail.com",
            password: "123",
        });

        await LoginScreen.getAlertMessageError.title.waitForDisplayed();
        await expect(LoginScreen.getAlertMessageError.title).toHaveTextContaining("Atenção");
        await expect(LoginScreen.getAlertMessageError.message).toHaveTextContaining(
            "Dados incorretos, por favor tente novamente com outros dados"
        );
    });
});

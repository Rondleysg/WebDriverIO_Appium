import AppScreen from "./AppScreen.js";

class MyDayScreen extends AppScreen {
    constructor() {
        super('//*[@resource-id="myday-screen"]');
    }

    public get textMessageWelcome() {
        return $('//*[@resource-id="message-welcome"]');
    }
}

export default new MyDayScreen();

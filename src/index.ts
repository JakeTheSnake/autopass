import { Builder } from 'selenium-webdriver';

let driver = new Builder().forBrowser('chromium').build();
await driver.get('https://bokapass.nemoq.se/Booking/Booking/Index/varmland');

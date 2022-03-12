import { Builder, By } from 'selenium-webdriver';

import Axios from 'axios';

let driver = new Builder().forBrowser('firefox').build();
await driver.get('https://bokapass.nemoq.se/Booking/Booking/Index/varmland');
await driver.findElement(By.css('input[value="Boka ny tid"]')).click();
await driver.findElement(By.css('input[type="checkbox"]')).click();
await driver.findElement(By.css('input[value="Nästa"]')).click();
await driver.findElement(By.css('input[value="2"]')).click();
await driver.findElement(By.css('input[value="Nästa"]')).click();
await driver.findElement(By.css('input[value="Första lediga tid"]')).click();
let dateElement = await driver.findElement(By.id('dateText'));
let date = await dateElement.getText();
console.log(date);
Axios
  .post('https://stromnegatan.duckdns.org/api/webhook/autopass', {
    date: date
  }).then(r => console.log(r.status));
await driver.quit();

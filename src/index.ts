import { Builder, By } from 'selenium-webdriver';

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
let response = await fetch('https://stromnegatan.duckdns.org/api/webhook/autopass', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: `{ "date": "${date}" }`
});
console.log(response);
await driver.quit();

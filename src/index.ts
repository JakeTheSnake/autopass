import { Builder, By } from 'selenium-webdriver';

import Axios from 'axios';

let driver = new Builder().forBrowser('firefox').build();
await driver.manage().setTimeouts({ implicit: 50000, pageLoad: 25000 });
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
  .post(process.env.WEBHOOK_URL, {
    date: date
  }).then(r => console.log(r.status));

let timecells = await driver.findElements(By.className('timecell'));

for (let n = 0; n < timecells.length; n++) {
  let d = new Date(await timecells[n].getAttribute("data-fromdatetime"));
  if ((d < new Date("2022-05-02 20:50:00") && d > new Date("2022-03-20 14:00:00")) || (d.getMonth() === 2 && d.getDate() == 16)) {
    console.log("Choose " + d);
    await timecells[n].click();

    await driver.findElement(By.css('input[value="Nästa"]')).click();

    await driver.findElement(By.css('input[name="Customers[0].BookingFieldValues[0].Value"]')).sendKeys(process.env.FIRST_NAME);
    await driver.findElement(By.css('input[name="Customers[0].BookingFieldValues[1].Value"]')).sendKeys(process.env.LAST_NAME);

    await driver.findElement(By.css('input[type="checkbox"]')).click();
    await driver.findElement(By.css('input[value="Nästa"]')).click();
    let timeout = 0;
    while (!(await driver.findElement(By.css("h1")).getText()).includes("Viktig")) {
      await driver.sleep(1000);
      if (timeout > 50) {
        driver.quit();
        console.log("Timeout");
        process.exit(1);
      }
      timeout = timeout + 1;
    }
    await driver.findElement(By.css('input[value="Nästa"]')).click();


    await driver.findElement(By.id("EmailAddress")).sendKeys(process.env.EMAIL);
    await driver.findElement(By.id("ConfirmEmailAddress")).sendKeys(process.env.EMAIL);
    await driver.findElement(By.id("PhoneNumber")).sendKeys(process.env.PHONE);
    await driver.findElement(By.id("ConfirmPhoneNumber")).sendKeys(process.env.PHONE);

    await driver.findElements(By.css('input[type=checkbox]'))
    .then(r => r.forEach(c => c.click()));

    await driver.findElement(By.css('input[value="Nästa"]')).click();
    await driver.findElement(By.css('input[value="Bekräfta bokning"]')).click();

    Axios
      .post(process.env.WEBHOOK_URL, {
        date: "Bokade " + date
      }).then(r => console.log(r.status));



    break;
  }
}

await driver.quit();

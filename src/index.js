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
console.log(await dateElement.getText());
await driver.quit();
//# sourceMappingURL=index.js.map
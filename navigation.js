const { By, until } = require("selenium-webdriver");
const selectors = require('./selectors');

// Navigate to the sunscreen shop
async function navigateToSunscreenShop(driver) {
    let sunscreenButton = await driver.findElement(By.xpath(selectors.landingPage.sunscreenButton));
    await driver.wait(until.elementIsVisible(sunscreenButton, 5000));
    await sunscreenButton.click();
}


// Navigate to moisturizer shop
async function navigateToMoisturizerShop(driver) {
    let moisturizerButton = await driver.findElement(By.xpath(selectors.landingPage.moisturizerButton));
    await driver.wait(until.elementIsVisible(moisturizerButton, 5000));
    await moisturizerButton.click();
}

module.exports = { navigateToSunscreenShop, navigateToMoisturizerShop };

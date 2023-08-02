const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const config = require('../config.js');
const selectors = require('../selectors');

// Setup Chrome options
let chromeOptions = new chrome.Options();
if (config.seleniumConfig.headless) {
    chromeOptions = chromeOptions.headless();
}

// Setup driver
let driver = new Builder()
    .forBrowser(config.seleniumConfig.browser)
    .setChromeOptions(chromeOptions)
    .build();

// Navigate to the website
driver.get(config.seleniumConfig.url);

async function navigateToShop(type) {
    // type: 'moisturizer' or 'sunscreen'
    let button = await driver.findElement(By.xpath(selectors.landingPage[`${type}Button`]));
    await driver.wait(until.elementIsVisible(button, 5000));
    await button.click();
    console.log(`Navigating to ${type} shop`);
}

async function landingPageTest() {
    // Shop for moisturizers if the weather is below 19 degrees,
    // shop for sunscreens if the weather is above 34 degrees
    let temperatureElement = await driver.findElement(By.id(selectors.landingPage.temperature));
    let temperatureText = await temperatureElement.getText();
    let temperature = parseFloat(temperatureText.split(' ')[0]);

    try {
        // Go to moisturizer shop if temperature is less than 19
        if (temperature < 19) {
            await navigateToShop('moisturizer');
        }
        // Go to sunscreen shop if temperature is greater than 34
        else if (temperature > 34) {
            await navigateToShop('sunscreen');
        }
        // Do nothing if temperature is ok
        else {
            console.log('Temperature is in the comfortable range. No special skin care product needed.');
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Quit the webdriver
        await driver.quit();
    }
}

// Call the landingPageTest function
landingPageTest();


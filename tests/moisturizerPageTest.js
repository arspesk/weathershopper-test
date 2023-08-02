const { Builder, By } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const config = require('../config.js');
const selectors = require('../selectors');
const { navigateToMoisturizerShop } = require('../navigation.js');

// Chrome options setup
let chromeOptions = new chrome.Options();
if (config.seleniumConfig.headless) {
    chromeOptions = chromeOptions.headless();
}

// Driver setup
let driver = new Builder()
    .forBrowser(config.seleniumConfig.browser)
    .setChromeOptions(chromeOptions)
    .build();

// Navigate to the website
driver.get(config.seleniumConfig.url);

// Function to add a product to the cart, if it exists
async function addToCart(product, ingredientType) {
    if (product) {
        await product.findElement(By.xpath(selectors.productCard.addButton)).click();
        console.log(`Added the cheapest ${ingredientType} moisturizer to the cart.`);
    } else {
        console.log(`No ${ingredientType} moisturizer found.`);
    }
}

// Main Test
async function moisturizerPageTest() {
    // Navigate to moisturizer shop
    await navigateToMoisturizerShop(driver);

    try {
        // Find all the moisturizer product elements
        let products = await driver.findElements(By.xpath(selectors.productCard.allProducts));

        // Arrays to hold aloe and almond moisturizers along with their prices
        let aloeProducts = [];
        let almondProducts = [];

        // Iterate over all the products
        for (let product of products) {
            // Get product name and price
            let productName = await product.findElement(By.xpath(selectors.productCard.name)).getText();
            let productPrice = await product.findElement(By.xpath(selectors.productCard.price)).getText();

            // Parse the price from the string
            let price = parseFloat(productPrice.split(' ')[1]);

            // Add aloe and almond moisturizers to their respective arrays
            if (productName.toLowerCase().includes('aloe')) aloeProducts.push({ price, product });
            if (productName.toLowerCase().includes('almond')) almondProducts.push({ price, product });
        }

        // Find the cheapest aloe and almond moisturizers
        let cheapestAloeMoisturizer = aloeProducts.sort((a, b) => a.price - b.price)[0];
        let cheapestAlmondMoisturizer = almondProducts.sort((a, b) => a.price - b.price)[0];

        // Add the cheapest aloe and almond moisturizer to the cart
        await addToCart(cheapestAloeMoisturizer?.product, 'aloe');
        await addToCart(cheapestAlmondMoisturizer?.product, 'almond');

        // Click on cart when done
        let cartButton = await driver.findElement(By.xpath(selectors.productCard.cartButton));
        await cartButton.click();
        console.log(`Navigated to the cart.`);

    } catch (error) {
        console.error(error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

// Run the test
moisturizerPageTest();

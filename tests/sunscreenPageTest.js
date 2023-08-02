// Module Imports
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const config = require('../config.js');
const selectors = require('../selectors');
const { navigateToSunscreenShop } = require('../navigation.js');

// Configure Chrome Options
let chromeOptions = new chrome.Options();
if (config.seleniumConfig.headless) {
    chromeOptions = chromeOptions.headless();
}

// Initialize the Selenium Driver
let driver = new Builder()
    .forBrowser(config.seleniumConfig.browser)
    .setChromeOptions(chromeOptions)
    .build();

// Navigate to the configured website
driver.get(config.seleniumConfig.url);

async function sunscreenPageTest() {

    // Navigate to the sunscreen shop
    await navigateToSunscreenShop(driver);

    try {
        // Fetch all the sunscreen product elements
        let products = await driver.findElements(By.xpath(selectors.productCard.allProducts));

        // Initialize cheapest product trackers
        let cheapestSpf50Product = null;
        let cheapestSpf50Price = Number.MAX_SAFE_INTEGER;
        let cheapestSpf30Product = null;
        let cheapestSpf30Price = Number.MAX_SAFE_INTEGER;

        // Iterate over all products to find the cheapest SPF-50 and SPF-30 products
        for(let product of products) {
            // Fetch product name and price
            let productName = await product.findElement(By.xpath(selectors.productCard.name)).getText();
            let productPrice = await product.findElement(By.xpath(selectors.productCard.price)).getText();

            // Parse price from string
            let price = parseFloat(productPrice.split(' ')[1]);

            // Check if product is SPF-50 or SPF-30 and cheaper than the current cheapest
            if (productName.toLowerCase().includes('spf-50') && price < cheapestSpf50Price) {
                cheapestSpf50Product = product;
                cheapestSpf50Price = price;
            } else if (productName.toLowerCase().includes('spf-30') && price < cheapestSpf30Price) {
                cheapestSpf30Product = product;
                cheapestSpf30Price = price;
            }
        }

        // Add the cheapest SPF-50 and SPF-30 products to the cart
        await addToCart(cheapestSpf50Product, 'SPF-50');
        await addToCart(cheapestSpf30Product, 'SPF-30');

        // Navigate to the cart
        let cartButton = await driver.findElement(By.xpath(selectors.productCard.cartButton));
        await driver.wait(until.elementIsVisible(cartButton, 5000));
        await cartButton.click();
        console.log('Navigated to the cart.');

    } catch (error) {
        console.error(error);
    } finally { 
        // Quit the driver
        await driver.quit();
    }
}

// Function to add a product to the cart, if it exists
async function addToCart(product, spfType) {
    if (product) {
        await product.findElement(By.xpath(selectors.productCard.addButton)).click();
        console.log(`Added the cheapest ${spfType} sunscreen to the cart.`);
    } else {
        console.log(`No ${spfType} sunscreen found.`);
    }
}

// Start the Test
sunscreenPageTest();
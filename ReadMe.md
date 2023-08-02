***Skincare Shop Automated Testing***

This project contains automated test scripts for a hypothetical skincare online shop, specifically designed for automation testing practice - https://weathershopper.pythonanywhere.com/. Each page of the website contains "i" symbol next to the page header with a description of automation test task to code.
The scripts provided below are built with Selenium WebDriver and Node.js and are intended to test different parts of the application.

The test scripts are divided into four JavaScript files:

**1. landingPageTest.js**
This script tests the landing page of the website. It uses the weather information displayed on the page to decide whether to navigate to the moisturizer shop or sunscreen shop. If the temperature is below 19 degrees, it will navigate to the moisturizer shop; if the temperature is above 34 degrees, it will navigate to the sunscreen shop. If the temperature is within these limits, it will print a message stating that no special skin care product is needed.

**2. sunscreenPageTest.js**
This script tests the sunscreen product page of the website. It fetches all the sunscreen product elements and finds the cheapest SPF-50 and SPF-30 products. Then, it adds these products to the cart. If no such product is found, a corresponding message is logged.

**3. moisturizerPageTest.js**
This script tests the moisturizer product page of the website. It fetches all the moisturizer product elements and finds the cheapest moisturizers with aloe and almond ingredients. These products are then added to the cart. If no such product is found, a corresponding message is logged.

**4. cartAndPaymentPagesTests.js**
This script tests the cart and payment pages of the website. It adds two products (one with 'spf-30' and one with 'spf-50') to the cart, verifies the items, and proceeds to payment. It fills out card details and submits the form, and then verifies if the payment was successful.

**Config.js**

The config.js file is where the configuration settings for our Selenium WebDriver are stored. This file exports an object with the settings.

**Selectors.js**

The selectors.js file contains the CSS and XPath selectors that our tests use to interact with the web application's elements. These selectors are organised into different categories based on the pages they represent.

**Navigation.js**

The navigation.js file contains functions that assist with navigation in the Weather Shopper application. This file leverages Selenium's WebDriver to interact with the web page.
Prerequisites

To run these scripts, make sure you have the following installed:

Node.js and npm
Google Chrome Browser
ChromeDriver
Additionally, install the project dependencies by running npm install in your project directory.

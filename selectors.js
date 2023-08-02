module.exports = {
    landingPage: {
        temperature: 'temperature',
        moisturizerButton: '/html/body/div[1]/div[3]/div[1]/a/button',
        sunscreenButton: '/html/body/div[1]/div[3]/div[2]/a/button'
    },
    productCard: {
        allProducts: "//button[contains(text(), 'Add')]/ancestor::div[@class='text-center col-4']",
        name: ".//p[contains(@class, 'font-weight-bold')]",
        price: ".//p[contains(@class, 'font-weight-bold')]/following-sibling::p",
        addButton: './button',
        cartButton: '//*[@id="cart"]'
    },
    cart: {
        base: '/html/body/div[1]/div[2]/table',
        payButton: 'stripe-button-el',
        stripeIframe: '//iframe'
    },
    payment: {
        email: '//*[@id="email"]',
        cardNumber: '//*[@id="card_number"]',
        expiryDate: '//*[@id="cc-exp"]',
        cvcCode: '//*[@id="cc-csc"]',
        zipCode: '//*[@id="billing-zip"]',
        submitButton: 'submitButton'
    },
    confirmation: {
        header: 'h2'
    }
};
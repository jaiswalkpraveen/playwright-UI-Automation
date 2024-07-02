class PaymentPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[type="email"]');
        this.cardNumberInput = page.locator('input[name="cardnumber"]');
        this.cardExpiryInput = page.locator('input[name="exp-date"]');
        this.cardCvcInput = page.locator('input[name="cvc"]');
        this.payButton = page.locator('button[type="submit"]');
    }

    async fillPaymentDetails(email, cardNumber, expiryDate, cvc) {
        await this.emailInput.fill(email);
        await this.cardNumberInput.fill(cardNumber);
        await this.cardExpiryInput.fill(expiryDate);
        await this.cardCvcInput.fill(cvc);
    }

    async clickPayButton() {
        await this.payButton.click();
    }

    
}

module.exports = PaymentPage;
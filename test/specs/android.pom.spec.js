var amount = '1.00';
var username = 'cdp19100642';
var password = 'Duke$2020';

const Billing = require('../pages/billing.page');

describe('Duke billing', () => {
  it('pays a specified amount', async () => {
    await Billing.login(username, password);

    try {
      await Billing.maybeLaterDisclaimerBtn.waitForDisplayed({ timeout: 10000 });
      await Billing.maybeLaterDisclaimerBtn.click();
    } catch (error) {
      console.log("There was an error: ", error);
    }

    await Billing.goToBilling();

    await Billing.currentAmtDue.waitForDisplayed({ timeout: 10000 });
    var originalAmount = await Billing.currentAmtDue.getText()
    console.log('The current amount due is: ', originalAmount);

    await Billing.completePayment(amount);

    await Billing.closePaymentConfirmation();

    await Billing.currentAmtDue.waitForDisplayed({ timeout: 10000 });
    var updatedAmount = await Billing.currentAmtDue.getText();
    console.log("The updated amount is: ", updatedAmount);

    var originalAmountInt = Number(originalAmount);
    var updatedAmountInt = Number(updatedAmount);

    //const doTheyMatch = new Boolean(originalAmountInt != updatedAmountInt);
    expect(originalAmountInt).to.not.equal(updatedAmountInt);
  });
});
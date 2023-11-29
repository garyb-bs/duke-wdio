
var amount = 1.00
amount = Number(amount).toFixed(2);

describe('Duke billing', () => {
  it('pays a dollar', async () => {
    var email = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/login_et_username")');
    await email.waitForDisplayed({ timeout: 30000 });
    await email.setValue('cdp19100642')

    var pass = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/login_et_password")');
    await pass.setValue('Duke$2020')

    var ok = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/include_progressbtn_b_fakeText")');
    await ok.click();

    try {
      var maybeLaterDisclaimer = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/button_intercept_dismiss")');
      maybeLaterDisclaimer.click();
    } catch (error) {
      console.log("There was an error: ", error);
    }

    var billing = await $('android=new UiSelector().text("Billing").className("android.widget.TextView")');
    await billing.waitForDisplayed({ timeout: 30000 });
    await billing.click();
    await browser.pause(9000);
    var payNow = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/billcenter_paybill")');
    await payNow.click();

    var amountDueEl = await $("//*[contains(@text, '$')]");
    var amountDue = await amountDueEl.getText();

    console.log("The amount due is: ", amountDue);
    
    var bank = await $("//*[contains(@text, 'Bank')]");
    await bank.touchAction('tap');
    var todayCheckbox = await $('android=new UiSelector().text("Today").className("android.widget.TextView")');
    await todayCheckbox.waitForDisplayed({ timeout: 30000 });
    await todayCheckbox.touchAction('tap');

    var continueBtn = await $('~CONTINUE');
    await continueBtn.waitForDisplayed({ timeout: 30000 });
    await continueBtn.click();

    var continueInDialog = await $('android=new UiSelector().text("CONTINUE").className("android.widget.TextView")');
    await continueInDialog.waitForDisplayed({ timeout: 30000 });
    await continueInDialog.click();

    var otherAmountRadio = await $('android=new UiSelector().text("Other Amount").className("android.widget.TextView")');
    await otherAmountRadio.waitForDisplayed({ timeout: 30000 });
    await otherAmountRadio.click();

    var amountText = await $('android=new UiSelector().className("android.widget.EditText")');
    await amountText.waitForDisplayed({ timeout: 30000 });
    await amountText.setValue("4.00");

    var continueBtn2 = await $('~CONTINUE');
    await continueBtn2.waitForDisplayed({ timeout: 30000 });
    await continueBtn2.click();

    var continueInDialog2 = await $('android=new UiSelector().text("CONTINUE").className("android.widget.TextView")');
    await continueInDialog2.waitForDisplayed({ timeout: 30000 });
    await continueInDialog2.click();

    var accountRadio = await $('android=new UiSelector().text("TestWellsFargo").className("android.widget.TextView")');
    await accountRadio.waitForDisplayed({ timeout: 30000 });
    await accountRadio.click();

    var continueBtn3 = await $('~CONTINUE');
    await continueBtn3.waitForDisplayed({ timeout: 30000 });
    await continueBtn3.click();

    var payNowButton = await $("//*[contains(@text, 'PAY $')]");
    await payNowButton.waitForDisplayed({ timeout: 30000 });
    await payNowButton.click();

    try {
      var cancelDialog = await $('android=new UiSelector().text("YES, CANCEL").className("android.widget.Button")');
      await cancelDialog.waitForDisplayed({ timeout: 30000 });
      await cancelDialog.click();
    } catch (error) {
      console.log("There was an error: ", error);
    }

    var closeButton = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/menu_item_next")');
    await closeButton.waitForDisplayed({ timeout: 30000 });
    await closeButton.click();

    var updatedAmountEl = await $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/billingcenter_amount")');
    var updatedAmount = await updatedAmountEl.getText();
    console.log("The updated amount is: ", updatedAmount);

    var originalAmountInt = Number(amountDue);
    var updatedAmountInt = Number(updatedAmount);

    //const doTheyMatch = new Boolean(originalAmountInt != updatedAmountInt);
    expect(originalAmountInt).to.not.equal(updatedAmountInt);

  });
});
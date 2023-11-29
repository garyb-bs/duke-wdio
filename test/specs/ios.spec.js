
var assert = require('assert');
var amount = "1.00";
amount = Number(amount).toFixed(2);

describe('Duke billing', () => {
  it('pays a dollar', async () => {
    var email = await $('~Username/Email');
    await email.waitForDisplayed({ timeout: 30000 });
    await email.setValue('cdp19100642')

    var pass = await $('~Password');
    await pass.setValue('Duke$2020')

    var ok = await $('-ios class chain:**/XCUIElementTypeButton[`label == " Sign In "`]');
    await ok.click();

    var later = await $('~Later');
    await later.waitForDisplayed({ timeout: 30000 });
    await later.click();

    var billing = await $("~Billing");
    await billing.click();

    await browser.pause(5000);
    
    await $('-ios class chain:**/XCUIElementTypeButton[`label == "Pay Now"`]').click();
    

    var amountDue = await $('-ios class chain:**/XCUIElementTypeStaticText[`label BEGINSWITH "$"`]');
    var originalAmount = await amountDue.getValue();
    
    var bankAcc = await $("//XCUIElementTypeStaticText[@name=\"Bank Account\"]");
    await bankAcc.touchAction('tap');

    var todayRadio = await $('-ios class chain:**/XCUIElementTypeStaticText[`label == "Today"`]');
    await todayRadio.touchAction('tap');

    var continue1 = await $("//XCUIElementTypeButton[@name=\"Continue\"]");
    await continue1.touchAction("tap");

    var continue2 = await $("(//XCUIElementTypeButton[@name=\"Continue\"])[2]");
    await continue2.touchAction("tap");

    var button2 = await $('-ios class chain:**/XCUIElementTypeStaticText[`label == "Other Amount"`]');
    await button2.touchAction("tap");

    var amountField = await $('-ios class chain:**/XCUIElementTypeTextField[`value BEGINSWITH "$"`]');
    await amountField.setValue(amount);

    var continue3 = await $("//XCUIElementTypeButton[@name=\"Continue\"]");
    await continue3.touchAction("tap");

    await browser.pause(700);

    var continue4 = await $("(//XCUIElementTypeButton[@name=\"Continue\"])[2]");
    await continue4.touchAction("tap");

    var bankAccount = await $('-ios class chain:**/XCUIElementTypeStaticText[`label == "TestWellsFargo"`]');
    await bankAccount.touchAction("tap");

    var continue5 = await $("//XCUIElementTypeButton[@name=\"Continue\"]");
    await continue5.touchAction("tap");

    var pay = $('-ios class chain:**/XCUIElementTypeButton[`label BEGINSWITH "Pay $"`]');
    await pay.touchAction("tap");

    var balance = await $("//XCUIElementTypeStaticText");
    await balance.waitForDisplayed({ timeout: 30000 });
  });
});
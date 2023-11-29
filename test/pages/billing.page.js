const Page = require("./page");

class CartPage extends Page {

    // Getter methods for all elements
    get emailAddressField() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/login_et_username")'); }
    get passwordField() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/login_et_password")'); }
    get loginBtn() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/include_progressbtn_b_fakeText")'); }
    get maybeLaterDisclaimerBtn(){ return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/button_intercept_dismiss")'); }
    get billingTab() { return $('~Billing'); }
    get payNowBtn() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/billcenter_paybill")'); }
    get currentAmtDue() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/billingcenter_amount")'); }
    get amountDueTextBox() { return $("//*[contains(@text, '$')]"); }
    get bankAccRadioBtn() { return $('android=new UiSelector().text("Bank Account").className("android.widget.TextView")'); }
    get todayCheckbox() { return $('android=new UiSelector().text("Today").className("android.widget.TextView")'); }
    get continueBtn() { return $('~CONTINUE'); }
    get continueBtnInDialog() { return $('android=new UiSelector().text("CONTINUE").className("android.widget.TextView")'); }
    get otherAmtRadioBtn() { return $('android=new UiSelector().text("Other Amount").className("android.widget.TextView")'); }
    get amtTextBox() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get accRadioBtn() { return $('android=new UiSelector().text("TestWellsFargo").className("android.widget.TextView")'); }
    get finalPayNowBtn() { return $("//*[contains(@text, 'PAY $')]"); }
    get cancelBtnInDialog() { return $('android=new UiSelector().text("YES, CANCEL").className("android.widget.Button")'); }
    get closeBtn() { return $('android=new UiSelector().resourceId("com.dukeenergy.customerapp.uat:id/menu_item_next")'); }

    /**
     * Performs the login operation using the provided email address and password
     */
    async login(emailAddress, password) {
        await this.emailAddressField.waitForDisplayed({ timeout: 10000 });
        await this.emailAddressField.setValue(emailAddress);

        await this.passwordField.waitForDisplayed({ timeout: 10000 });
        await this.passwordField.setValue(password);

        await this.loginBtn.waitForDisplayed({ timeout: 10000 });
        await this.loginBtn.click();
    }

    async goToBilling() {
        await this.billingTab.waitForDisplayed({ timeout: 10000 });
        await this.billingTab.click();
    }

    async completePayment(paymentAmount) {
        await this.payNowBtn.waitForDisplayed({ timeout: 10000 });
        await this.payNowBtn.click();

        await this.bankAccRadioBtn.waitForDisplayed({ timeout: 10000});
        await this.bankAccRadioBtn.touchAction('tap');

        await this.todayCheckbox.waitForDisplayed({ timeout: 10000 });
        await this.todayCheckbox.touchAction('tap');

        await this.continueBtn.waitForDisplayed({ timeout: 10000});
        await this.continueBtn.click();

        await this.continueBtnInDialog.waitForDisplayed({ timeout: 10000});
        await this.continueBtnInDialog.click();

        await this.otherAmtRadioBtn.waitForDisplayed({ timeout: 10000});
        await this.otherAmtRadioBtn.click();

        await this.amtTextBox.waitForDisplayed({ timeout: 10000});
        await this.amtTextBox.setValue(paymentAmount);

        await this.continueBtn.waitForDisplayed({ timeout: 10000});
        await this.continueBtn.click();

        await this.continueBtnInDialog.waitForDisplayed({ timeout: 10000});
        await this.continueBtnInDialog.click();

        await this.accRadioBtn.waitForDisplayed({ timeout: 10000});
        await this.accRadioBtn.touchAction('tap');

        await this.continueBtn.waitForDisplayed({ timeout: 10000});
        await this.continueBtn.click();

        await this.finalPayNowBtn.waitForDisplayed({ timeout: 10000});
        await this.finalPayNowBtn.click();

        try {
            await this.cancelBtnInDialog.waitForDisplayed({ timeout: 10000 });
            await this.cancelBtnInDialog.click();
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    async closePaymentConfirmation() {
        await this.closeBtn.waitForDisplayed({ timeout: 10000 });
        await this.closeBtn.click();
    }
}

module.exports = new CartPage();

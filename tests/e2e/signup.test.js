const { test, expect } = require('../utils/testRunner');

test('User signup flow', async ({ homePage, signUpPage, paymentPage }) => {
  // 1. User navigates to the home page and clicks on "Join Privilee today"
  await homePage.navigate();
  await homePage.clickJoinButton();

  // 2. User moved to signup page
  await expect(homePage.page).toHaveURL('https://staging-website.privilee.ae/signup');

  // 3. Verify all elements and text present in UI
  await expect(signUpPage.adultMembershipCounter).toBeVisible();
  await expect(signUpPage.childrenBundleToggle).toBeVisible();
  await expect(signUpPage.paymentToggle).toBeVisible();
  await expect(signUpPage.page.locator('text=Individual membership')).toBeVisible();

  // 4. User should be able to select all three plans
  // const plans = [12, 3, 1];
  // for (const months of plans) {
  //   await signUpPage.selectPlan(months);
    
  //   // 5. Verify selected plan and assert its price
  //   const price = await signUpPage.getPlanPrice(months);
  //   await expect(signUpPage.page.locator(`text=${price}`)).toBeVisible();
  // }

  // 6. User clicks on continue button
  await signUpPage.clickContinue();

  await paymentPage.page.waitForTimeout(4000);

  // 7. Assert all text in payment page
  await expect(paymentPage.page.locator('text=Selected membership')).toBeVisible();
  await expect(paymentPage.page.locator('text=Your contact details')).toBeVisible();
  await expect(paymentPage.page.locator('text=How do you want to pay?')).toBeVisible();

  // 8. User enters email and card details
  await paymentPage.fillPaymentDetails(
    'test@example.com',
    '4421 4456 6632 3456',
    '03/27',
    '324'
  );

  // 9. Verify pay button is enabled and clickable
  await expect(paymentPage.payButton).toBeEnabled();

  // 10. User clicks pay button and verifies error
  await paymentPage.clickPayButton();
  await expect(paymentPage.page.locator('text=Payment failed: Your card was declined.')).toBeVisible();
  await expect(paymentPage.page.locator('text=Your request was in test mode, but used a non test (live) card.')).toBeVisible();

  // Take a screenshot of the error message
  await paymentPage.page.screenshot({ path: 'payment-error.png' });

});

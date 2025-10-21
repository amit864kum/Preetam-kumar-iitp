const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

  // Click the menu toggle button to open the navigation
  await page.click('.menu-toggle');
  await page.waitForSelector('.nav-menu.active');

  // Click on the 'Research' dropdown to open the sub-menu
  await page.click('a.dropdown-toggle:has-text("Research")');
  await page.waitForSelector('.dropdown.open');

  // Take a screenshot of the centered mobile menu
  await page.screenshot({ path: 'jules-scratch/verification/mobile_menu_centered.png' });

  await browser.close();
})();

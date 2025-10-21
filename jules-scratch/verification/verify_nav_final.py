
import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set a mobile viewport
        await page.set_viewport_size({"width": 375, "height": 812})

        # Navigate to the local index.html file
        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        # Click the menu toggle button to open the navigation
        await page.click(".menu-toggle")

        # Wait for the navigation menu to be visible
        await page.wait_for_selector(".nav-menu.active")

        # Take a screenshot of the open navigation menu to verify centering
        await page.screenshot(path="jules-scratch/verification/navbar_centered.png")

        # Click the "About" link
        await page.click('a[href="#about"]')

        # Wait for the menu to close
        await page.wait_for_selector(".nav-menu:not(.active)")

        # Take a screenshot to verify the menu is closed
        await page.screenshot(path="jules-scratch/verification/navbar_closed_after_click.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

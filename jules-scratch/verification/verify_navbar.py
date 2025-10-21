import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set viewport to a mobile size
        await page.set_viewport_size({"width": 375, "height": 667})

        # Navigate to the local index.html file
        await page.goto(f"file://{os.getcwd()}/index.html")

        # Click the menu toggle button
        await page.click("#menu-toggle")

        # Wait for the menu to open
        await page.wait_for_selector(".nav-menu.active")

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/navbar_verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

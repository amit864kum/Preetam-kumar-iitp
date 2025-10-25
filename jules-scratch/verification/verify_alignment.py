
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Desktop
        page.goto("http://localhost:8000")
        page.set_viewport_size({"width": 1280, "height": 800})
        page.hover(".dropdown")
        page.screenshot(path="jules-scratch/verification/desktop_dropdown.png")

        # Mobile
        page.set_viewport_size({"width": 375, "height": 667})
        page.click("#menu-toggle")
        page.click(".dropdown-toggle")
        page.screenshot(path="jules-scratch/verification/mobile_dropdown.png")

        browser.close()

run()

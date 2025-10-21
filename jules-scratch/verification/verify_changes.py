
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        # Go to the local file
        page.goto(f'file://{file_path}')

        # Take a full page screenshot
        page.screenshot(path='jules-scratch/verification/verification.png', full_page=True)

        browser.close()

if __name__ == "__main__":
    run()

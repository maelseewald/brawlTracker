#!/bin/bash
# We do need to install Playwright in the official image as well
# Based on https://playwright.dev/docs/ci

echo '== Install dependencies =='

# Install NPM packages
npm ci

# Install Playwright browsers and dependencies
# Testing ADNCD-1979 npx playwright install --with-deps

# The tests files should be mounted into the image, starting testing
# Please note the path referenced here needs to match with the Docker mounted volume
# See CLI options https://playwright.dev/python/docs/test-runners#cli-arguments
echo '== Start testing =='
export CI=true
npx playwright test

# Ensure testing related files are owned by Go user, so CI can clean up afterwards
chown -R 2142:102 /testing

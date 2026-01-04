# SE302-Playwright-POM-Project
# SE302 - Software Testing and Maintenance  
# Automated Web Testing using Playwright and Page Object Model

This repository contains the course project for the SE302 Software Testing and Maintenance course.
The project focuses on automated web testing using Playwright and the Page Object Model (POM) architecture.

# Technologies Used
- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)

# Tested Web Application
https://www.saucedemo.com

# Project Structure
pages/
-LoginPage.js
-MenuPage.js
-ProductsPage.js
-CartPage.js
-CheckoutInfoPage.js
-CheckoutOverviewPage.js
-CheckoutCompletePage.js

tests/
-smoke.spec.js
-functional.spec.js

# Test Coverage
- 5 Smoke Tests
- 10 Functional Tests
- Total: 15 Automated Test Cases

# How to Run the Tests
npm install
npx playwright test

# Test Reports
Playwright generates an HTML report after test execution.

npx playwright show-report

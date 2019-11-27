## Solution submission for [Applitools Visual AI Rockstar Hackathon](https://applitools.com/hackathon)
Uses cypress and applitools/eyes-cypress

## Setup

### Prerequisites:
* node js version 8 or higher
* git (if cloning)
* google chrome browser
* chrome driver

### Clone repo and install required dependencies:

```
git clone https://github.com/punarjit-singh/applitools-hackathon.git 
or download and unzip https://github.com/punarjit-singh/applitools-hackathon

cd solution

npm install
```

## Run both traditional and visual AI tests based on app versions:

### Interactive:
```
npm run open:v1

npm run open:v2
```

### CLI:
```
npm run run:v1

npm run run:v2
```

**Note:** All tests are updated for v2, therefore failures in new test runs on v1 can be ignored.

## Results
Eyes Test Results: _[here](https://eyes.applitools.com/app/test-results/00000251828536381163/?accountId=ppHSdiNW9Eeeim16kIS69A~~)_
<br><br>Cypress Test Results: _~projectRoot/solution/mochawesome-report/mochawesome.html_

## Highlevel Code Map

Just to give an overview and understanding of project structure,
the following code map shows where asssertions, selectors and test data is placed:

```
solution
    - cypress
        - fixtures
            - login.json (contains user credentials and other details for data driven tests)
        - integration
            - TraditionalTests.spec.js
            - VisualAITests.spec.js
        - plugins
        - support
            - traditional (contains all assertions and supporting css selectors for traditional cypress tests)
            - visualAI (contains all assertions for visual AI tests)
    - cypress configs etc.
```

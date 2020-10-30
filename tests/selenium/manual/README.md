
# Five Fifths Voter Selenium Testing

**Selenium** is to be used for the automated testing of the front end User Interface from the user perspective for web browser interaction.  
Usage of Selenium can favor a Test Driven Development approach when possible: creation the failing test case shows understanding of the issue or missing feature as well as a recreatable nauture, and can be done by anyone separate from the creation of the code change further enabling collaboration and opportunities to contribute.

# Structure
## **tests/selenium/manual**
These tests are designed to be executed manually by a developer or tester.
The idea is that this is a staging place for tests, as the automated tests should eventually fit into the live_site or developer build tests.
Tests that aren't ready for build, and don't fit an issue, should go here for now.
If they are for a specific service, or  page, they should go into a subfolder labeled as such.
Example: **tests/selenium/manual/connect/twitterfeed** would be the folder for test suites around the UI interaction of the twitter selection on the Connect page. 

# Manual Testing
## Why? Isn't this automation?
There are tests that aren't ready to be put out in to the larger world.
Reasons:
* The test has to be  cleaned up, or made into multiple tests.
* The test suite or tests take too long to be reasonable in an automated build.
* The test requires other tooling to be in place that are not in the automation.
* The test doesn't fit with any otheer tests or test suitess.

# Technology
## Selenium.
- [Selenium](https://www.selenium.dev)

# For developers
See the [Getting Started](doc/GETSTARTED.md) document.
See the [User Guide](doc/5-fifths-user-guide.pdf) document.
Please read the [CONTRIBUTING guidelines](/CONTRIBUTING.md)

# Suggestion
See the [issues list](https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter/issues) for a full list of items that are currently being worked in the **Five Fifths Voter** project. Issues marked as ["top priority"](https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter/issues?q=is%3Aissue+is%3Aopen+label%3A%22top+priority%22) must be considered first.

# Solution Summary
For details, see [Five Fifths Technology Summary](doc/SolutionFortification.md).

# Five Fifths Voter Selenium Testing

**Selenium** is to be used for the automated testing of the front end User Interface from the user perspective for web browser interaction.  
Usage of Selenium can favor a Test Driven Development approach when possible: creation the failing test case shows understanding of the issue or missing feature as well as a recreatable nauture, and can be done by anyone separate from the creation of the code change further enabling collaboration and opportunities to contribute.

# Structure
## **tests/selenium/build**
These tests drive against the built site from the developer/system build, and are designed to assure no breakages. These tests should have equivalent navigation tests as live_site, against the local server (ex. localhost). They should also include non-server, non-data dependent tests, so that the tests can pass solely on a network disconnected localhost. 
Example: A general test suite of main page navigation tests working on various sizes of screen under and over 1056px and browsers reporting as Desktop or mobile devices.

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

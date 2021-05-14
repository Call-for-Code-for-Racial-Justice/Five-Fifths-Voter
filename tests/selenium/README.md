
# Five Fifths Voter Selenium Testing

**Selenium** is to be used for the automated testing of the front end User Interface from the user perspective for web browser interaction.  
Usage of Selenium can favor a Test Driven Development approach when possible: creation the failing test case shows understanding of the issue or missing feature as well as a recreatable nauture, and can be done by anyone separate from the creation of the code change further enabling collaboration and opportunities to contribute.

# Structure
## **tests/selenium/livesite**
These tests drive directly against the live https://www.fivefifthsvoter.com site.
For now, these are just basic tests to be executed through the selenium IDe browser plugins.
These will be part of formal rollout and passing the selenium tests will be the final stage for direct acceptance.
As such, they will eventually be part of the system rollout for the the container. 
These tests should be for the core navigation and basic functionality.
There would be tests specific to the live site that would include URL correctness for links, https, ssl certificate verified, etc.

## **tests/selenium/build**
These tests drive against the built site from the developer/system build, and are designed to assure no breakages. These tests should have equivalent navigation tests as live_site, against the local server (ex. localhost). They should also include non-server, non-data dependent tests, so that the tests can pass solely on a network disconnected localhost. 
Example: A general test suite of main page navigation tests working on various sizes of screen under and over 1056px and browsers reporting as Desktop or mobile devices.

## **tests/selenium/manual**
These tests are designed to be executed manually by a developer or tester.
The idea is that this is a staging place for tests, as the automated tests should eventually fit into the live_site or developer build tests.
Tests that aren't ready for build, and don't fit an issue, should go here for now.
If they are for a specific service, or  page, they should go into a subfolder labeled as such.
Example: **tests/selenium/manual/connect/twitterfeed** would be the folder for test suites around the UI interaction of the twitter selection on the Connect page. 

## **tests/selenium/issues**
These are tests for specific issues. 
The changes for the issues will require a resulting change to the Selenium tests so that the tests will validate the change and pass the test that described the problem.
When the issue is complete, these can be then rolled into the manual tests for inclusion into the build or live_site testing.
Existing behavior issues can usually be seen as a test that fails when it should pass.
The issues can be described as a false positive if the tests pass when they should fail.


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

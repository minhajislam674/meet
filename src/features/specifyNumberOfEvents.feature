Feature: Specify Number of Events

    Scenario: When user has not specified a number, 32 is the default number
        Given The app has been loaded
        When The user has not specified a number of events in the input box
        Then The user should see 32 events by default

    Scenario: User can change the number of events they want to see
        Given The app has been loaded
        When User changes the number of events in the input box
        Then The event list should show the number of events set by the user
Feature: Show/hide event details

    Scenario: An event element is collapsed by default
        Given the main page is open
        When the user perfroms no action
        Then the users should see the event details collapsed by default

    Scenario: User can expand an event to see its details
        Given the main page is open
        When when the user clicks on expand button
        Then the they should see the details of the event

    Scenario: User can collapse an event to hide its details
        Given the user already clicked the expand button
        When the user clicks on the hide element
        Then the event details should collapse
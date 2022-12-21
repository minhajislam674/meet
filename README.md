# About

A serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

# Key Features

- Filter events by city.
- Show/hide event details.
- Specify number of events.
- Use the app when offline.
- Add an app shortcut to the home screen.
- View a chart showing the number of upcoming events by city.

# User Stories

- As a user, I should be able to filter events by city so that I can see the list of events that take place in that city.
- As a user, I should be able to show/hide event details so that I can see more/less information about an event.
- As a user, I should be able to specify the number of events I want the app to display so that I have the complete control of seeing more or fewer events in list.
- As a user, I should be able to use the app when it is offline so that I can see the events I viewed the last time I was online.
- As a user, I should be able to add the app shortcut to my home screen so that I can open the app in a matter of seconds.
- As a user, I should be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

### FEATURE 1: FILTER EVENTS BY CITY

- Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
  > Given user hasn’t searched for any city when the user opens the app. then the user should see a list of all upcoming events.
- Scenario 2: User should see a list of suggestions when they search for a city.
  > Given the main page is open. When user starts typing in the city textbox, then the user should see a list of cities (suggestions) that match what they’ve typed.
- Scenario 3: User can select a city from the suggested list.
  > Given the user was typing “Dresden” in the city textbox and the list of suggested cities is showing, when the user selects a city from the list, then their city should be changed to that city (i.e., “Dresden, Germany”), and the list of suggestions should disappear, and the user should receive a list of upcoming events in that city

### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

- Scenario 1: An event element is collapsed by default
  > Given the main page is open when the user scrolls thorugh different event elements, then the users should see them collapsed by default.
- Scenario 2: User can expand an event to see its details
  > Given the scrolling thorugh different event elements, when the user clicks on expand button, then the they should see the details of the event.
- Scenario 3: User can collapse an event to hide its details
  > Given the user has already seen the event details, when the user clicks on the element or a button, the event details should collapse to previous view.

### FEATURE 3: SPECIFY NUMBER OF EVENTS

- Scenario 1: When user hasn’t specified a number, 32 is the default number
  > Given the user has not specified a number of events to be displayed, when the user opens the app, then the user should see 32 events by default
- Scenario 2: User can change the number of events they want to see
  > Given the list of events window is open, when the user manually changes the number, then the list should be changed to the number the user desired.

### FEATURE 4: USE THE APP WHEN OFFLINE

- Scenario 1: Show cached data when there’s no internet connection
  > Given the user has no internet connection, when the user opens the app, then the previous data (e.g. events viewed, links clicked) should be displayed
- Scenario 2: Show error when user changes the settings (city, time range)
  > Given the user has no internet connection, when user changes the settings (city, time range), then an error should be displayed.

### FEATURE 5: DATA VISUALIZATION

- Scenario 1: Show a chart with the number of upcoming events in each city
  > Given the user has not looked for a specific city, when the user opens the app, then the user should see a vusual graph of upcoming events in each cities.

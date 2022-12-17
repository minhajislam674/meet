import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import App from '../App';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {
        given('The app has been loaded', () => {
        });
        when('The user has not specified a number of events in the input box', () => {
            AppWrapper = mount (<App/>);
        });
        then('The user should see 32 events by default', () => {
            AppWrapper.update(); //without this, none of the changes will be displayed on the App component (asynchronous action)
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });
      });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('The app has been loaded', async () => {
            AppWrapper = await mount (<App/>);
        });
        when('User changes the number of events in the input box', () => {
            AppWrapper.update(); 
            let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
            NumberOfEventsWrapper.find(".number-events-input").simulate("change", {
                target: { value: 12 },
            });
        });
        then('The event list should show the number of events set by the user', () => {
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });
    });

})
import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import App from '../App';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the main page is open', () => {
        });
        when('the user perfroms no action', () => {
            AppWrapper = mount (<App/>);
        });
        then('the users should see the event details collapsed by default', () => {
            AppWrapper.update(); //without this, none of the changes will be displayed on the App component (asynchronous action)
            expect(AppWrapper.find('.event .details')).toHaveLength(0);
        });
      });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the main page is open', () => {
            AppWrapper = mount (<App/>);
        });
        when('when the user clicks on expand button', () => {
            AppWrapper.update(); //without this, none of the changes will be displayed on the App component (asynchronous action)
            AppWrapper.find('.event .show-details-btn').at(0).simulate('click');
        });
        then('the they should see the details of the event', () => {
            expect(AppWrapper.find('.event .details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('the user already clicked the expand button', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.event .show-details-btn').at(0).simulate('click');
        });
        when('the user clicks on the hide element', () => {
            AppWrapper.update(); //without this, none of the changes will be displayed on the App component (asynchronous action)
            AppWrapper.find('.event .hide-details-btn').at(0).simulate('click');
        });
        then('the event details should collapse', () => {
            expect(AppWrapper.find('.event .details')).toHaveLength(0);
        });
    });
})

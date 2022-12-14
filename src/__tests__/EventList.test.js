import React from "react";
import { shallow } from "enzyme";
import EventList from "../EventList";
import Event from '../Event';
import { mockData } from "../mock-data";

describe('<EventList/> component', () => {
    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData} />); //The prop 'events' contains four empty objects.
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length); //This test will only pass if EventList renders exactly four events from its prop events.
    });
})
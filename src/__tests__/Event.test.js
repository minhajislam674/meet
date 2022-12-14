import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from '../mock-data';

describe('<Event/> Component', () => {
    const event = mockData[0];
    let EventWrapper;

    beforeAll(()=> {
        EventWrapper = shallow(<Event event={event}/>);
    });

    test('Check the event component renders', ()=> {
        expect(EventWrapper).toBeDefined();
    });

    test('Renders the event summary', ()=> {
        const summary = EventWrapper.find("h1.summary");
        expect(summary).toHaveLength(1);
        expect(summary.text()).toBe(event.summary)
    });

    test('Renders the event description', ()=> {
        const description = EventWrapper.find("p.description");
        expect(description).toHaveLength(1);
        expect(description.text()).toBe(event.description)
    });

    test('Renders the event start time correctly', ()=> {
        const eventStart  = EventWrapper.find("p.event-start");
        expect(eventStart).toHaveLength(1);
        expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString())
    });
    test('Renders the event location correctly', ()=> {
        const eventLocation  = EventWrapper.find("p.event-location");
        expect(eventLocation).toHaveLength(1);
        expect(eventLocation.text()).toBe(event.location)
    });

    test('Renders button to show details', () => {
        expect(EventWrapper.find('.show-details-btn')).toHaveLength(1);
      });

    test('Do not show details by default', () => {
        expect(EventWrapper.find('.details')).toHaveLength(0);
    });

    test('Show details after clicking show details button', () => {
        EventWrapper.find('.show-details-btn').at(0).simulate('click');
        expect(EventWrapper.find('.details')).toHaveLength(1);
      });

    test('Show aditional event information when details are visible', () => {
        EventWrapper.setState({detailsView: true});
        expect(EventWrapper.find('.details-link')).toHaveLength(1);
    });

    test('Show button to hide aditional event information when details are visible', () => {
        EventWrapper.setState({detailsView: true});
        expect(EventWrapper.find('.hide-details-btn')).toHaveLength(1);
    });

    test('Do not show aditional event information after hide details button is clicked', () => {
        EventWrapper.setState({detailsView: true});
        EventWrapper.find('.hide-details-btn').at(0).simulate('click');
        expect(EventWrapper.find('.details')).toHaveLength(0);
    });

})
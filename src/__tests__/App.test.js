import React from "react";
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App/> component',()=> {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App/>);
    });
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    test('render CitySearch', () => { // This test checks that the required component (in this case, CitySearch) exists
        expect(AppWrapper.find(CitySearch)).toHaveLength(1); 
    });
});

describe('<App/> integration', () => {
    test('App passes "events" state as prop to EventList', () => {
        const AppWrapper = mount(<App/>);
        const AppEventsState = AppWrapper.state("events");
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    test('App passes "locations" state as a prop to CitySearch', ()=> {
        const AppWrapper = mount(<App/>);
        const AppLocationsState = AppWrapper.state("locations");
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
    test('get list of events matching the city selected by the user', async() => {
        const AppWrapper = mount(<App/>);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
    test('get a list of all events when user selects "seee all cities"', async () => {
        const AppWrapper = mount (<App/>);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('Check if number of events value is passed as prop to NumberOfEvents component in App', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({ numberOfEvents: 12 });
    
        expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(12);
        AppWrapper.unmount();
      });

    test('Check if rendered number of events matches the input in NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.find('.number-events-input').simulate('change', {
            target: { value: 24 }
        });
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(24);
        AppWrapper.unmount();
    });

    test("check if events match the content of the mock data", async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.find(".number-events-input").simulate("change", {
          target: { value: 2 },
        });
        await getEvents();
        expect(AppWrapper.state("events")).toEqual(mockData.slice(0, 2));
        AppWrapper.unmount();
      });
});
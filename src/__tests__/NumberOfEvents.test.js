import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents/> component', () => {
    test('Renders the NumberOfEvents component', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents/>);
        expect(NumberOfEventsWrapper).toBeDefined();
    });
    test('Displays 32 events by default', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents/>);
        expect(NumberOfEventsWrapper.find('input.number-events-input').prop('type')).toBe('number');
        expect(NumberOfEventsWrapper.find('input.number-events-input').prop('value')).toBe(32);
      });

      test('Displays user defined value for number of events', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents/>);
        NumberOfEventsWrapper.find('input.number-events-input').simulate('change', {
          target: { value: 16 }
        });
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
      });
});
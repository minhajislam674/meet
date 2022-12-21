import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents/> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
      NumberOfEventsWrapper = shallow(
        <NumberOfEvents updateNumberOfEvents={() => {}} />
      );
    });

    test('Renders the NumberOfEvents component', () => {
        expect(NumberOfEventsWrapper).toBeDefined();
    });
    test('Displays 32 events by default', () => {
        expect(NumberOfEventsWrapper.find('input.number-events-input').prop('type')).toBe('number');
        expect(NumberOfEventsWrapper.find('input.number-events-input').prop('value')).toBe(32);
      });
    test("the input should have the value given in the num prop", () => {
      const NumberOfEventsWrapperWithProp = shallow(
        <NumberOfEvents num={20} updateNumberOfEvents={() => {}} />
      );
      expect(NumberOfEventsWrapperWithProp.state("num")).toBe(20);
    });

    test("input should change on user input", () => {
      expect(NumberOfEventsWrapper.state("num")).toBe(32);
      NumberOfEventsWrapper.find("input.number-events-input").simulate("change", {
        target: { value: 12 },
      });
      expect(NumberOfEventsWrapper.state("num")).toBe(12);
    });

});
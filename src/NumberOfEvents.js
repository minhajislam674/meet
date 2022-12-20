import React, {Component} from "react";
import { ErrorAlert } from "./Alert";
class NumberOfEvents extends Component {
    state = {
        num: 32,
        errorText: ""
      };

    changeNumber = (value) => {
    this.setState({ num: value });
    this.props.updateNumberOfEvents(value);
    if (value < 1 || value > 32) {
        this.setState({errorText: "Please enter a number between 1 and 32"});
    } else this.setState({errorText: ""});
  };

    componentDidMount() {
        this.setState({ num: this.props.num || 32 });
    }

    render() {
        return (
            <div className="number-events">
                <ErrorAlert text={this.state.errorText} />
                <label className="event-numbers-text"> No. of events: </label>
                <input
                    type="number"
                    className="number-events-input"
                    value={this.state.num}
                    onChange={(event) => {
                        this.changeNumber(event.target.value);
                      }}
                    aria-label="number of events"
                >
                </input>
            </div>
        );
    };
}

export default NumberOfEvents;
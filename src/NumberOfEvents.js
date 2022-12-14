import React, {Component} from "react";
class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    }
    changeNumber(value) {
        this.setState({ numberOfEvents: value });
      }
    render() {
        return (
            <div className="number-events">
                <label> Define number of events you want to display: </label>
                <input
                    type="number"
                    className="number-events-input"
                    value={this.state.numberOfEvents}
                    onChange={(event) => {
                        this.changeNumber(event.target.value);
                      }}
                >
                </input>
            </div>
        );
    };
}

export default NumberOfEvents;
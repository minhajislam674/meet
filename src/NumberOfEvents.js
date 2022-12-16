import React, {Component} from "react";
class NumberOfEvents extends Component {
    state = {
        num: 32
      };

    changeNumber = (value) => {
    this.setState({ num: value });
    this.props.updateNumberOfEvents(value);
  };

    componentDidMount() {
        this.setState({ num: this.props.num || 32 });
    }

    render() {
        return (
            <div className="number-events">
                <label> No. of events: </label>
                <input
                    type="number"
                    className="number-events-input"
                    value={this.state.num}
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
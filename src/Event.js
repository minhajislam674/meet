import React, { Component } from "react";

class Event extends Component {
    state = {
        detailsView: false,
      };

    handleDetailsToggle = () => {
    if (!this.state.detailsView) {
        this.setState({
            detailsView: true,
        });
    } else {
        this.setState({
            detailsView: false,
        });
    }
    };
    
    render() {
        const {event} = this.props;
        return (
            <div className="event">
                <h1 className="summary">
                    {event.summary}
                </h1>
                <p className="description">
                    {event.description}
                </p>
                <p className="event-start">
                    {new Date(event.start.dateTime).toString()}
                </p>
                <p className="event-location">
                    {event.location}
                </p>

                {this.state.detailsView ? (
                    <div className="details">
                        <a href={event.htmlLink} className="details-link">
                            Go to event page!
                        </a>
                        <button className="hide-details-btn" onClick={this.handleDetailsToggle}>
                            Hide Details
                        </button>   
                    </div>
                ) : (

                <button className="show-details-btn" onClick={this.handleDetailsToggle}>
                    Show Details
                </button>   

                )}








            </div>
        )
    }
}
export default Event;
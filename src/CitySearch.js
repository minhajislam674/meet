import React, { Component } from "react";
import { InfoAlert } from "./Alert";
import './CitySearch.css';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ""
      }
    handleItemClicked = (suggestion) => {
    this.setState({
        query: suggestion,
        showSuggestions: false,
        infoText: "",
    });
    this.props.updateEvents(suggestion);
    }
    
    handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      });
      if (suggestions.length === 0) {
        this.setState({
            query: value,
            infoText: 'We can not find the city you are looking for. Please try another city',
            showSuggestions: false,
        });
      } else {
        return this.setState({
            query: value,
            suggestions,
            infoText: '',
            showSuggestions: true,
        });
      }
    };


    render() {
        return(
            <>
                <InfoAlert text={this.state.infoText} />
                <div className="CitySearch">
                    <input
                        type="text"
                        className="city"
                        placeholder="Choose your nearest city"
                        value={this.state.query}
                        onChange={this.handleInputChanged}
                        onFocus={() => { this.state.infoText ? this.setState({ showSuggestions: false }) : this.setState({ showSuggestions: true })}}
                        onBlur={() => { this.setState({ showSuggestions: false }) }}
                    />
                        <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none'}}>
                            {this.state.suggestions.map((suggestion) => (
                                <li 
                                    key={suggestion}
                                    onMouseDown={() => this.handleItemClicked(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                                <li key='all' onMouseDown={() => this.handleItemClicked("all")}>
                                    <b>See all cities</b>
                                </li>
                        </ul>
                </div>
            </>
        )
    }
}

export default CitySearch;
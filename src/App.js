import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { mockData } from './mock-data';
import { getEvents, extractLocations, getAccessToken } from'./api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
    numberOfEvents: 32,
    offlineText: '',
    showWelcomeScreen: undefined
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = 
      (location === "all")
      ? events
      : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents)
      });
    });
  }

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events)});
        }
      });
    
    
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "No internet connection. Data loaded from the cache.",
        });
      } else {
        this.setState({
          offlineText: '',
        });
      }

  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <div className='hero-container'>
          <h2> FIND YOUR </h2>
          <p> next big tech event. </p>
        </div>

        <OfflineAlert text={this.state.offlineText}/>
        <div className='top-container'> 
          <CitySearch 
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <NumberOfEvents
            num={this.state.numberOfEvents}
            updateNumberOfEvents={(num) => this.updateNumberOfEvents(num)}
          />
        </div>

        <div className='data-vis-wrapper'>
          <EventGenre events ={this.state.events} />
          <ResponsiveContainer>
            <ScatterChart margin={{right: 50}}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" stroke="white" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} stroke="white" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#fadba9" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className='events-container'> 
          <EventList events={this.state.events} />
        </div>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;

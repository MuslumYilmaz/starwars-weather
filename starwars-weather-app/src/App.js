import { Component } from 'react';
import WeatherData from './WeatherData';

class App extends Component {
  state = {
    weatherData: [
      {id: 1, city: 'Istanbul', degree: 23},
      {id: 2, city: 'London', degree: 12}
    ]
  }
  render() {
    return (
      <div className="App">
        <WeatherData weatherData={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
 
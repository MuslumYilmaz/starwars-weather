import { Component } from 'react';

class WeatherData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            setTitle: ''
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
      

    handleSubmit = async (e) => {
        e.preventDefault();
       console.log(this.state.value);

       await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=93d05955375cda164ef8f110d180e26a`)
       .then(res => res.json())
       .then(
         (result) => {
             console.log(result)
             console.log(result.name)
         })
    }

    render() {
        return (
            <div className="postData">
                <h3>Weather</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your city</label>
                    <input value={this.state.value} onChange={this.handleChange}/>
                    <button>Check!</button>
                    <p>{this.state.setTitle}</p>
                </form>
            </div>
        )
    }

}

export default WeatherData;
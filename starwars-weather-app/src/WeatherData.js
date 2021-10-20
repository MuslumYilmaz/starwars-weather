import { Component } from 'react';
import './WeatherData.css';
import coruscant from './images/coruscant.jpg';

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

       let value = this.state.value;

       await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=93d05955375cda164ef8f110d180e26a`)
       .then(res => res.json())
       .then(
         (result) => {
             console.log(result);
             let weather = Math.floor(result.main.feels_like);
             let city = result.name;

             this.galaxies(weather, city);
         })
    }

    galaxies = (weather, city) => {
        console.log(weather, city);

        switch (true) {
            case weather <= 0:
                console.log(`hmm ${weather}° huh? ${city} feels like Hoth`);
                break;
            case weather > 0 && weather <= 15:
                console.log(`hmm ${weather}° huh? ${city} feels like Coruscant`);
                break;  
            case weather > 15 && weather <= 25:
                console.log(`hmm ${weather}° huh? ${city} feels like Naboo`);     
                break;
            case weather > 25 && weather <= 30:
                console.log(`hmm ${weather}° huh? ${city} feels like Endor`);     
                break;    
            case weather > 30 && weather <= 35:
                console.log(`hmm ${weather}° huh? ${city} feels like Tatooine`);     
                break;  
            case weather >= 35:
                console.log(`hmm ${weather}° huh? ${city} feels like Mustafar`);     
                break;
            default:
                console.log(weather)
                break;  
        }
    }

    render() {
        return (
        <div className="row">
            <div className="col s12 offset-s4">
                <div className="row">
                    <form className="col s12 pull-s1" onSubmit={this.handleSubmit}>
                        <div className="row  valign-wrapper">
                            <div className="input-field col s6 valign">
                                <label htmlFor="icon_prefix">Enter your city</label>
                                <input id="icon_prefix" type="text" className="validate" value={this.state.value} onChange={this.handleChange} />
                            </div>
                            <div className="col s6 ">
                            <a className="btn-floating pulse valign" href="/#"><i className="material-icons">cloud_queue</i></a>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="row">
                    <div className="col s2 m4">
                        <div className="card  z-depth-4">
                            <div className="card-image">
                                <img src={coruscant} alt="img"/>
                                <span className="card-title">Card Title</span>
                            </div>
                            <div className="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                                <p>This is a link</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
            
        )
    }

}

export default WeatherData;
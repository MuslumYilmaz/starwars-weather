import { Component } from 'react';
import './WeatherData.css';
import Coruscant from './images/coruscant.jpg';
import Hoth from './images/hoth.jpg';
import Mustafar from './images/mustafar.webp';
import Naboo from './images/naboo.jpg';
import Endor from './images/endor.jpg';
import Tatooine from './images/tattoine.jpg';
import errorImage from './images/404.jpg';


class WeatherData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            setTitle: '',
            display: false,
            image: '',
            galaxy : '',
            response : '',
            description : '',
            error: false
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
        try {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=93d05955375cda164ef8f110d180e26a`)
            .then(res => res.json())
            .then(
              (result) => {
                  this.setState({error: false});
                  console.log(result.weather[0]);
                  let weather = Math.floor(result.main.feels_like);
                  let city = result.name;
                  let description = result.weather[0].description;
                  this.setState({display: true});

                  this.galaxies(weather, city, description);
              })
        } catch (error) {
            this.setState({display: false, error: true});
            console.log(error);
        }

    }

    galaxies = (weather, city, description) => {
        console.log(weather, city, description);

        switch (true) {
            case weather <= 0:
                this.setState({image: Hoth, galaxy: 'Hoth', description: description, response: `Oh my ${weather}°? it feels like ${this.state.galaxy} out there`});
                break;
            case weather > 0 && weather <= 15:
                this.setState({image: Coruscant, galaxy: 'Coruscant', description: description, response: `Yikes ${weather}°? it's like ${this.state.galaxy} out there`});
                break;  
            case weather > 15 && weather <= 25:
                this.setState({image: Naboo, galaxy: 'Naboo', description: description, response: `hmm ${weather}° huh? ${city} feels like ${this.state.galaxy}`});
                break;
            case weather > 25 && weather <= 30:
                this.setState({image: Endor, galaxy: 'Endor', description: description, response: `hmm ${weather}° huh? ${city} feels like ${this.state.galaxy}`});
                break;    
            case weather > 30 && weather <= 35:
                this.setState({image: Tatooine, galaxy: 'Tatooine', description: description, response: `hmm ${weather}° huh? ${city} feels like ${this.state.galaxy}`})
                break;  
            case weather >= 35:
                this.setState({image: Mustafar, galaxy: 'Mustafar', description: description, response: `hmm ${weather}° huh? ${city} feels like ${this.state.galaxy}`})
                break;
            default:
                console.log(weather)
                break;  
        }
    }

    errorPopup = () => {
        this.setState({error: false});
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
                            <div className="col s6">
                            <button className="btn-floating pulse valign btn-large" href="/#"><i className="material-icons">cloud_queue</i></button>
                            
                            </div>
                        </div>
                    </form>
                </div>

                <div className="row">
                {this.state.display ? 
                    <div className="col s2 m4">
                        <div className="card  z-depth-4">
                            <div className="card-image">
                                <img src={this.state.image} alt="img"/>
                                <span className="card-title">{this.state.galaxy}</span>
                            </div>
                            <div className="card-content">
                                <p>{this.state.response}</p>
                            </div>
                            <div className="card-action">
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                 : null}
                </div>

                {this.state.error ? 
                <div className="row">
                    <div className="col s2 m4">
                        <div className="card  z-depth-4">
                            <div className="card-image">
                                <img src={errorImage} alt="img"/>
                                <span className="card-title">404</span>
                                <a className="btn-floating halfway-fab waves-effect waves-light red" href="/#" onClick={this.errorPopup}><i class="material-icons">check</i></a>
                            </div>
                            <div className="card-content">
                                <p>Seems like there is an issue with your search :(</p>
                            </div>
                            <div className="card-action">
                                <p>Please try again.</p>
                            </div>
                        </div>
                    </div>    
                </div> : null}
            </div>
        </div>    
            
        )
    }

}

export default WeatherData;
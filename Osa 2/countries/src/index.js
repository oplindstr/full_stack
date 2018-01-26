import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        countriesToShow: [],
        countryCount: 0,
        country: '',
        initial: true
      }
    }

    handleCountryChange = (event) => {
        const countryval = event.target.value
        const countriesToShow = this.state.countries.filter(country => country.name.toUpperCase().includes(countryval.toUpperCase()))        
        this.setState({ country: countryval,
                        initial: false,
                        countriesToShow: countriesToShow,
                        countryCount: countriesToShow.length
                     })
    }

    setCountry = (event) => {
        const countryval = event.target.innerHTML
        const countriesToShow = this.state.countries.filter(country => country.name === countryval)            
        this.setState({ country: countryval,
                        initial: false,
                        countriesToShow: countriesToShow,
                        countryCount: countriesToShow.length
                     })
                     
    }
  
    componentWillMount() {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.setState({ countries: response.data })
        })
    }

    render() {

        if (this.state.initial || this.state.country.length === 0) {
            return (
                <div>
                    <p>Find countries</p>
                    <input
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                        />
                </div>
            )
        }
        else if (this.state.countryCount === 0) {
            return (
                <div>
                    <p>Find countries</p>
                    <input
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                        />
                    <p>No matches, specify another filter</p>
                </div>
            )
        }
        else if (this.state.countryCount > 10) {

            return (
                <div>
                    <p>Find countries</p>
                    <input
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                        />
                    <p>Too many matches, specify another filter</p>
                </div>
            )
        }

        else if (this.state.countryCount === 1) {

            const country = this.state.countriesToShow[0]

            return (
                <div>
                    <p>Find countries</p>
                    <input
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                        />
                    
                    <h1>{country.name}</h1>
                    <p>capital: {country.capital}</p>
                    <p>population: {country.population}</p>
                    <img src={country.flag} height="100" width="200" alt=""/>
                    
                </div>
            )
        }

        else {
            return (
                <div>
                    <p>Find countries</p>
                    <input
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                        />
                    
                    <ul>
                        {this.state.countriesToShow.map(country => <Country key={country.numericCode} name={country.name} onClick={this.setCountry} />)}
                    </ul>
                </div>
            )
        }
    }
}

const Country = (props) => {
    return (
        <ul>
             <p key={props.id} onClick={props.onClick}>{props.name}</p>
        </ul>
    )
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
    )
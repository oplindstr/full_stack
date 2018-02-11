import React from 'react'
import ReactDOM from 'react-dom'

import Person from './components/Person'
import Haku from './components/Haku'
import Lomake from './components/Lomake'
import Notification from './components/Notification'
import personService from './services/persons'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
      ],
      newName: '',
      newPhonenumber: '',
      filter: '',
      message: null,
      error: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.persons.map(person => person.name).indexOf(this.state.newName) === -1) {
        const personObject = {
            name: this.state.newName,
            number: this.state.newPhonenumber
          }

        personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newPhonenumber: '',
          message: `lisättiin ${this.state.newName}`
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
      })
    }
    else {
      const person = this.state.persons.find(person => person.name === this.state.newName)
      const changedPerson = { ...person, number: this.state.newPhonenumber }
      personService
      .update(person.id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.name !== this.state.newName ? person : changedPerson),
          newName: '',
          newPhonenumber: '',
          message: `muokattiin henkilöä ${this.state.newName}`
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
      })
      .catch(error => {
        this.setState({
          error: `henkilö '${this.state.newName}' on jo valitettavasti poistettu palvelimelta`,
          persons: this.state.persons.filter(person => person.name !== this.state.newName)
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
    }
  }

  deletePerson = (id, name) => {
    return () => {
      if (window.confirm(`Poistetaanko ${name}?`)) { 
        personService
        .destroy(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id),
            message: `poistettiin henkilö ${name}`
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handlePhonenumberChange = (event) => {
    this.setState({ newPhonenumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.includes(this.state.filter))

    const henkilot = personsToShow.map((person) =>
    <Person key={person.id}
              person={person}
              deletePerson={this.deletePerson(person.id, person.name)} />

  )
    return (
      <div>
          <h2>Puhelinluettelo</h2>
          <Notification message={this.state.message} error={this.state.error}/>
          <Lomake onSubmit={this.addPerson} nameValue={this.state.newName} nameOnchange={this.handleNameChange} phonenumberValue={this.state.newPhonenumber} phonenumberOnchange={this.handlePhonenumberChange}/>
          <Haku value={this.state.filter} onChange={this.handleFilterChange}/>
          
          <div>
            <h1>Numerot</h1>
            <ul>
              {henkilot}
            </ul>
          </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App  />,
  document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  seuraava() {
      this.setState({ selected: Math.floor(Math.random() * anecdotes.length) })
  }

  aanesta() {
      let uusi = this.state.votes
      uusi[this.state.selected] = this.state.votes[this.state.selected] + 1
      this.setState({ votes: uusi })
  }

  suosituin = () => {
    let suurinArvo = 0
    let suurinIndeksi = 0
    this.state.votes.forEach(function(arvo, index) {
      if (arvo > suurinArvo) {
        suurinArvo = arvo
        suurinIndeksi = index
      }
    });
    return suurinIndeksi
  }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>Has {this.state.votes[this.state.selected]} votes</p>
        <button onClick={this.aanesta.bind(this)}>Äänestä</button>
        <button onClick={this.seuraava.bind(this)}>Seuraava</button>

        <br/>
        <br/>
        <b>Anecdote with most votes</b>
        <br/>

        <p>{this.props.anecdotes[this.suosituin()]}</p>
        <p>Has {this.state.votes[this.suosituin()]} votes</p>
      </div>
    )
  }
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
import React from 'react'
import { addVote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  vote = (anecdote) => (e) => {
    this.props.addVote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
  }

  render() {
    const anecdotes = this.props.visibleAnecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { addVote, notify }
)(AnecdoteList)

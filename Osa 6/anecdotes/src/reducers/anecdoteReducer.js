import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !==action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes+1} ]
  case 'CREATE':
    return [...store, action.data]
  case 'INIT':
    return action.data
  default:
    return store
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id
    await anecdoteService.update(id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
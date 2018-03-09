
const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
}

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    filter: text
  }
}
  
export default filterReducer
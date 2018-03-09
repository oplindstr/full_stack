const notificationAtStart = 'initial notification'

const notificationReducer = (store = notificationAtStart, action) => {
  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return [action.data]
  case 'REMOVE_NOTIFICATION':
    return ''
  default:
    return store
  }
}

export const notify = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: content
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time*1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
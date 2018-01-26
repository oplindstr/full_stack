import React from 'react';

const Notification = ({ message, error }) => {
    if (message === null && error === null) {
      return null
    }
    if (error !== null) {
        return (
            <div className="error">
              {error}
            </div>
          )
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  export default Notification
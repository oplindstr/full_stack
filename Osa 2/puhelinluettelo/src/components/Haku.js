import React from 'react';

const Haku = (props) => {
    return (
        <div>
            <h2>Haku</h2>
            <div>
                <input
                value={props.value}
                onChange={props.onChange}
                />
            </div>
        </div>
    )
  }

  export default Haku
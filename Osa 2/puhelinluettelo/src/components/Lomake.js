import React from 'react';

const Lomake = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
            <div>
                nimi: <input
                value={props.nameValue}
                onChange={props.nameOnchange}
            />
            </div>
            <div>
                puhelinnumero: <input
                value={props.phonenumberValue}
                onChange={props.phonenumberOnchange}
            />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
            </form>
        </div>
    )
  }

  export default Lomake
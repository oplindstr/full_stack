import React from 'react'

const Sisalto = (props) => {
    const rivit = () => props.osat.map(osa => 
        <li key={osa.id}><Osa osa={osa}/></li>
      )
  return (
  	<ul>
        {rivit()}
    </ul>
  )
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Otsikko = (props) => {
    return (
      <h1>{props.kurssi}</h1>
    )
  }

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi.nimi}/>
            <Sisalto osat={props.kurssi.osat}/>
            <Yhteensa osat={props.kurssi.osat}/>
        </div>
    )
}

const Yhteensa = (props) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const tehtavia = () => props.osat.map(osa => 
        osa.tehtavia
      ).reduce(reducer)
  return (
    <p>Yhteensä {tehtavia()} tehtävää</p>
  )
}

export default Kurssi
import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'

const Kurssit = (props) => {
    const kurssit = () => props.kurssit.map(kurssi => 
        <li key={kurssi.id}><Kurssi kurssi={kurssi}/></li>
      )
  return (
  	<ul>
        {kurssit()}
    </ul>
  )
}

const App = () => {
    const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <Kurssit kurssit={kurssit} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
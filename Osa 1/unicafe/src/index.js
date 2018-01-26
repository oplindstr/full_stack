import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = (props) => (
    <tr>
        <td>{props.nimi}</td>
        <td>{props.maara}</td>
    </tr>
)

const PercentStatistic = (props) => (
    <tr>
        <td>{props.nimi}</td>
        <td>{props.maara} %</td>
    </tr>
)

function Statistics(props) {
    if (props.palautteitaAnnettu) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <table>
                    <tbody>
                        <Statistic nimi="Hyviä" maara={props.hyvia}/>
                        <Statistic nimi="Neutraaleja" maara={props.neutraaleja}/>
                        <Statistic nimi="Huonoja" maara={props.huonoja}/>
                        <Statistic nimi="Keskiarvo" maara={props.keskiarvo}/>
                        <PercentStatistic nimi="Positiivisia" maara={props.positiivisia}/>   
                    </tbody>     
                </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Statistiikka</h1>
            <p>Yhtään palautetta ei ole annettu</p>       
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          hyvia: 0,
          neutraaleja: 0,
          huonoja: 0
        }
      }

      lisaaArvoon = (nimi, arvo) => {
        return () => {
            this.setState({ [nimi]: arvo })
          }
      }

      palautteitaAnnettu = () => {
          if (this.state.hyvia > 0 || this.state.neutraaleja > 0 || this.state.huonoja > 0) {
              return true
          }
          return false
      }

      keskiarvo = () => {
          return (this.state.hyvia - this.state.huonoja) / 3
      }

      positiivisia = () => {
          return (this.state.hyvia / (this.state.hyvia + this.state.neutraaleja + this.state.huonoja)) * 100
      }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.lisaaArvoon("hyvia", this.state.hyvia + 1)} text="Hyvä"/>
                <Button handleClick={this.lisaaArvoon("neutraaleja", this.state.neutraaleja + 1)} text="Neutraali"/>
                <Button handleClick={this.lisaaArvoon("huonoja", this.state.huonoja + 1)} text="Huono"/>        
                <Statistics palautteitaAnnettu={this.palautteitaAnnettu()} hyvia={this.state.hyvia} neutraaleja={this.state.neutraaleja} huonoja={this.state.huonoja} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

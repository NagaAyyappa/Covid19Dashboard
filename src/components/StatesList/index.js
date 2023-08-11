import {Link} from 'react-router-dom'
import './index.css'

const StatesList = props => {
  const {details} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    population,
    stateCode,
  } = details
  const active = confirmed[0] - (recovered[0] + deceased[0])
  return (
    <Link to={`/state/${stateCode}`} className="link-item">
      <li className="state-link-container">
        <p className="state-name">{stateName}</p>
        <p className="confirmed-state">{confirmed[0]}</p>
        <p className="active-state">{active}</p>
        <p className="recovered-state">{recovered[0]}</p>
        <p className="deceased-state">{deceased[0]}</p>
        <p className="population-state">{population[0]}</p>
      </li>
    </Link>
  )
}

export default StatesList

import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const StateSearchResults = props => {
  const {details} = props
  const {stateName, stateCode} = details
  return (
    <Link to={`/state/${stateCode}`} className="link-item">
      <li className="search-list-container">
        <p className="search-name">{stateName}</p>
        <div className="arrow-container">
          <p className="search-code">{stateCode}</p>
          <BiChevronRightSquare className="arrow-icon" />
        </div>
      </li>
    </Link>
  )
}

export default StateSearchResults

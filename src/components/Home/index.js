import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StatesList from '../StatesList'
import StateSearchResults from '../StateSearchResults'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    currentApiStatus: apiStatus.initial,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesInfo: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getStatesList()
  }

  getStatesList = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(eachState => {
        if (data[eachState.state_code]) {
          const {total} = data[eachState.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(state => ({
        stateName: state.state_name,
        stateCode: state.state_code,
        confirmed: Object.keys(data)
          .filter(item => item === state.state_code)
          .map(Item => data[Item].total.confirmed),
        recovered: Object.keys(data)
          .filter(item => item === state.state_code)
          .map(Item => data[Item].total.recovered),
        deceased: Object.keys(data)
          .filter(item => item === state.state_code)
          .map(Item => data[Item].total.deceased),
        population: Object.keys(data)
          .filter(item => item === state.state_code)
          .map(Item => data[Item].meta.population),
      }))
      console.log(states)
      this.setState({
        currentApiStatus: apiStatus.success,
        totalActiveCases: nationalWideActiveCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        statesInfo: states,
      })
    }
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onAscSortButtonClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((item1, item2) => {
      const firstState = item1.stateName.toUpperCase()
      const secondState = item2.stateName.toUpperCase()
      return firstState > secondState ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  onDescSortButtonClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((item1, item2) => {
      const firstState = item1.stateName.toUpperCase()
      const secondState = item2.stateName.toUpperCase()
      return firstState < secondState ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  renderSuccessView = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
      statesInfo,
    } = this.state
    return (
      <>
        <div className="nation-wide-container">
          <div
            className="nation-wide-data"
            data-testid="countryWideConfirmedCases"
          >
            <p className="confirmed-para">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691489841/check-mark_1confirm_zmpi7o.png"
              alt="country wide confirmed cases pic"
              className="confirmed-cases"
            />
            <p className="total-confirmed">{totalConfirmedCases}</p>
          </div>
          <div
            className="nation-wide-data"
            data-testid="countryWideActiveCases"
          >
            <p className="active-para">Active</p>
            <img
              src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562301/protection_1_hhwc9e.png"
              alt="country wide active cases pic"
              className="active-cases"
            />
            <p className="total-active">{totalActiveCases}</p>
          </div>
          <div
            className="nation-wide-data"
            data-testid="countryWideRecoveredCases"
          >
            <p className="recovered-para">Recovered</p>
            <img
              src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562531/recovered_1_fgdpmk.png"
              alt="country wide recovered cases pic"
              className="active-cases"
            />
            <p className="total-recovered">{totalRecoveredCases}</p>
          </div>
          <div
            className="nation-wide-data"
            data-testid="countryWideDeceasedCases"
          >
            <p className="deceased-para">Deceased</p>
            <img
              src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562509/breathing_1_kd5xx6.png"
              alt="country wide deceased cases pic"
              className="active-cases"
            />
            <p className="total-deceased">{totalDeceasedCases}</p>
          </div>
        </div>
        <div className="state-wise-data">
          <div className="data-container">
            <div
              className="sort-container"
              data-testid="stateWiseCovidDataTable"
            >
              <p className="state">States/UT</p>
              <button
                type="button"
                data-testid="ascendingSort"
                className="sort-button"
              >
                <FcGenericSortingAsc
                  className="asc"
                  onClick={this.onAscSortButtonClick}
                />
              </button>
              <button
                type="button"
                className="sort-button"
                data-testid="descendingSort"
              >
                <FcGenericSortingDesc
                  className="asc"
                  onClick={this.onDescSortButtonClick}
                />
              </button>
            </div>
            <p className="confirm">Confirmed</p>
            <p className="confirm">Active</p>
            <p className="confirm">Recovered</p>
            <p className="confirm">Deceased</p>
            <p className="confirm">Population</p>
          </div>
          <ul
            className="states-unordered-list"
            data-testid="searchResultsUnorderedList"
          >
            {statesInfo.map(eachItem => (
              <StatesList details={eachItem} key={eachItem.stateCode} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiStatus, searchInput, statesInfo} = this.state
    const searchResults = statesInfo.filter(eachItem =>
      eachItem.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="home-container">
        <Header />
        <div className="home-search-container">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="search-text"
              placeholder="Enter the state"
              value={searchInput}
              onChange={this.onSearchChange}
            />
          </div>
          {searchInput !== '' && (
            <ul
              className="search-unordered-list"
              data-testid="searchResultsUnorderedList"
            >
              {searchResults.map(eachState => (
                <StateSearchResults
                  details={eachState}
                  key={eachState.stateCode}
                />
              ))}
            </ul>
          )}
          {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
          {currentApiStatus === apiStatus.success && this.renderSuccessView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home

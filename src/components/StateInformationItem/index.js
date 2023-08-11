import {Component} from 'react'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import DailySpreadCharts from '../DailySpreadCharts'
import BarChartView from '../BarChart'

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
  loading: 'LOADING',
  success: 'SUCCESS',
}

class StateInformationItem extends Component {
  state = {
    stateInfo: [],
    currentApiStatus: apiStatus.initail,
    confirmedDistricts: [],
    recoveredDistricts: [],
    activeDistricts: [],
    deceasedDistricts: [],
    currentTab: 'Confirmed',
  }

  componentDidMount() {
    this.getStateInfo()
  }

  onConfirmButtonClick = () => {
    this.setState({currentTab: 'Confirmed'})
  }

  onActiveButtonClick = () => {
    this.setState({currentTab: 'Active'})
  }

  onRecoveredButtonClick = () => {
    this.setState({currentTab: 'Recovered'})
  }

  onDeceasedButtonClick = () => {
    this.setState({currentTab: 'Deceased'})
  }

  getStateInfo = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data[stateCode])
    const state = statesList.filter(Item => Item.state_code === stateCode)
    console.log(state[0].state_name)
    const updatedStateData = {
      date: data[stateCode].meta.last_updated,
      stateName: state[0].state_name,
      confirmed: data[stateCode].total.confirmed,
      recovered: data[stateCode].total.recovered,
      deceased: data[stateCode].total.deceased,
      tested: data[stateCode].total.tested,
      active:
        data[stateCode].total.confirmed -
        (data[stateCode].total.recovered + data[stateCode].total.deceased),
    }
    console.log(updatedStateData)
    const keyNames = Object.keys(data[stateCode].districts)
    const confirmedList = keyNames.map(eachItem => ({
      districtName: eachItem,
      confirmedCases: data[stateCode].districts[eachItem].total.confirmed
        ? data[stateCode].districts[eachItem].total.confirmed
        : 0,
    }))

    const sortedConfirmedList = confirmedList.sort((a, b) => {
      const item1 = a.confirmedCases
      const item2 = b.confirmedCases
      return item1 < item2 ? 1 : -1
    })
    console.log(sortedConfirmedList)

    const recoveredList = keyNames.map(eachItem => ({
      districtName: eachItem,
      recoveredCases: data[stateCode].districts[eachItem].total.recovered
        ? data[stateCode].districts[eachItem].total.recovered
        : 0,
    }))

    const sortedRecoveredList = recoveredList.sort((a, b) => {
      const item1 = a.recoveredCases
      const item2 = b.recoveredCases
      return item1 < item2 ? 1 : -1
    })
    console.log(sortedRecoveredList)

    const activeList = keyNames.map(eachItem => ({
      districtName: eachItem,
      activeCases:
        data[stateCode].districts[eachItem].total.confirmed -
        (data[stateCode].districts[eachItem].total.recovered +
          data[stateCode].districts[eachItem].total.deceased)
          ? data[stateCode].districts[eachItem].total.confirmed -
            (data[stateCode].districts[eachItem].total.recovered +
              data[stateCode].districts[eachItem].total.deceased)
          : 0,
    }))

    const sortedActiveList = activeList.sort((a, b) => {
      const item1 = a.activeCases
      const item2 = b.activeCases
      return item1 < item2 ? 1 : -1
    })
    console.log(sortedActiveList)

    const deceasedList = keyNames.map(eachItem => ({
      districtName: eachItem,
      deceasedCases: data[stateCode].districts[eachItem].total.deceased
        ? data[stateCode].districts[eachItem].total.deceased
        : 0,
    }))

    const sortedDeceasedList = deceasedList.sort((a, b) => {
      const item1 = a.deceasedCases
      const item2 = b.deceasedCases
      return item1 < item2 ? 1 : -1
    })
    console.log(sortedDeceasedList)
    this.setState({
      stateInfo: updatedStateData,
      currentApiStatus: apiStatus.success,
      confirmedDistricts: sortedConfirmedList,
      activeDistricts: sortedActiveList,
      recoveredDistricts: sortedRecoveredList,
      deceasedDistricts: sortedDeceasedList,
    })
  }

  renderSuccessView = () => {
    const {
      stateInfo,
      confirmedDistricts,
      recoveredDistricts,
      activeDistricts,
      deceasedDistricts,
      currentTab,
    } = this.state
    const {
      date,
      stateName,
      confirmed,
      deceased,
      tested,
      recovered,
      active,
    } = stateInfo

    const newDate = date.split('-')
    const getMonth = newDate[2].substring(0, 2)
    const formattedDate = format(
      new Date(newDate[0], newDate[1] - 1, getMonth),
      'MMMM do yyyy',
    )
    console.log(formattedDate)
    return (
      <>
        <div className="state-details">
          <div>
            <div className="state-name-container">
              <p className="state-name-text">{stateName}</p>
            </div>
            <p className="last-update">Last update on {formattedDate}.</p>
          </div>
          <div>
            <p className="state-tested">Tested</p>
            <p className="tested-cases">{tested}</p>
          </div>
        </div>
        <div className="state-wide-container">
          <button
            type="button"
            className="button-value"
            onClick={this.onConfirmButtonClick}
          >
            <div
              className={
                currentTab === 'Confirmed'
                  ? 'nation-wide-data confirm-bg-color'
                  : 'nation-wide-data'
              }
              data-testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="confirmed-para">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691489841/check-mark_1confirm_zmpi7o.png"
                alt="state specific confirmed cases pic"
                className="confirmed-cases"
              />
              <p className="total-confirmed">{confirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="button-value"
            onClick={this.onActiveButtonClick}
          >
            <div
              className={
                currentTab === 'Active'
                  ? 'nation-wide-data active-bg-color'
                  : 'nation-wide-data'
              }
              data-testid="stateSpecificActiveCasesContainer"
            >
              <p className="active-para">Active</p>
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562301/protection_1_hhwc9e.png"
                alt="state specific active cases pic"
                className="active-cases"
              />
              <p className="total-active">{active}</p>
            </div>
          </button>
          <button
            type="button"
            className="button-value"
            onClick={this.onRecoveredButtonClick}
          >
            <div
              className={
                currentTab === 'Recovered'
                  ? 'nation-wide-data recovered-bg-color'
                  : 'nation-wide-data'
              }
              data-testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="recovered-para">Recovered</p>
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562531/recovered_1_fgdpmk.png"
                alt="state specific recovered cases pic"
                className="active-cases"
              />
              <p className="total-recovered">{recovered}</p>
            </div>
          </button>
          <button
            type="button"
            className="button-value"
            onClick={this.onDeceasedButtonClick}
          >
            <div
              className={
                currentTab === 'Deceased'
                  ? 'nation-wide-data deceased-bg-color'
                  : 'nation-wide-data'
              }
              data-testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="deceased-para">Deceased</p>
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691562509/breathing_1_kd5xx6.png"
                alt="state specific deceased cases pic"
                className="active-cases"
              />
              <p className="total-deceased">{deceased}</p>
            </div>
          </button>
        </div>
        {currentTab === 'Confirmed' && (
          <div className="district-details">
            <h1 className="top-districts confirmed-color">Top Districts</h1>
            <ul
              className="sorted-unordered-list"
              data-testid="topDistrictsUnorderedList"
            >
              {confirmedDistricts.map(eachItem => (
                <li className="district-list-item" key={eachItem.districtName}>
                  <p className="district-para-cases">
                    {eachItem.confirmedCases}
                  </p>
                  <p className="district-para-name">{eachItem.districtName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentTab === 'Active' && (
          <div className="district-details">
            <h1 className="top-districts active-color">Top Districts</h1>
            <ul
              className="sorted-unordered-list"
              data-testid="topDistrictsUnorderedList"
            >
              {activeDistricts.map(eachItem => (
                <li className="district-list-item" key={eachItem.districtName}>
                  <p className="district-para-cases">{eachItem.activeCases}</p>
                  <p className="district-para-name">{eachItem.districtName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentTab === 'Recovered' && (
          <div className="district-details">
            <h1 className="top-districts recovered-color">Top Districts</h1>
            <ul
              className="sorted-unordered-list"
              data-testid="topDistrictsUnorderedList"
            >
              {recoveredDistricts.map(eachItem => (
                <li className="district-list-item" key={eachItem.districtName}>
                  <p className="district-para-cases">
                    {eachItem.recoveredCases}
                  </p>
                  <p className="district-para-name">{eachItem.districtName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentTab === 'Deceased' && (
          <div className="district-details">
            <h1 className="top-districts deceased-color">Top Districts</h1>
            <ul
              className="sorted-unordered-list"
              data-testid="topDistrictsUnorderedList"
            >
              {deceasedDistricts.map(eachItem => (
                <li className="district-list-item" key={eachItem.districtName}>
                  <p className="district-para-cases">
                    {eachItem.deceasedCases}
                  </p>
                  <p className="district-para-name">{eachItem.districtName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <BarChartView currentTab={currentTab} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="stateDetailsLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiStatus} = this.state
    return (
      <div className="state-information-container">
        <Header />
        <div className="state-inside-container">
          {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
          {currentApiStatus === apiStatus.success && this.renderSuccessView()}
          <DailySpreadCharts />
        </div>
        <Footer />
      </div>
    )
  }
}

export default StateInformationItem

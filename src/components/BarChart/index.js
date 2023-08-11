import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {XAxis, YAxis, BarChart, Bar} from 'recharts'
import './index.css'

const DataFormatter = number => {
  if (number > 100000) {
    return `${(number / 100000).toString()}l`
  }
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class BarChartView extends Component {
  state = {barChartData: [], currentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getBarChartInfo()
  }

  getBarChartInfo = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const response = await fetch(url)
    const data = await response.json()
    const keyNames = Object.keys(data[stateCode].dates)

    const barChatData = keyNames.map(date => ({
      date,
      confirmed: data[stateCode].dates[date].total.confirmed
        ? data[stateCode].dates[date].total.confirmed
        : 0,
      deceased: data[stateCode].dates[date].total.deceased
        ? data[stateCode].dates[date].total.deceased
        : 0,
      recovered: data[stateCode].dates[date].total.recovered
        ? data[stateCode].dates[date].total.recovered
        : 0,
      tested: data[stateCode].dates[date].total.tested
        ? data[stateCode].dates[date].total.tested
        : 0,
      active:
        data.AP.dates[date].total.confirmed -
        (data.AP.dates[date].total.recovered +
          data.AP.dates[date].total.deceased)
          ? data.AP.dates[date].total.confirmed -
            (data.AP.dates[date].total.recovered +
              data.AP.dates[date].total.deceased)
          : 0,
    }))
    let updatedData
    if (barChatData.length > 10) {
      updatedData = barChatData.slice(
        barChatData.length - 10,
        barChatData.length,
      )
    } else {
      updatedData = barChatData
    }
    console.log(updatedData)
    this.setState({
      barChartData: updatedData,
      currentApiStatus: apiStatus.success,
    })
  }

  renderSuccessView = () => {
    const {barChartData} = this.state
    const {currentTab} = this.props
    return (
      <>
        {currentTab === 'Confirmed' && (
          <BarChart width={800} height={450} data={barChartData}>
            <XAxis
              dataKey="date"
              tick={{
                stroke: '#9A0E31',
                strokeWidth: 0.5,
              }}
            />
            <YAxis tickFormatter={DataFormatter} />
            <Bar
              dataKey="confirmed"
              fill="#9A0E31"
              className="bar"
              label={{
                position: 'top',
                fill: '#9A0E31',
                tickFormatter: {DataFormatter},
              }}
            />
          </BarChart>
        )}
        {currentTab === 'Active' && (
          <BarChart width={800} height={450} data={barChartData}>
            <XAxis
              dataKey="date"
              tick={{
                stroke: '#0A4FA0',
                strokeWidth: 0.5,
              }}
            />
            <YAxis tickFormatter={DataFormatter} />
            <Bar
              dataKey="active"
              fill="#0A4FA0"
              className="bar"
              label={{
                position: 'top',
                fill: '#0A4FA0',
              }}
            />
          </BarChart>
        )}
        {currentTab === 'Recovered' && (
          <BarChart width={800} height={450} data={barChartData}>
            <XAxis
              dataKey="date"
              tick={{
                stroke: '#216837',
                strokeWidth: 0.5,
              }}
            />
            <YAxis tickFormatter={DataFormatter} />
            <Bar
              dataKey="recovered"
              fill="#216837"
              className="bar"
              label={{
                position: 'top',
                fill: '#216837',
              }}
            />
          </BarChart>
        )}
        {currentTab === 'Deceased' && (
          <BarChart width={800} height={450} data={barChartData}>
            <XAxis
              dataKey="date"
              tick={{
                stroke: '#474C57',
                strokeWidth: 0.5,
              }}
            />
            <YAxis tickFormatter={DataFormatter} />
            <Bar
              dataKey="deceased"
              fill="#474C57"
              className="bar"
              label={{
                position: 'top',
                fill: '#474C57',
              }}
            />
          </BarChart>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiStatus} = this.state
    return (
      <div className="bar-chart-container">
        {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
        {currentApiStatus === apiStatus.success && this.renderSuccessView()}
      </div>
    )
  }
}

export default withRouter(BarChartView)

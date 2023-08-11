import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {LineChart, XAxis, YAxis, Tooltip, Line} from 'recharts'
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

class DailySpreadCharts extends Component {
  state = {spreadChatInfo: [], currentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getChartInfo()
  }

  getChartInfo = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const response = await fetch(url)
    const data = await response.json()
    const keyNames = Object.keys(data[stateCode].dates)

    const spreadChatData = keyNames.map(date => ({
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
    this.setState({
      spreadChatInfo: spreadChatData,
      currentApiStatus: apiStatus.success,
    })
  }

  renderConfirmedChat = () => {
    const {spreadChatInfo} = this.state
    return (
      <div className="confirmed-chart">
        <p className="confirm-chart-para">Confirmed</p>
        <div className="chart-container">
          <LineChart
            height={328}
            width={1146}
            data={spreadChatInfo}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis
              dataKey="date"
              tick={{
                stroke: '#FF073A',
                strokeWidth: 0.5,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: '#FF073A',
                strokeWidth: 0.5,
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="confirmed" stroke="#FF073A" />
          </LineChart>
        </div>
      </div>
    )
  }

  renderActiveChat = () => {
    const {spreadChatInfo} = this.state
    return (
      <div className="active-chart">
        <p className="active-chart-para">Total Active</p>
        <LineChart
          height={328}
          width={1146}
          data={spreadChatInfo}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{
              stroke: '#007BFF',
              strokeWidth: 0.5,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#007BFF',
              strokeWidth: 0.5,
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="active" stroke="#007BFF" />
        </LineChart>
      </div>
    )
  }

  renderRecoveredChat = () => {
    const {spreadChatInfo} = this.state
    return (
      <div className="recovered-chart">
        <p className="recovered-chart-para">Recovered</p>
        <LineChart
          height={328}
          width={1146}
          data={spreadChatInfo}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{
              stroke: '#27A243',
              strokeWidth: 0.5,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#27A243',
              strokeWidth: 0.5,
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="recovered" stroke="#27A243" />
        </LineChart>
      </div>
    )
  }

  renderDeceasedChat = () => {
    const {spreadChatInfo} = this.state
    return (
      <div className="deceased-chart">
        <p className="deceased-chart-para">Deceased</p>
        <LineChart
          height={328}
          width={1146}
          data={spreadChatInfo}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{
              stroke: '#6C757D',
              strokeWidth: 0.5,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6C757D',
              strokeWidth: 0.5,
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
        </LineChart>
      </div>
    )
  }

  renderTestedChat = () => {
    const {spreadChatInfo} = this.state
    return (
      <div className="tested-chart">
        <p className="tested-chart-para">Tested</p>
        <LineChart
          height={328}
          width={1146}
          data={spreadChatInfo}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{
              stroke: '#9673B9',
              strokeWidth: 0.5,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#9673B9',
              strokeWidth: 0.5,
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="tested" stroke="#9673B9" />
        </LineChart>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="timelinesDataLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiStatus} = this.state
    return (
      <div className="spread-chat-container" data-testid="lineChartsContainer">
        <h1 className="spread-chart-heading">Daily Spread Trends</h1>
        {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
        {currentApiStatus === apiStatus.success && this.renderConfirmedChat()}
        {currentApiStatus === apiStatus.success && this.renderActiveChat()}
        {currentApiStatus === apiStatus.success && this.renderRecoveredChat()}
        {currentApiStatus === apiStatus.success && this.renderDeceasedChat()}
        {currentApiStatus === apiStatus.success && this.renderTestedChat()}
      </div>
    )
  }
}

export default withRouter(DailySpreadCharts)

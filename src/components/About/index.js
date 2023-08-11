import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class About extends Component {
  state = {currentApiStatus: apiStatus.initial, faqList: []}

  componentDidMount() {
    this.getFaqList()
  }

  getFaqList = async () => {
    this.setState({currentApiStatus: apiStatus.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    if (response.ok === true) {
      const data = await response.json()
      const updatedFaqs = data.faq.map(eachFaq => ({
        answer: eachFaq.answer,
        category: eachFaq.category,
        qno: eachFaq.qno,
        question: eachFaq.question,
      }))
      this.setState({faqList: updatedFaqs, currentApiStatus: apiStatus.success})
    }
  }

  renderSuccessView = () => {
    const {faqList} = this.state
    return (
      <ul className="faq-unordered-list" data-testid="faqsUnorderedList">
        {faqList.map(eachFaq => (
          <FaqItem details={eachFaq} key={eachFaq.question} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="about-loader" data-testid="aboutRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiStatus} = this.state
    return (
      <div className="about-container">
        <Header />
        <div className="about-items-container">
          <h1 className="about-heading">About</h1>
          <p className="about-para">Last update on march 28th 2021.</p>
          <p className="ready-para">
            COVID-19 vaccines be ready for distribution
          </p>
          {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
          {currentApiStatus === apiStatus.success && this.renderSuccessView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About

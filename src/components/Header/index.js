import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {menuClicked: false, currentTab: true}

  onMenuClick = () => {
    this.setState({menuClicked: true})
  }

  onCloseButtonClick = () => {
    this.setState({menuClicked: false})
  }

  onAboutButtonClick = () => {
    this.setState({currentTab: false})
  }

  onHomeButtonClick = () => {
    this.setState({currentTab: true})
  }

  render() {
    const {menuClicked, currentTab} = this.state
    console.log(currentTab)
    return (
      <>
        <nav className="nav-container">
          <div className="large-view-container">
            <Link to="/" className="link-item">
              <h1 className="large-heading">
                COVID19<span className="large-span">INDIA</span>
              </h1>
            </Link>
            <ul className="large-list-container">
              <Link
                to="/"
                className="link-item"
                onClick={this.onHomeButtonClick}
              >
                <li className={currentTab ? 'list-item' : 'home-item'}>Home</li>
              </Link>
              <Link
                to="/about"
                className="link-item"
                onClick={this.onAboutButtonClick}
              >
                <li className={currentTab ? 'home-item' : 'list-item'}>
                  About
                </li>
              </Link>
            </ul>
          </div>
          <div className="mobile-view-container">
            <Link to="/" className="link-item">
              <h1 className="large-heading">
                COVID19<span className="large-span">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="menu-button"
              onClick={this.onMenuClick}
            >
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691556454/add-to-queue_1menu_jvkqmm.png"
                alt="menu icon"
                className="menu-icon"
              />
            </button>
          </div>
        </nav>
        {menuClicked && (
          <div className="links-container">
            <ul className="large-list-container">
              <Link to="/" className="link-item">
                <li
                  className={currentTab ? 'list-item' : 'home-item'}
                  onClick={this.onHomeButtonClick}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="link-item">
                <li
                  className={currentTab ? 'home-item' : 'list-item'}
                  onClick={this.onAboutButtonClick}
                >
                  About
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="menu-button"
              onClick={this.onCloseButtonClick}
            >
              <img
                src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691557349/Solidcloseicon_jyszzk.png"
                alt="close icon"
                className="close-icon"
              />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default Header

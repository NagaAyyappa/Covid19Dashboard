import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="large-heading">
      COVID19<span className="large-span">INDIA</span>
    </h1>
    <p className="footer-para">
      we stand with everyone fighting on the front lines
    </p>
    <div className="icons-container">
      <VscGithubAlt className="github-icon" />
      <FiInstagram className="github-icon" />
      <FaTwitter className="github-icon" />
    </div>
  </div>
)

export default Footer

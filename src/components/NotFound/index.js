import './index.css'

const NotFound = props => {
  const {history} = props
  const onNotFoundPageButtonClick = () => {
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dhw8hzve2/image/upload/v1691580554/Group_7484notfound_i6u75g.png"
        alt="not-found-pic"
        className="notfound-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <button
        type="button"
        className="not-found-button"
        onClick={onNotFoundPageButtonClick}
      >
        Home
      </button>
    </div>
  )
}

export default NotFound

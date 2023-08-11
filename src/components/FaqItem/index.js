import './index.css'

const FaqItem = props => {
  const {details} = props
  const {question, answer} = details
  return (
    <li className="faq-list-item">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

export default FaqItem

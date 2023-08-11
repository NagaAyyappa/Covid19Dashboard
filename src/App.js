import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateInformationItem from './components/StateInformationItem'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateInformationItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

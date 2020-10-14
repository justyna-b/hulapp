import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Start from './pages/Start'
import LoggingForm from './pages/LoggingForm'
import Registration from './components/Stepper'
import ResetPwd from './pages/ResetPwd'
import UsersPostsAll from './pages/post/UsersPostsAll'
import UsersTracks from './pages/user/UsersTracks'
import Activate from './pages/registration/Activate'

class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Start} />
            <Route path='/home' component={Start} />
            <Route path='/signin' component={LoggingForm} />
            <Route path='/registration' component={Registration} />
            <Route path='/reset-pwd' component={ResetPwd} />
            <Route path='/users-home' component={UsersPostsAll} />
            <Route path='/users-tracks' component={UsersTracks} />
            <Route path='/activate' component={Activate} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

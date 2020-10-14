import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Start from './pages/Start'
import LoggingForm from './pages/LoggingForm'
import Registration from './components/Stepper'
import ResetPwd from './pages/ResetPwd'
import UsersPostsAll from './pages/post/UsersPostsAll'
import UsersTracks from './pages/user/UsersTracks'

class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Start} />
            <Route path='hulapp-web.web.app/home' component={Start} />
            <Route path='hulapp-web.web.app/signin' component={LoggingForm} />
            <Route path='hulapp-web.web.app/registration' component={Registration} />
            <Route path='hulapp-web.web.app/reset-pwd' component={ResetPwd} />
            <Route path='hulapp-web.web.app/users-home' component={UsersPostsAll} />
            <Route path='hulapp-web.web.app/users-tracks' component={UsersTracks} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import Translations from 'containers/Translations/Translations'
import Login from 'containers/Login/Login'
import Header from 'components/Header/Header'

class Main extends PureComponent {
  
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={Translations} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    )
  }
  
}

export default Main
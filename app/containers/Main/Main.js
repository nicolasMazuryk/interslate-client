import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import Translations from 'containers/Translations/Translations'
import Header from 'components/Header/Header'

class Main extends PureComponent {
  
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={Translations} />
        </Switch>
      </main>
    )
  }
  
}

export default Main
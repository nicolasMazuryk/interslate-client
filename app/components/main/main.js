import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Translations from 'components/translations/translations'
import {loadApplicationRequest, selectLanguage} from './actions'
import Header from 'components/header/header'
import ActionBar from 'components/actionBar/actionBar'
import Loader from 'components/loader/loader'

const mapState = (state) => {
  return {
    loaded: state.main.loaded,
    languages: state.main.languages,
    selectedLanguage: state.main.selectedLanguage
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadApplication: () => dispatch(loadApplicationRequest()),
    selectLanguage: (key) => dispatch(selectLanguage(key))
  }
}

@connect(mapState, mapDispatch)
class Main extends PureComponent {
  
  componentDidMount() {
    this.props.loadApplication()
  }
  
  render() {
    const {
      loaded,
      languages,
      selectLanguage,
      selectedLanguage
    } = this.props

    return !loaded ? <Loader /> :
      (
        <main>
          <Header />
          <ActionBar
            languages={languages}
            onLanguageChange={selectLanguage}
            selectedLanguage={selectedLanguage}
          />
          <Switch>
            <Route exact path="/" component={Translations} />
          </Switch>
        </main>
      )
  }
  
}

Main.propTypes = {
  loaded: PropTypes.bool,
  languages: PropTypes.array,
  selectedLanguage: PropTypes.string,
  selectLanguage: PropTypes.func,
  loadApplication: PropTypes.func
}

export default Main
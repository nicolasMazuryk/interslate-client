import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AsideMenu from 'common/AsideMenu/AsideMenu'
import {Route} from 'react-router-dom'
import Profile from './Profile/Profile'
import APIKey from './APIKey/APIKey'

const mapState = () => {
  return {}
}

const mapDispatch = () => {
  return {}
}

export class Account extends PureComponent {

  constructor(props) {
    super(props)

    this.getMenuItems = this.getMenuItems.bind(this)
    this.getActiveLink = this.getActiveLink.bind(this)
  }
  
  componentWillMount() {
    const {history, location} = this.props
    if (location.pathname === '/account') {
      history.push('/account/api-key')
    }
  }
  
  getActiveLink() {
    return this.props.location.pathname
  }

  getMenuItems() {
    return [
      {
        header: 'General',
        subItems: [
          {title: 'API Key', url: '/account/api-key'},
          {title: 'Profile', url: '/account/profile'}
        ]
      }
    ]
  }

  render() {
    const {
      user,
      generateUploadToken,
      uploadTokenIsGenerating
    } = this.props

    return (
      <div>
        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-one-quarter">
                <AsideMenu
                  activeLink={this.getActiveLink()}
                  items={this.getMenuItems()}
                />
              </div>
              <div className="column is-three-quarters">
                <Route path="/account/api-key" render={() => (
                  <APIKey
                    uploadTokenIsGenerating={uploadTokenIsGenerating}
                    generateUploadToken={generateUploadToken}
                    uploadToken={user.uploadToken}
                  />
                )} />
                <Route path="/account/profile" component={Profile} />
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

Account.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  generateUploadToken: PropTypes.func,
  uploadTokenIsGenerating: PropTypes.bool
}

export default connect(mapState, mapDispatch)(Account)

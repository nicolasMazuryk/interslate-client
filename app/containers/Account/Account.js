import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import AsideMenu from 'common/AsideMenu/AsideMenu'

const mapState = () => {
  return {}
}

const mapDispatch = () => {
  return {}
}

export class Account extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      active: 'api-key'
    }
    this.menuItemClick = this.menuItemClick.bind(this)
    this.getMenuItems = this.getMenuItems.bind(this)
  }

  menuItemClick(id) {
    this.setState({
      active: id
    })
  }

  getMenuItems() {
    return [
      {
        header: 'General',
        subItems: [
          {
            title: 'API Key', onClick: () => this.menuItemClick('api-key')},
          {title: 'Settings', onClick: () => this.menuItemClick('settings')}
        ]
      }
    ]
  }

  render() {
    return (
      <div>
        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-one-quarter">
                <AsideMenu
                  activeItem={this.state.active}
                  items={this.getMenuItems()}
                />
              </div>
              <div className="column is-three-quarters">
                Not implemented
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Account)

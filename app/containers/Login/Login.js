import React, {PureComponent} from 'react'
import Input from 'common/Input/Input'

export class Login extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const {
      email,
      password
    } = this.state
    return (
      <div className="container">
        <div className="box">
          <div className="form">
            <Input
              label="Email"
              name="email"
              type="email"
              focus={true}
              value={email}
              onChange={() => {}}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={() => {}}
            />
            <div className="field">
              <div className="control">
                <button name="enter" className="button is-primary">
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
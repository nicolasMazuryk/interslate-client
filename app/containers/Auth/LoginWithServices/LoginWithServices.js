import React from 'react'

const style = {
  backgroundColor: '#ea4335',
  width: '100%'
}

const LoginWthServices = () => {
  return (
    <div className="level">
      <div className="level-item">
        <a
          style={style}
          className="button is-danger"
          href="http://127.0.0.1:9090/auth/google"
        >
          Enter with Google
        </a>
      </div>
    </div>
  )
}

export default LoginWthServices

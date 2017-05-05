import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from 'core/store'
import Main from 'components/main/main'

render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.querySelector('#root')
)

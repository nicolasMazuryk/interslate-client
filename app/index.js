import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from 'core/store'
import Main from 'containers/Main/Main'
import {BrowserRouter} from 'react-router-dom'

import 'sass/index.sass'

render(
  <Provider store={store}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)

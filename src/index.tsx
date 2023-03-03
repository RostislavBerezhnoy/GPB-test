import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'store'
import App from './App'
import 'antd/dist/reset.css'
import 'dayjs/locale/ru' // eslint-disable-line import/no-extraneous-dependencies
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position='bottom-right' />
      <App />
    </Provider>
  </React.StrictMode>,
)

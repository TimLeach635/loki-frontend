import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Loki from './components/Loki'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Loki />, document.getElementById('root'))

serviceWorker.unregister()

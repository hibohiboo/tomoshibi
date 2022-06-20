import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client'
import reportWebVitals from '@/reportWebVitals'
import App from '@/router/RoutesApp'
import { store } from '@/store'

const elementId = 'react-root'
const container = document.getElementById(elementId)

if (!container) throw Error(`${elementId} の id を持つ要素がHTMLにありません`)
const root = ReactDOMClient.createRoot(container)
const render = () => {
  root.render(
    <Router>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Router>,
  )
}

const isDevevelopServe = import.meta.env.MODE === 'development' // import.meta.env.DEV

// 開発環境ではログに。本番環境ではグーグル アナリティクスに出力。
const reportTo = console.log // isDevevelopServe ? console.log : sendToGoogleAnalytics

reportWebVitals(reportTo)
if (import.meta.env.DEV) {
  ;(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = await import('./domain/http/mocks/browser')
    worker.start()
    render()
  })()
} else {
  render()
}

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Provider } from "./context"
import * as actions from "./context/actions"

ReactDOM.render(
  <Provider {...actions}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()

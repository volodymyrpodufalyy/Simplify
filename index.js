import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"

function SimplifyApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("Simplify", () => SimplifyApp)
export default App

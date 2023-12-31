import React from 'react'

import { MuiThemeProvider, StylesProvider, createMuiTheme, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'
import rtl from 'jss-rtl'
// import i18n from "../../i18n/i18n";
import i18n from 'src/i18n/_i18n'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

function withRoot(Component) {
  function WithRoot(props) {
    // JssProvider allows customizing the JSS styling solution.
    return (
      <StylesProvider jss={jss}>
        <MuiThemeProvider
          theme={createMuiTheme({
            direction: i18n.dir()
          })}
        >
          <Component {...props} />
        </MuiThemeProvider>
      </StylesProvider>
    )
  }

  return WithRoot
}

export default withRoot

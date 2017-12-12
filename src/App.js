import React from 'react'
import Redux from './redux'
import MST from './mst'
import TylerMST from './mst/tyler'

export default () => (
  <div style={getStyles()}>
    <div style={getStyles()}>
      <Redux />
    </div>
    <div style={getStyles(!0)}>
      <MST />
    </div>
    <div style={getStyles(undefined, !0)}>
      <TylerMST />
    </div>
  </div>
)

const getStyles = (isBlack, isBlue) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...isBlack && {
    backgroundColor: '#000',
    color: '#fff'
  },
  ...isBlue && {
    backgroundColor: '#00f',
    color: '#fff'
  }
})

import React from 'react'
import Redux from './redux'
import MST from './mst'

export default () => (
  <div style={getStyles()}>
    <div style={getStyles()}>
      <Redux/>
    </div>
    <div style={getStyles(!0)}>
      <MST/>
    </div>
  </div>
)

const getStyles = (isBlack) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...isBlack && {
    backgroundColor: '#000',
    color: '#fff'
  }
})
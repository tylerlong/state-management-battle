import React, { Component, PureComponent } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { createSelector } from 'reselect'

const testArrayLength = 2 ** 15

const reducer = (state = {
  list: Array(testArrayLength).fill(0).map(_ => ({done: false})),
  count: 0,
}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        list: [...state.list, {done: false}]
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        list: [...state.list, {done: false}]
      }
    default:
      return state
  }
}

const Counter = connect(
  (state) => ({list: state.list}),
  (dispatch) => ({
    decrement: () => dispatch({type: 'DECREMENT'}),
    increment: () => dispatch({type: 'INCREMENT'}),
  })
)(
  props =>
    <div>
      <button onClick={() => props.decrement()}>-</button>
      {props.list.length}
      <button onClick={() => props.increment()}>+</button>
    </div>
)

const getList = createSelector(
  ...Array(testArrayLength).fill(0).map((_, key) => state => state.list[key]),
  (...list) => list
)

const List = connect(
  (state) => ({store: getList(state)})
)(
  class extends Component {
    render () {
      console.log('Redux render:', this.props.store.length, this.props)
      return (
        <div style={{position: 'absolute', top: 99999}}>
          {this.props.store.map((_, key) => <p key={key}>{key}</p>)}
        </div>
      )
    }
  }
)

const store = createStore(reducer)

const App = () => (
  <div>
    <Counter/>
    <List/>
  </div>
)

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

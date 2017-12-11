import React, { Component, PureComponent } from 'react'
import { types } from 'mobx-state-tree'
import { observer, inject, Provider } from 'mobx-react'

const testArrayLength = 2 ** 15

const list = types.model('list', {
  done: false
}).actions(self => ({
  toggle () {
    self.done = !self.done
  }
}))

const counter = types.model({
  count: types.optional(types.number, 0),
  list: types.optional(types.array(list), Array(testArrayLength).fill(0).map(_ => ({done: false})))
}).actions(self => ({
  increment () {
    self.count++
    self.list.push({done: false})
  },
  decrement () {
    self.count--
    self.list.push({done: false})
  }
}))

const store = counter.create()

const Counter = inject('store')(
  observer(
    props =>
      <div>
        <button onClick={() => props.store.decrement()}>-</button>
        {props.store.list.length}
        <button onClick={() => props.store.increment()}>+</button>
      </div>
  )
)

const List = inject(
  store => ({
    store: store.store.list.filter((_, index) => index < testArrayLength),
  })
)(
  observer(
    class extends Component {
      componentWillReceiveProps (nextProps) {
        this.time = performance.now()
      }

      componentDidUpdate () {
        console.log('MST render Time:',performance.now() - this.time)
      }

      render () {
        console.log('MST render:', this.props.store.length, this.props)
        return (
          <div style={{position: 'absolute', top: 99999}}>
            {this.props.store.map((_, key) => <p key={key}>{key}</p>)}
          </div>
        )
      }
    }
  )
)

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
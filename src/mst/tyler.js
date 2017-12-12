import { types } from 'mobx-state-tree'
import React from 'react'
import { observer } from 'mobx-react'

const Todo = types.model({
  title: types.string,
  completed: false
}).actions(self => ({
  updateTitle (title) {
    self.title = title
  },
  toggle () {
    self.completed = !self.completed
  }
}))

const TodoStore = types.model({
  todos: types.array(Todo)
}).views(self => ({
  get count () {
    return self.todos.length
  }
})).actions(self => ({
  increase () {
    self.todos.push({ title: 'new todo item' })
  },
  decrease () {
    self.todos.pop()
  }
}))

const todoStore = TodoStore.create({ todos: [] })

class MyTodo extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => todoStore.decrease()}>-</button>
        {todoStore.count}
        <button onClick={() => todoStore.increase()}>+</button>
      </div>
    )
  }
}

export default observer(MyTodo)

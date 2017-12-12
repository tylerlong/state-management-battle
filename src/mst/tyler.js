import { types } from 'mobx-state-tree'
import React from 'react'
import { observer } from 'mobx-react'

const testArrayLength = 2 ** 15
const sampleTodos = [...Array(testArrayLength).keys()].map(i => ({ title: `todo item ${i}` }))

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
  },
  page (index) { // pagination, page size is 100
    return self.todos.slice(index * 100, index * 100 + 100)
  }
})).actions(self => ({
  increase () {
    self.todos.push({ title: 'new todo item' })
  },
  decrease () {
    self.todos.pop()
  }
}))

const todoStore = TodoStore.create({ todos: sampleTodos })

class TodoItem extends React.Component {
  render () {
    console.log('render TodoItem')
    const todo = this.props.todo
    return <p>{todo.title}</p>
  }
}
const ObserverTodoItem = observer(TodoItem)

class MyTodos extends React.Component {
  render () {
    console.log('render MyTodos')
    return (
      <div>
        <button onClick={() => todoStore.decrease()}>-</button>
        {todoStore.count}
        <button onClick={() => todoStore.increase()}>+</button>
        <div style={{position: 'absolute', top: 99999}}>
          {todoStore.page(0).map((todo, index) => <ObserverTodoItem key={index} todo={todo} />)}
        </div>
      </div>
    )
  }
}

export default observer(MyTodos)

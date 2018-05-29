import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import App from "./App"
import { injectContext } from "./context"
import { taskList, uid } from "../test/mockStore"

const actions = {
  onOpenModal: action("onOpenModal"),
}

const fullMontyActions = {
  onCreateTask: function(newTask) {
    this.setState({
      addModalOpen: false,
      tasks: [...this.state.tasks, { ...newTask, _id: uid() }],
    })
  },
  onDeleteTask: function(_id) {
    this.setState({ tasks: this.state.tasks.filter(elem => elem._id !== _id) })
  },
  onUpdateTask: function(updatedTask) {
    const tasks = this.state.tasks.filter(elem => elem._id !== updatedTask._id)
    this.setState({ editModalOpen: false, tasks: [...tasks, updatedTask] })
  },
}

const tasks = injectContext({ tasks: taskList }, { ...actions })(App)
const noTasks = injectContext({}, { ...actions })(App)
const fullMonty = injectContext({ tasks: taskList }, { ...fullMontyActions })(
  App,
)

storiesOf("App", module)
  .add("with tasks", () => tasks)
  .add("without tasks", () => noTasks)
  .add("the full monty", () => fullMonty)

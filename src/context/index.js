import React, { Component } from "react"

export const AppContext = React.createContext()

const forgotInject = "Did you forget to inject this function?"

export const orderTasksDefault = (tasks = []) => {
  const completed = tasks
    .filter(elem => elem.completed)
    .sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))
  const incomplete = tasks
    .filter(elem => !elem.completed)
    .sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))

  return {
    completeTasks: completed,
    incompleteTasks: incomplete,
  }
}

/**
 * @class Provider
 *
 * Provider is this application's data provider. It exposes state and methods
 * required to create, update, delete, and sort todos
 *
 */
export class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: props.tasks || this.defaultContext.tasks,
      addModalOpen: props.addModalOpen || this.defaultContext.addModalOpen,
      editModalOpen: props.editModalOpen || this.defaultContext.editModalOpen,
      taskToEdit: props.taskToEdit || this.defaultContext.taskToEdit,
      taskFocus: props.taskFocus || this.defaultContext.taskFocus,
    }
    this.onAddTask = props.onAddTask || this.defaultContext.onAddTask
    this.onFetchTasks = props.onFetchTasks || this.defaultContext.onFetchTasks
    this.onUpdateTask = props.onUpdateTask || this.defaultContext.onUpdateTask
    this.onDeleteTask = props.onDeleteTask || this.defaultContext.onDeleteTask
    this.onCreateTask = props.onCreateTask || this.defaultContext.onCreateTask
    this.onOpenModal = props.onOpenModal || this.defaultContext.onOpenModal
    this.onCloseModal = props.onCloseModal || this.defaultContext.onCloseModal
    this.onChooseTaskFocus =
      props.onChooseTaskFocus || this.defaultContext.onChooseTaskFocus
  }
  defaultContext = {
    tasks: [],
    taskToEdit: {},
    taskFocus: "all",
    viewableTasks: [],
    completeTasks: [],
    incompleteTasks: [],
    addModalOpen: false,
    editModalOpen: false,
    onAddTask: () => console.error("onAddTask", forgotInject),
    onFetchTasks: () => console.error("onFetchTasks", forgotInject),
    onUpdateTask: () => console.error("onUpdateTask", forgotInject),
    onDeleteTask: () => console.error("onDeleteTask", forgotInject),
    onCreateTask: () => this.setState({ openModal: false }),
    onOpenModal: (which, taskToEdit = {}) => {
      this.setState({ [`${which}ModalOpen`]: true, taskToEdit })
    },
    onCloseModal: which => {
      this.setState({ [`${which}ModalOpen`]: false })
    },
    onChooseTaskFocus: which => {
      this.setState({ taskFocus: which })
    },
  }

  render() {
    let { completeTasks, incompleteTasks } = orderTasksDefault(this.state.tasks)
    switch (this.state.taskFocus) {
      case "completed":
        incompleteTasks = []
        break
      case "overdue":
        completeTasks = []
        incompleteTasks = incompleteTasks.filter(task => {
          const now = Date.now()
          return Date.parse(task.dueDate) < Date.now()
        })
        break
      case "dueSoon":
        completeTasks = []
        incompleteTasks = incompleteTasks.filter(task => {
          const today = new Date().toISOString().slice(0, 10)
          const tomorrow = new Date(Date.now() + 1 * 1000 * 24 * 60 * 60)
            .toISOString()
            .slice(0, 10)
          const due = new Date(task.dueDate).toISOString().slice(0, 10)
          return due === today || due === tomorrow
        })
    }
    return (
      <AppContext.Provider
        value={{
          tasks: this.state.tasks,
          taskToEdit: this.state.taskToEdit,
          completeTasks,
          incompleteTasks,
          addModalOpen: this.state.addModalOpen,
          editModalOpen: this.state.editModalOpen,
          onAddTask: this.onAddTask.bind(this),
          onFetchTasks: this.onFetchTasks.bind(this),
          onUpdateTask: this.onUpdateTask.bind(this),
          onDeleteTask: this.onDeleteTask.bind(this),
          onCreateTask: this.onCreateTask.bind(this),
          onOpenModal: this.onOpenModal.bind(this),
          onCloseModal: this.onCloseModal.bind(this),
          onChooseTaskFocus: this.onChooseTaskFocus.bind(this),
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

/**
 * A higher order function that allows injecting context
 *
 * The returned function accepts a React Component and props to render
 * the component with. Component will receive the context and actions it
 * subscribes to through its own `mapContextToProps`
 *
 * @param {Object} context The context to inject
 * @param {Object} actions The actions to inject
 * @returns Function that accepts
 *
 */
export const injectContext = (context, actions) => (Component, props) => (
  <Provider {...context} {...actions}>
    <Component {...props} />
  </Provider>
)

/**
 * A higher order function used to wrap a Component with a React.Context.Consumer
 * and bind those values the component is interested in as props to that component
 *
 * The returned function should be immediately called with the Component you wish
 * to render. Following is example usage that would pass this Applicaton's Context
 * `foo` value to the the Component's props
 *
 * ```
 * const mapContextToProps = ({foo}) => ({foo})
 * export default getContext(mapContextToProps)(MySuperAwesomeComponent)
 * ```
 *
 * @param {Function} mapContextToProps A function to map this Context's values
 * to props
 * @returns {Function} A function that accepts a Component to wrap
 */
export default function getContext(mapContextToProps) {
  return Component =>
    class GetContext extends Component {
      render() {
        return (
          <AppContext.Consumer>
            {context => (
              <Component {...this.props} {...mapContextToProps(context)} />
            )}
          </AppContext.Consumer>
        )
      }
    }
}

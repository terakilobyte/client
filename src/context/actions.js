import fetch from "./request"
const server = process.env.SERVER_URL || "localhost:8000"

export async function onCreateTask(todo) {
  try {
    const response = await fetch(`http://${server}/api/todos`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    this.setState({
      addModalOpen: false,
      tasks: [...this.state.tasks, { ...response.todo }],
    })
  } catch (e) {
    this.setState({
      error: "couldn't create task",
    })
  }
}
export async function onUpdateTask(todo) {
  try {
    const response = await fetch(`http://${server}/api/todos/${todo._id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
    if (response.status === "success") {
      const tasks = this.state.tasks.filter(elem => elem._id !== todo._id)
      this.setState({ editModalOpen: false, tasks: [...tasks, todo] })
    } else {
      this.setState({ editModalOpen: false, error: "failed to update task" })
    }
  } catch (e) {
    this.setState({ editModalOpen: false, error: e.message })
  }
}
export async function onDeleteTask(_id) {
  const response = await fetch(`http://${server}/api/todos/${_id}`, {
    method: "DELETE",
    mode: "cors",
  })
  if (response.status === "success") {
    this.setState({ tasks: this.state.tasks.filter(elem => elem._id !== _id) })
  } else {
    this.setState({ error: "no task to delete" })
  }
}

export async function onFetchTasks() {
  let response = await fetch(`http://${server}/api/todos`, {
    mode: "cors",
  })
  this.setState({ tasks: response.todos })
}

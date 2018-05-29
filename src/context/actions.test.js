import * as actions from "./actions"
import { taskList } from "../../test/mockStore"

describe("Actions", () => {
  const testTask = {
    name: "A test",
    description: "hope it passes",
    dueDate: new Date(),
    completed: false,
  }
  let spy = jest.fn()
  const state = {
    setState: spy,
    state: {
      tasks: taskList,
    },
  }

  beforeEach(() => {
    spy.mockReset()
  })

  test("onFetchTasks should fetch todos from the server", async () => {
    await actions.onFetchTasks.call(state)
    expect(Array.isArray(spy.mock.calls[0][0]["tasks"])).toBe(true)
  })
  test("onCreateTask should succeed and add task to state", async () => {
    await actions.onCreateTask.call(state, testTask)
    const res = spy.mock.calls[0][0]
    expect(res).toHaveProperty("addModalOpen", false)
    expect(res).toHaveProperty("tasks")
    // our function inserts the new task last in the state
    testTask._id = res.tasks[res.tasks.length - 1]._id
    expect(res.tasks[res.tasks.length - 1]).toHaveProperty(
      "name",
      testTask.name,
    )
  })
  test("onUpdateTask should insert the updated task at the end of the task array", async () => {
    const modified = { ...{ ...testTask }, completed: true }
    await actions.onUpdateTask.call(state, modified)
    expect(spy).toHaveBeenCalledWith({
      editModalOpen: false,
      tasks: [...taskList, modified],
    })
  })
  test("onDeleteTask should delete a task", async () => {
    await actions.onDeleteTask.call(state, testTask._id)
    expect(spy).toHaveBeenCalledWith({ tasks: taskList })
  })
})

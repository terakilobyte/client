import React from "react"
import { getClasses, createMount } from "@material-ui/core/test-utils"
import { task, overdueTask } from "../../test/mockStore"
import renderer from "react-test-renderer"
import Task from "./Task"
import TaskFocus from "./TaskFocus"
import Button from "@material-ui/core/Button"

import { injectContext } from "../context"

describe("<Task />", () => {
  let onUpdateTask
  let onDeleteTask
  let onOpenModal
  let mount
  let future

  beforeAll(() => {
    onUpdateTask = jest.fn()
    onDeleteTask = jest.fn()
    onOpenModal = jest.fn()
    mount = createMount()

    const classes = getClasses(<Task />)
    future = injectContext(
      {},
      { ...{ onUpdateTask, onDeleteTask, onOpenModal } },
    )(Task, { ...task })
  })

  afterEach(() => {
    onUpdateTask.mockReset()
    onDeleteTask.mockReset()
    onOpenModal.mockReset()
  })

  it("should render the TaskFocus Component", () => {
    const wrapper = mount(future)
    expect(wrapper.containsMatchingElement(<TaskFocus />)).toEqual(true)
  })

  it("should warn if required props aren't passed and catch child error", () => {
    const spy = jest.spyOn(global.console, "error").mockImplementation(() => {})
    let expected
    mount(
      injectContext({}, { ...{ onUpdateTask, onDeleteTask, onOpenModal } })(
        Task,
      ),
    )
    expect(spy.mock.calls.length).toBe(5)
  })
  it("should call function spies with expect values when buttons are clicked", () => {
    const wrapper = mount(future)
    const buttons = wrapper.find(Button)
    expect(buttons.length).toBe(3)
    buttons.forEach(button => {
      button.simulate("click")
    })
    expect(onUpdateTask).toHaveBeenCalledWith({
      _id: task._id,
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      completed: !task.completed,
    })
    expect(onDeleteTask).toHaveBeenCalledWith(task._id)
    expect(onOpenModal).toHaveBeenCalledWith("edit", {
      _id: task._id,
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed,
    })
  })

  it("test", () => {
    const wrapper = mount(
      injectContext({}, { ...{ onUpdateTask, onDeleteTask, onOpenModal } })(
        Task,
        { ...task },
      ),
    )
    expect(wrapper.containsMatchingElement(<TaskFocus />)).toEqual(true)
  })
})

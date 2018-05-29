import React from "react"
import { createMount, getClasses } from "@material-ui/core/test-utils"
import { task, overdueTask } from "../../test/mockStore"
import renderer from "react-test-renderer"
import TaskFocus from "./TaskFocus"
import CheckCircle from "@material-ui/icons/CheckCircle"
import AccessTime from "@material-ui/icons/AccessTime"

describe("TaskFocus", () => {
  let future
  let overdue
  let completed
  let near
  let mount

  beforeAll(() => {
    const classes = getClasses(<TaskFocus />)
    mount = createMount()
    future = (
      <TaskFocus
        name={task.name}
        dueDate={task.dueDate}
        completed={task.completed}
        classes={classes}
      />
    )
    near = (
      <TaskFocus
        name={task.name}
        dueDate={new Date(Date.now() + 1 * 1000 * 60 * 60 * 24)}
        completed={task.completed}
        classes={classes}
      />
    )
    overdue = (
      <TaskFocus
        name={overdueTask.name}
        dueDate={overdueTask.dueDate}
        completed={overdueTask.completed}
        clases={classes}
      />
    )
    completed = (
      <TaskFocus
        name={task.name}
        dueDate={task.dueDate}
        completed={true}
        classes={classes}
      />
    )
  })

  it("should render a yellow <AccessTime /> for future incomplete tasks", () => {
    const wrapper = mount(future)
    expect(wrapper.containsMatchingElement(<AccessTime />)).toEqual(true)
    expect(wrapper.find(AccessTime).prop("style")).toEqual({ color: "yellow" })
  })

  it("should render a red <AccessTime /> for past incomplete projects", () => {
    const wrapper = mount(overdue)
    expect(wrapper.containsMatchingElement(<AccessTime />)).toEqual(true)
    expect(wrapper.find(AccessTime).prop("style")).toEqual({ color: "red" })
  })

  it("should render a orange <AccessTime /> for tasks due soon", () => {
    const wrapper = mount(near)
    expect(wrapper.containsMatchingElement(<AccessTime />)).toEqual(true)
    expect(wrapper.find(AccessTime).prop("style")).toEqual({ color: "orange" })
  })

  it("should render a green <CheckCircle /> for complete tasks", () => {
    const wrapper = mount(completed)
    expect(wrapper.containsMatchingElement(<CheckCircle />)).toEqual(true)
    expect(wrapper.find(CheckCircle).prop("style")).toEqual({ color: "green" })
  })

  it("should render crossed-out and lighter text for complete tasks", () => {
    const wrapper = mount(completed)
    expect(wrapper.find(".name-div").prop("style")).toEqual({
      textDecoration: "line-through",
      fontWeight: "lighter",
    })
  })
})

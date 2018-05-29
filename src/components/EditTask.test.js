import React from "react"
import { getClasses, createMount } from "@material-ui/core/test-utils"
import { task } from "../../test/mockStore"
import Default, { EditTask } from "./EditTask"

describe("<EditTask />", () => {
  let onUpdateTask
  let editTask
  let mount

  beforeAll(() => {
    onUpdateTask = jest.fn()
    mount = createMount()

    const classes = getClasses(<Default />)
    editTask = mount(
      <EditTask
        classes={classes}
        onUpdateTask={onUpdateTask}
        taskToEdit={{ ...task }}
      />,
    )
  })

  afterEach(() => {
    onUpdateTask.mockReset()
  })

  it("should render with proper state", () => {
    expect(editTask.state("name")).toEqual(task.name)
    expect(editTask.state("description")).toEqual(task.description)
    expect(editTask.state("dueDate")).toEqual(
      task.dueDate.toISOString().slice(0, -8),
    )
  })

  it("should not call onUpdateTask if date is invalid", async () => {
    await editTask
      .instance()
      .handleChange({ target: { id: "dueDate", value: "??" } })
    editTask.update()
    editTask
      .find("#submit")
      .first()
      .simulate("click")
    editTask.update()
    expect(onUpdateTask).not.toHaveBeenCalled()
  })

  it("should not call onUpdateTask if name is empty", async () => {
    await editTask
      .instance()
      .handleChange({ target: { id: "name", value: "" } })
    editTask.update()
    editTask
      .find("#submit")
      .first()
      .simulate("click")
    editTask.update()
    expect(onUpdateTask).not.toHaveBeenCalled()
  })

  it("should call onUpdateTask when required inputs are valid", async () => {
    await editTask
      .instance()
      .handleChange({ target: { id: "name", value: "test" } })
    editTask.update()
    await editTask
      .instance()
      .handleChange({ target: { id: "dueDate", value: "2020-05-05" } })
    editTask.update()
    editTask
      .find("#submit")
      .first()
      .simulate("click")
    expect(onUpdateTask).toHaveBeenCalledWith({
      _id: task._id,
      name: "test",
      description: task.description,
      dueDate: new Date("2020-05-05"),
      completed: false,
    })
  })
})

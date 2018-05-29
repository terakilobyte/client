import React from "react"
import { getClasses, createMount } from "@material-ui/core/test-utils"
import { task, overdueTask } from "../../test/mockStore"
import Default, { AddTask } from "./AddTask"

describe("<AddTask />", () => {
  let onCreateTask
  let addTask
  let mount

  beforeAll(() => {
    onCreateTask = jest.fn()
    mount = createMount()

    const classes = getClasses(<Default />)
    addTask = mount(<AddTask classes={classes} onCreateTask={onCreateTask} />)
  })

  afterEach(() => {
    onCreateTask.mockReset()
  })

  it("should render with proper state", () => {
    expect(addTask.state("name")).toEqual("")
    expect(addTask.state("description")).toEqual("")
    // we won't test down to the second here
    // by default the component should present a date 3 days in the future
    const expectedTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
      .toISOString()
      .slice(0, 13)
    const timeRendered = addTask.state("dueDate").slice(0, 13)
    expect(expectedTime).toEqual(timeRendered)
  })

  it("should not call onCreateTask if date is invalid", async () => {
    await addTask
      .instance()
      .handleChange({ target: { id: "dueDate", value: "??" } })
    addTask.update()
    addTask
      .find("#submit")
      .first()
      .simulate("click")
    addTask.update()
    expect(onCreateTask).not.toHaveBeenCalled()
  })

  it("should not call onCreateTask if name is empty", async () => {
    await addTask.instance().handleChange({ target: { id: "name", value: "" } })
    addTask.update()
    addTask
      .find("#submit")
      .first()
      .simulate("click")
    addTask.update()
    expect(onCreateTask).not.toHaveBeenCalled()
  })

  it("should call onCreateTask when required inputs are valid", async () => {
    await addTask
      .instance()
      .handleChange({ target: { id: "name", value: "test" } })
    addTask.update()
    await addTask
      .instance()
      .handleChange({ target: { id: "dueDate", value: "2020-05-05" } })
    addTask.update()
    addTask
      .find("#submit")
      .first()
      .simulate("click")
    expect(onCreateTask).toHaveBeenCalledWith({
      name: "test",
      description: "",
      dueDate: new Date("2020-05-05"),
      completed: false,
    })
  })
})

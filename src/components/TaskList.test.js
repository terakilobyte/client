import React from "react"
import { getClasses, createShallow } from "@material-ui/core/test-utils"
import { taskList } from "../../test/mockStore"
import { injectContext, orderTasksDefault } from "../context"
import renderer from "react-test-renderer"
import Default, { TaskList } from "./TaskList"
import Task from "./Task"

describe("<TaskList />", () => {
  const { completeTasks, incompleteTasks } = orderTasksDefault(taskList)
  let shallow
  let list
  let noList
  let classes

  beforeAll(() => {
    shallow = createShallow()
    classes = getClasses(<Default />)
    list = <TaskList {...{ completeTasks, incompleteTasks, classes }} />
    noList = (
      <TaskList {...{ completeTasks: [], incompleteTasks: [], classes }} />
    )
  })

  it("should render 4 tasks if passed 4 items", () => {
    const wrapper = shallow(list)
    expect(wrapper.find(Task).length).toEqual(4)
  })

  it("should render 0 tasks if passed 0 items", () => {
    const wrapper = shallow(noList)
    expect(wrapper.find(Task).length).toEqual(0)
  })
})

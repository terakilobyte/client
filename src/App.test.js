import React from "react"
import { getClasses, createMount } from "@material-ui/core/test-utils"
import { taskList } from "../test/mockStore"
import { injectContext } from "./context"
import renderer from "react-test-renderer"
import App from "./App"
import Button from "@material-ui/core/Button"
import * as actions from "./context/actions"
import TaskList from "./components/TaskList"

describe("<App />", () => {
  let mount
  let wrapper

  const onFetchTasks = jest.fn().mockImplementation(function() {
    this.setState({ tasks: taskList })
  })

  beforeAll(() => {
    mount = createMount()

    const appActions = {
      onFetchTasks,
    }
    wrapper = mount(injectContext({}, { ...appActions })(App))
  })

  it("should call onFetchTasks when mounting", () => {
    expect(onFetchTasks).toHaveBeenCalled()
  })

  it("should have state after onFetchTasks", () => {
    expect(wrapper.state("tasks")).toEqual(taskList)
  })

  it("should render with an add button", () => {
    expect(
      wrapper
        .find(Button)
        .first()
        .text(),
    ).toEqual("Add a Task!")
  })
})

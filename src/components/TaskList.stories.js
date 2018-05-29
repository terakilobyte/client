import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import TaskList from "./TaskList"
import { taskList } from "../../test/mockStore"
import { injectContext } from "../context"

const actions = {
  onOpenModal: action("onOpenModal"),
  onDeleteTask: action("onDeleteTask"),
  onUpdateTask: action("onUpdateTask"),
}

storiesOf("TaskList", module)
  .add("empty", () => injectContext()(TaskList))
  .add("with tasks", () =>
    injectContext({ tasks: taskList }, { ...actions })(TaskList),
  )

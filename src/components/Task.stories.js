import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { task, overdueTask } from "../../test/mockStore"
import { injectContext } from "../context"
import Task from "./Task"

const actions = {
  onOpenModal: action("onOpenModal"),
  onDeleteTask: action("onDeleteTask"),
  onUpdateTask: action("onUpdateTask"),
}

storiesOf("Task", module)
  .add("overdue", () =>
    injectContext({}, { ...actions })(Task, { ...overdueTask }),
  )
  .add("incomplete", () => injectContext({}, { ...actions })(Task, { ...task }))
  .add("complete", () =>
    injectContext({}, { ...actions })(Task, {
      ...{ ...task, completed: true },
    }),
  )

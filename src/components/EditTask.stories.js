import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import EditTask from "./EditTask"
import { injectContext } from "../context"
import { task } from "../../test/mockStore"

const actions = {
  onUpdateTask: action("onUpdateTask"),
}

const defaultDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
  .toISOString()
  .slice(0, -8)

storiesOf("EditTask", module).add("default", () =>
  injectContext({ taskToEdit: task, ...actions })(EditTask),
)

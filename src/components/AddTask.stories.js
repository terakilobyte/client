import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import AddTask from "./AddTask"
import { injectContext } from "../context"

const actions = {
  onCreateTask: action("onCreateTask"),
}

const defaultDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
  .toISOString()
  .slice(0, -8)

storiesOf("AddTask", module).add("default", () =>
  injectContext({ ...actions })(AddTask),
)

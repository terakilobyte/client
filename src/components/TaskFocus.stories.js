import React from "react"
import { storiesOf } from "@storybook/react"

import TaskFocus from "./TaskFocus"
import { task, overdueTask } from "../../test/mockStore"
const dueSoon = new Date(Date.now() + 1 * 1000 * 60 * 60 * 24)

storiesOf("TaskFocus", module)
  .add("incomplete", () => <TaskFocus {...task} />)
  .add("complete", () => <TaskFocus {...{ ...task, completed: true }} />)
  .add("overdue!", () => <TaskFocus {...overdueTask} />)
  .add("due soon", () => <TaskFocus {...{ ...task, dueDate: dueSoon }} />)

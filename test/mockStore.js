export const task = {
  _id: "testtask",
  name: "Storybook",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, quae dolore modi perspiciatis et excepturi incidunt, doloribus odit nostrum qui rem, unde sequi laboriosam suscipit magnam? Autem quasi architecto tempora?",
  completed: false,
  dueDate: new Date("2125-05-28T15:00:00"),
}

export const overdueTask = {
  _id: "task_overdue",
  name: "Storybook",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque in nesciunt aliquam reiciendis, quo nemo culpa a ex sed veritatis! Doloribus maiores, recusandae totam iure a dolorum laboriosam facere nulla.",
  completed: false,
  dueDate: new Date("1925-05-28T15:00:00"),
}

export const taskList = [
  {
    _id: "task1",
    name: "Task that is due in the future",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, quae dolore modi perspiciatis et excepturi incidunt, doloribus odit nostrum qui rem, unde sequi laboriosam suscipit magnam? Autem quasi architecto tempora?",
    completed: false,
    dueDate: new Date("2125-05-28T15:00:00"),
  },
  {
    _id: "task2",
    name: "Task that is due sooner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, quae dolore modi perspiciatis et excepturi incidunt, doloribus odit nostrum qui rem, unde sequi laboriosam suscipit magnam? Autem quasi architecto tempora?",
    completed: false,
    dueDate: new Date("2025-05-28T15:00:00"),
  },
  {
    _id: "task3",
    name: "A completed task!",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, quae dolore modi perspiciatis et excepturi incidunt, doloribus odit nostrum qui rem, unde sequi laboriosam suscipit magnam? Autem quasi architecto tempora?",
    completed: true,
    dueDate: new Date("2125-05-28T15:00:00"),
  },
  overdueTask,
]

export function uid() {
  function inner() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return inner() + inner() + inner() + inner()
}

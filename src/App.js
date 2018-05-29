import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import getContext from "./context"

const styles = theme => ({
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  title: {
    textAlign: "center",
  },
  addTask: {
    display: "inline-flex",
    justifyContent: "center",
  },
  control: {
    display: "inline-flex",
    justifyContent: "space-around",
  },
})
export class App extends Component {
  componentDidMount() {
    this.props.onFetchTasks()
  }
  render() {
    const {
      classes,
      onOpenModal,
      onCloseModal,
      addModalOpen,
      editModalOpen,
      onCreateTask,
      onChooseTaskFocus,
    } = this.props
    return (
      <div>
        <Modal
          aria-labelledby="add-task"
          aria-describedby="add a todo task"
          open={addModalOpen}
          onClose={() => onCloseModal("add")}
        >
          <AddTask {...onCreateTask} />
        </Modal>
        <Modal
          aria-labelledby="add-task"
          aria-describedby="add a todo task"
          open={editModalOpen}
          onClose={() => onCloseModal("edit")}
        >
          <EditTask />
        </Modal>
        <Grid container spacing={24}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <h1 className={classes.title}>Toodo</h1>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} className={classes.addTask}>
            <Button
              id="add-task-button"
              onClick={() => onOpenModal("add")}
              variant="raised"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Add a Task!
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.control}>
            <h3>View</h3>
            <Button
              id="view-all-button"
              onClick={() => onChooseTaskFocus("all")}
              variant="raised"
              style={{ backgroundColor: "green", color: "white" }}
            >
              All
            </Button>
            <Button
              id="overdue-tasks-only"
              onClick={() => onChooseTaskFocus("overdue")}
              variant="raised"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Overdue!
            </Button>
            <Button
              id="focus-mode"
              onClick={() => onChooseTaskFocus("dueSoon")}
              variant="raised"
              style={{ backgroundColor: "orange", color: "white" }}
            >
              Due Soon
            </Button>
            <Button
              id="completed-tasks-only"
              onClick={() => onChooseTaskFocus("completed")}
              variant="raised"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Completed
            </Button>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={12}>
            <TaskList />
          </Grid>
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  addModalOpen: PropTypes.bool.isRequired,
  editModalOpen: PropTypes.bool.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onChooseTaskFocus: PropTypes.func.isRequired,
}

const mapContextToProps = ({
  onOpenModal,
  onCloseModal,
  addModalOpen,
  editModalOpen,
  onCreateTask,
  onFetchTasks,
  onChooseTaskFocus,
}) => ({
  onOpenModal,
  onCloseModal,
  addModalOpen,
  editModalOpen,
  onCreateTask,
  onFetchTasks,
  onChooseTaskFocus,
})

export default getContext(mapContextToProps)(withStyles(styles)(App))

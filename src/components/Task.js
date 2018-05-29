import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Button from "@material-ui/core/Button"
import TaskFocus from "./TaskFocus"
import getContext from "../context"

const styles = theme => ({
  column: {
    flexBasis: "33.33%",
  },
})

export class Task extends Component {
  state = {
    open: false,
  }

  render() {
    const {
      _id,
      name,
      description,
      dueDate,
      completed,
      classes,
      onUpdateTask,
      onDeleteTask,
      onOpenModal,
    } = this.props
    return (
      <div className={"taskComponent"}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <TaskFocus {...{ name, dueDate, completed }} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.column}>
              <Typography>{description}</Typography>
            </div>
            <div className={classes.column} />
            <ExpansionPanelActions>
              <Button
                variant="raised"
                size="medium"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => {
                  onUpdateTask({
                    _id,
                    name,
                    description,
                    dueDate,
                    completed: !completed,
                  })
                }}
              >
                {(completed && "Uncomplete?") || "Complete"}
              </Button>
              <Button
                variant="raised"
                size="medium"
                color="primary"
                onClick={() =>
                  onOpenModal("edit", {
                    _id,
                    name,
                    description,
                    dueDate,
                    completed,
                  })
                }
              >
                Edit
              </Button>
              <Button
                variant="raised"
                size="medium"
                color="secondary"
                onClick={() => {
                  onDeleteTask(_id)
                }}
              >
                Delete
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
  completed: PropTypes.bool.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
}

const mapContextToProps = ({ onUpdateTask, onDeleteTask, onOpenModal }) => ({
  onUpdateTask,
  onDeleteTask,
  onOpenModal,
})

export default getContext(mapContextToProps)(withStyles(styles)(Task))

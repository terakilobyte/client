import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Task from "./Task"
import getContext from "../context"

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    margin: "5px",
  },
})

export class TaskList extends React.Component {
  componentDidCatch(error, info) {
    console.error(error, info)
  }
  render() {
    const { incompleteTasks, completeTasks, classes } = this.props
    const completed = completeTasks.map(elem => (
      <div key={elem._id} className={classes.item}>
        <Task {...elem} />
      </div>
    ))
    const incomplete = incompleteTasks.map(elem => (
      <div key={elem._id} className={classes.item}>
        <Task {...elem} />
      </div>
    ))
    return (
      <div className={classes.root}>
        {incomplete}
        {completed}
      </div>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
  completeTasks: PropTypes.array.isRequired,
  incompleteTasks: PropTypes.array.isRequired,
}

const mapContextToProps = ({ completeTasks, incompleteTasks }) => ({
  completeTasks,
  incompleteTasks,
})

export default getContext(mapContextToProps)(withStyles(styles)(TaskList))

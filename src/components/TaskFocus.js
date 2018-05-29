import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  container: {
    width: "100%",
    display: "flex",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 2}px`,
  },
})

const completedLineStyle = completed => ({
  textDecoration: completed ? "line-through" : "none",
  fontWeight: completed ? "lighter" : "normal",
})

const iconColor = dueDate => {
  let due
  const today = new Date().toISOString().slice(0, 10)
  const tomorrow = new Date(Date.now() + 1 * 1000 * 24 * 60 * 60)
    .toISOString()
    .slice(0, 10)
  try {
    due = new Date(dueDate).toISOString().slice(0, 10)
  } catch (e) {
    console.error(e.message)
  }
  if (Date.parse(dueDate) < Date.now()) {
    return { color: "red" }
  }
  if (due == today || due == tomorrow) {
    return { color: "orange" }
  }
  return { color: "yellow" }
}

export const TaskFocus = ({ classes, name, dueDate, completed }) => {
  let localDueDate
  try {
    localDueDate = new Date(dueDate).toLocaleString()
  } catch (e) {
    localDueDate = ""
  }
  return (
    <div className={classes.container}>
      <Grid item xs={1}>
        {(completed && <CheckCircleIcon style={{ color: "green" }} />) || (
          <AccessTimeIcon style={iconColor(dueDate)} />
        )}
      </Grid>
      <Grid item xs={7} style={{ textAlign: "center" }}>
        <div className={"name-div"} style={completedLineStyle(completed)}>
          {name}
        </div>
      </Grid>
      <Grid
        item
        xs={4}
        style={completedLineStyle(completed)}
        className={"date-div"}
      >
        {localDueDate}
      </Grid>
    </div>
  )
}

TaskFocus.proptypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  completed: PropTypes.bool.isRequired,
}

export default withStyles(styles)(TaskFocus)

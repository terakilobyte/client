import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import getContext from "../context"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  inputField: {
    width: "100%",
  },
  textField: {
    display: "inline-flex",
    flexDirection: "column",
    width: "100%",
    height: "25vh",
    overflowWrap: "break-word",
  },
  dateField: {
    width: "100%",
  },
  saveButton: {
    width: "35px",
  },
  paper: {
    position: "absolute",
    width: "50vw",
    top: "25%",
    left: "25%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

export class AddTask extends Component {
  state = {
    name: "",
    description: "",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
      .toISOString()
      .slice(0, -8),
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSave = () => {
    const { name, description, dueDate } = this.state
    if (name === "" || isNaN(Date.parse(dueDate))) {
      return
    }
    this.props.onCreateTask({
      name,
      description,
      dueDate: new Date(dueDate),
      completed: false,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.paper}>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              error={this.state.name === ""}
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              className={classes.inputField}
              autoFocus={true}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <textarea
              id="description"
              label="Description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
              className={classes.textField}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              error={isNaN(Date.parse(this.state.dueDate))}
              id="dueDate"
              type="datetime-local"
              helperText="Due Date"
              defaultValue={this.state.dueDate}
              className={classes.dateField}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              id="submit"
              variant="raised"
              style={{ backgroundColor: "green", color: "white" }}
              className={classes.saveButton}
              onClick={this.handleSave}
            >
              Save
            </Button>
          </FormControl>
        </div>
      </div>
    )
  }
}

AddTask.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreateTask: PropTypes.func.isRequired,
}

const mapContextToProps = ({ onCreateTask }) => ({
  onCreateTask,
})

export default getContext(mapContextToProps)(withStyles(styles)(AddTask))

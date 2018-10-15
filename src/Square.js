import React, { Component } from "react"

class Square extends Component {
  _click = event => {
    this.props.handleCheck(this.props.row, this.props.column)
  }

  _rightClick = event => {
    this.props.handleFlag(this.props.row, this.props.column)
    event.preventDefault()
  }

  render() {
    let output = this.props.value
    if (this.props.value === "*") {
      output = "💣"
    }
    if (this.props.value === "F") {
      output = "🏳"
    }
    if (this.props.value === "@") {
      output = "🏳"
    }
    if (this.props.value === "_") {
      output = ""
    }

    let squareClass = "not-checked"
    if (
      this.props.value === "*" ||
      this.props.value === "@" ||
      this.props.value === "_" ||
      this.props.value === 1 ||
      this.props.value === 2 ||
      this.props.value === 3 ||
      this.props.value === 4 ||
      this.props.value === 5 ||
      this.props.value === 6 ||
      this.props.value === 7 ||
      this.props.value === 8
    ) {
      squareClass = "checked"
    }

    return (
      <td
        className={squareClass}
        onContextMenu={this._rightClick}
        onClick={this._click}
      >
        {output}
      </td>
    )
  }
}

export default Square

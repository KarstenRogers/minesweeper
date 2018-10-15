import React, { Component } from "react"
import "./App.css"
import Square from "./Square"
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      board: [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "]
      ],
      state: "playing",
      mines: 0
    }
  }

  _easyGame = event => {
    axios
      .post("https://minesweeper-api.herokuapp.com/games", { difficulty: 0 })
      .then(response => {
        this.setState(response.data)
      })
  }

  _mediumGame = event => {
    axios
      .post("https://minesweeper-api.herokuapp.com/games", { difficulty: 1 })
      .then(response => {
        this.setState(response.data)
      })
  }

  _hardGame = event => {
    axios
      .post("https://minesweeper-api.herokuapp.com/games", { difficulty: 2 })
      .then(response => {
        this.setState(response.data)
      })
  }

  handleCheck = (row, column) => {
    if (this.state.id === 0) {
      return
    }
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        { row: row, col: column }
      )
      .then(response => {
        this.setState(response.data)
      })
  }

  handleFlag = (row, column) => {
    if (this.state.id === 0) {
      return
    }
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        { row: row, col: column }
      )
      .then(response => {
        this.setState(response.data)
      })
  }

  gameMessage = () => {
    if (this.state.id === 0) {
      return <p>Choose Difficulty to Start a Game</p>
    }
    return <p>Game #{this.state.id}</p>
  }

  gameStatus = () => {
    if (this.state.id === 0) {
      return "Ready to Play"
    }
    return `Status: ${this.state.state}`
  }

  render() {
    let gameBoard = this.state.board.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {row.map((value, columnIndex) => {
            return (
              <Square
                key={columnIndex}
                handleFlag={this.handleFlag}
                handleCheck={this.handleCheck}
                row={rowIndex}
                column={columnIndex}
                value={value}
              />
            )
          })}
        </tr>
      )
    })

    return (
      <div className="main">
        <header>
          <h1>Minesweeper</h1>
          <h2>{this.gameMessage()}</h2>
        </header>

        <div className="diff-select">
          <button onClick={this._easyGame}>Easy</button>
          <button onClick={this._mediumGame}>Medium</button>
          <button onClick={this._hardGame}>Hard</button>
        </div>

        <main>
          <div>
            <p className="status">{this.gameStatus()}</p>
          </div>
          <h3>
            <span>Mines: {this.state.mines}</span>
          </h3>

          <table>
            <tbody>{gameBoard}</tbody>
          </table>
        </main>
      </div>
    )
  }
}
export default App

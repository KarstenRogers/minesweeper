import React, { Component } from 'react';

class Cell extends Component {
    check = event => {
        this.props.check(this.props.row, this.props.column)
    }
    
    flag = event => {
        this.props.flag(this.props.row, this.props.column)
        event.preventDefault()
    }

    render() { 
        return ( <td onClick = {this.check} onContextMenu = {this.flag}>
            {this.props.value}
                </td> );
    }
}
 
export default Cell;


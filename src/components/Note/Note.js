import React, { Component } from 'react'

export default class Note extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <li className="noteItem">
        <button className='remove' onClick={() => this.props.remove(this.props.note.id)}><span class="material-symbols-outlined">
          cancel
        </span></button>
        <div className="noteItemContent">{this.props.note.content}</div>

      </li>

    )
  }
}

import React, { Component } from 'react'
import Note from '../Note/Note';

export default class AddNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      textAreaRef: React.createRef(),
    }
  }
  componentDidMount() {
    console.log("Main Board Mounted");
    this.loadNotesFromServer()
  }

  loadNotesFromServer = () => {
    fetch("http://localhost:7070/notes")
      .then(response => response.json())
      .then(notes => {
        this.setState({ items: [...notes] });

      })
  }
  addNoteToServer = (e) => {
    e.preventDefault();
    let id = 1;
    const content = this.state.textAreaRef.current.value;
    const contentJson = JSON.stringify({ id, content });
    id++;

    fetch("http://localhost:7070/notes", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: contentJson,
    }).then(response => { this.loadNotesFromServer() })

  }
  handleRemove = (id) => {
    console.log("Удален!" + id);
    fetch(`http://localhost:7070/notes/${id}`, {
      method: "DELETE", // or 'PUT'
    }).then(response => { this.loadNotesFromServer() })
    this.setState({ items: this.state.items.filter((item) => item.id !== id) })
  }
  render() {
    return (
      <div className='mainBoard'>
        <span className='noteHeader'>Notes</span>
        <button className='refreshNote' onClick={this.loadNotesFromServer}><span class="material-symbols-outlined">
          refresh
        </span></button>
        <div className='board'>
          <ul className='noteList'>
            {this.state.items.map((item) => (
              <Note key={item.id} note={item} remove={this.handleRemove} />
            ))}
          </ul>
          <form className='noteAddForm' autoComplete='off' onSubmit={this.addNoteToServer}>
            <label className='addForm' htmlFor='noteText'>New Note</label>
            <textarea id="noteText" name="noteText" rows="5" cols="33" ref={this.state.textAreaRef} />
            <button type='submit'><span class="material-symbols-outlined">
              arrow_forward_ios
            </span></button>

          </form>
        </div>

      </div>

    )
  }
}

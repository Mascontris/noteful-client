import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'

export default function NotePageMain(props) {
  console.log(props.note.noteId)
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.noteId}
        name={props.note.noteName}
        modified={props.note.modified}
      />
      <div className='NotePageMain__content'>
        {props.note.noteContent.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

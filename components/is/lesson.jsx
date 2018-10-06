import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class lesson extends Component {
   state = {
      lessons: []
   }

   componentDidMount = () => {
      this.loadLesson()
   }

   loadLesson = () => {
      Axios.get('/api/lesson/all').then(res => {
         console.log(res.data)
         this.setState({ lessons: res.data.lesson })
      })
   }

   render() {
      const { lessons } = this.state
      const listLesson = lessons.map(lesson => {
         return (
            <tr key={lesson._id}>
               <Fade>
                  <td>{lesson.number}</td>
               </Fade>
               <Fade>
                  <td>{lesson.title}</td>
               </Fade>
               <Fade>
                  <td>{lesson.value}</td>
               </Fade>
            </tr>
         )
      })

      if (lessons.length === 0) {
         return null
      }

      return (
         <div>
            <div className="column">
               <div
                  className="column"
                  style={{
                     display: 'flex',
                     justifyContent: 'flex-end'
                  }}>
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'flex-end'
                     }}>
                     <img src="/static/icons/book.png" alt="" />
                     <h3 className="title is-3 has-text-light">หลักสูตร</h3>
                  </div>
               </div>
               <div className="columns">
                  <div className="column is-4" />
                  <div className="column is-8">
                     <table className="table is-fullwidth is-bordered has-background-dark has-text-light">
                        <thead>
                           <tr>
                              <th style={{ color: 'white' }}>รหัสวิชา</th>
                              <th style={{ color: 'white' }}>ชื่อวิชา</th>
                              <th style={{ color: 'white' }}>หน่วยกิต</th>
                           </tr>
                        </thead>
                        <tbody>{listLesson}</tbody>
                     </table>
                  </div>
               </div>
            </div>
            <hr />
         </div>
      )
   }
}

export default lesson

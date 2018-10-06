import React, { Component } from 'react'
import Axios from 'axios'
import Fade from 'react-reveal/Fade'

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
   saveLesson = e => {
      e.preventDefault()
      Axios({
         url: '/api/lesson/add',
         method: 'post',
         data: {
            number: this.refs.number.value,
            title: this.refs.title.value,
            value: this.refs.value.value
         }
      }).then(res => {
         console.log(res.data)
         this.loadLesson()
         this.refs.form.reset()
      })
   }

   deleteLesson = _id => {
      Axios({
         url: '/api/lesson/delete',
         method: 'delete',
         data: { _id }
      }).then(res => {
         console.log(res.data)
         this.loadLesson()
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
               <Fade>
                  <td>
                     <button
                        className="button is-danger is-small"
                        onClick={() => this.deleteLesson(lesson._id)}>
                        ลบ
                     </button>
                  </td>
               </Fade>
            </tr>
         )
      })

      return (
         <div className="container">
            <div className="column">
               <div className="box">
                  <form ref="form">
                     <h3>เพิ่มหลักสูตร</h3>
                     <div className="column">
                        <label>รหัสวิชา</label>
                        <input
                           className="input is-rounded"
                           type="text"
                           ref="number"
                        />
                     </div>
                     <div className="column">
                        <label>ชื่อวิชา</label>
                        <input
                           className="input is-rounded"
                           type="text"
                           ref="title"
                        />
                     </div>
                     <div className="column">
                        <label>หน่วยกิต</label>
                        <input
                           className="input is-rounded"
                           type="text"
                           ref="value"
                        />
                     </div>
                     <button
                        className="button is-primary"
                        onClick={this.saveLesson}>
                        บันทึก
                     </button>
                  </form>
               </div>
            </div>
            <div className="column">
               <table className="table is-fullwidth is-bordered">
                  <thead>
                     <tr>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา</th>
                        <th>หน่วยกิต</th>
                        <th>ลบ</th>
                     </tr>
                  </thead>
                  <tbody>{listLesson}</tbody>
               </table>
            </div>
         </div>
      )
   }
}

export default lesson

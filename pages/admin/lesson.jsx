import React, { Component } from 'react'
import Axios from 'axios'
import Fade from 'react-reveal/Fade'
import classNames from 'classnames'

// component
import Navbar from '../../components/navbar/Navbar'

export class lesson extends Component {
   state = {
      lessons: [],
      _id: '',
      activeModal: false
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

   updateLesson = e => {
      e.preventDefault()
      Axios({
         url: '/api/lesson/update',
         method: 'put',
         data: {
            _id: this.state._id,
            number: this.refs.numberEdit.value,
            title: this.refs.titleEdit.value,
            value: this.refs.valueEdit.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.setState({ activeModal: false })
            this.refs.formEdit.reset()
            this.loadLesson()
         }
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
      const { lessons, activeModal } = this.state

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
                        className="button is-warning is-small"
                        onClick={() => {
                           this.refs.numberEdit.value = lesson.number
                           this.refs.titleEdit.value = lesson.title
                           this.refs.valueEdit.value = lesson.value
                           this.setState({
                              _id: lesson._id,
                              activeModal: true
                           })
                        }}>
                        แก้ไข
                     </button>
                  </td>
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
         <div>
            <Navbar logo="black" />
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
                  <table className="table is-striped is-fullwidth">
                     <thead>
                        <tr>
                           <th>รหัสวิชา</th>
                           <th>ชื่อวิชา</th>
                           <th>หน่วยกิต</th>
                           <th>แก้ไข</th>
                           <th>ลบ</th>
                        </tr>
                     </thead>
                     <tbody>{listLesson}</tbody>
                  </table>
               </div>

               {/* modal */}
               <div
                  className={classNames({
                     modal: true,
                     'is-active': activeModal
                  })}>
                  <div className="modal-background" />
                  <div className="modal-card">
                     <header className="modal-card-head">
                        <p className="modal-card-title">แก้ไขหลักสูตร</p>
                        <button
                           className="delete"
                           aria-label="close"
                           onClick={() => this.setState({ activeModal: false })}
                        />
                     </header>
                     <form ref="formEdit">
                        <section className="modal-card-body">
                           <div className="column">
                              <label>รหัสวิชา</label>
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="numberEdit"
                              />
                           </div>
                           <div className="column">
                              <label>ชื่อวิชา</label>
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="titleEdit"
                              />
                           </div>
                           <div className="column">
                              <label>หน่วยกิต</label>
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="valueEdit"
                              />
                           </div>
                        </section>
                        <footer className="modal-card-foot">
                           <button
                              className="button is-success"
                              onClick={this.updateLesson}>
                              บันทึก
                           </button>
                           <button
                              className="button"
                              onClick={e => {
                                 e.preventDefault()
                                 this.setState({ activeModal: false })
                              }}>
                              ยกเลิก
                           </button>
                        </footer>
                     </form>
                  </div>
               </div>
               {/* --- */}
            </div>
         </div>
      )
   }
}

export default lesson

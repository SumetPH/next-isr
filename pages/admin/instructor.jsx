import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'

// redux
import { connect } from 'react-redux'

// components
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'
import Navbar from '../../components/navbar/Navbar'

export class Instructor extends Component {
   state = {
      _id: '',
      instructors: [],
      loadPage: false,
      loadingAdd: false,
      loadingDel: {},
      activeModal: false
   }

   // method
   componentDidMount = () => {
      this.loadInstructor()
   }

   loadInstructor = () => {
      axios.get('/api/instructor/all').then(res => {
         console.log(res.data)
         this.setState({ instructors: res.data.instructors })
      })
      setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
   }

   addInstructor = e => {
      e.preventDefault()
      this.setState({ loadingAdd: true })
      axios({
         method: 'POST',
         url: '/api/instructor/post',
         data: {
            name: this.refs.name.value,
            sex: this.refs.sex.value,
            position: this.refs.position.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value
         }
      }).then(res => {
         console.log(res.data)
         this.setState({ loadingAdd: false })
         if (res.data.msg === 'Success') {
            this.refs.form.reset()
            this.loadInstructor()
         }
      })
   }

   updateInstructor = e => {
      e.preventDefault()
      axios({
         url: '/api/instructor/update',
         method: 'put',
         data: {
            _id: this.state._id,
            name: this.refs.ename.value,
            sex: this.refs.esex.value,
            position: this.refs.eposition.value,
            email: this.refs.eemail.value,
            phone: this.refs.ephone.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.setState({ activeModal: false })
            this.refs.formEdit.reset()
            this.loadInstructor()
         }
      })
   }

   deleteInstructor = _id => {
      let loadingDel = this.state.loadingDel
      loadingDel[_id] = 'is-loading'
      this.setState({ loadingDel })

      axios({
         method: 'DELETE',
         url: '/api/instructor/delete',
         data: { _id }
      }).then(res => {
         console.log(res.data)
         this.loadInstructor()
      })
   }

   render() {
      const { instructors } = this.state
      const listInstructor = instructors.map(instructor => {
         return (
            <tr key={instructor._id}>
               <Fade>
                  <td>{instructor.sex}</td>
               </Fade>
               <Fade>
                  <td>{instructor.name}</td>
               </Fade>
               <Fade>
                  <td>{instructor.position}</td>
               </Fade>
               <Fade>
                  <td>{instructor.email}</td>
               </Fade>
               <Fade>
                  <td>{instructor.phone}</td>
               </Fade>
               <Fade>
                  <td>
                     <button
                        className="button is-warning is-small"
                        onClick={() => {
                           this.refs.ename.value = instructor.name
                           this.refs.esex.value = instructor.sex
                           this.refs.eposition.value = instructor.position
                           this.refs.eemail.value = instructor.email
                           this.refs.ephone.value = instructor.phone
                           this.setState({
                              _id: instructor._id,
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
                        onClick={() => this.deleteInstructor(instructor._id)}>
                        ลบ
                     </button>
                  </td>
               </Fade>
            </tr>
         )
      })

      // if (!this.state.loadPage) {
      //    return <Loading />
      // }

      if (!this.props.isAdmin) {
         return <NoAccess />
      }

      return (
         <div>
            <Navbar logo="black" />
            <div className="container">
               {/* add professor */}
               <div className="column">
                  <div className="box">
                     <h6 className="subtitle is-6">เพิ่มอาจารย์</h6>
                     <form ref="form">
                        <div className="column">
                           <div className="columns">
                              <div className="column is-10">
                                 <input
                                    className="input is-rounded"
                                    type="text"
                                    ref="name"
                                    placeholder="ชื่อ-สกุล"
                                 />
                              </div>
                              <div
                                 className="column is-2"
                                 style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                 }}>
                                 <div className="select is-rounded">
                                    <select ref="sex">
                                       <option>ชาย</option>
                                       <option>หญิง</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="column">
                           <div className="control">
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="position"
                                 placeholder="ตำแหน่ง"
                              />
                           </div>
                        </div>
                        <div className="column">
                           <div className="control">
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="email"
                                 placeholder="Email"
                              />
                           </div>
                        </div>
                        <div className="column">
                           <div className="control">
                              <input
                                 className="input is-rounded"
                                 type="text"
                                 ref="phone"
                                 placeholder="หมายเลขโทรศัพท์"
                              />
                           </div>
                        </div>
                        <div className="column is-1">
                           <button
                              className={classnames({
                                 'button is-info': true,
                                 'is-loading': this.state.loadingAdd
                              })}
                              onClick={this.addInstructor}>
                              เพิ่ม
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
               {/* --- */}

               <div className="column">
                  <table className="table is-striped is-fullwidth">
                     <thead>
                        <tr>
                           <th>เพศ</th>
                           <th>ชื่อ-สกุล</th>
                           <th>ตำแหน่ง</th>
                           <th>Email</th>
                           <th>หมายเลขโทรศัพท์</th>
                           <th>ลบ</th>
                        </tr>
                     </thead>
                     <tbody>{listInstructor}</tbody>
                  </table>
               </div>

               {/* modal */}
               <div
                  className={classnames({
                     modal: true,
                     'is-active': this.state.activeModal
                  })}>
                  <div className="modal-background" />
                  <div className="modal-card">
                     <header className="modal-card-head">
                        <p className="modal-card-title">แก้ไขอาจารย์</p>
                        <button
                           className="delete"
                           aria-label="close"
                           onClick={() => this.setState({ activeModal: false })}
                        />
                     </header>
                     <form ref="formEdit">
                        <section className="modal-card-body">
                           <div className="column">
                              <div className="columns">
                                 <div className="column is-9">
                                    <input
                                       className="input is-rounded"
                                       type="text"
                                       ref="ename"
                                       placeholder="ชื่อ-สกุล"
                                    />
                                 </div>
                                 <div
                                    className="column is-3"
                                    style={{
                                       display: 'flex',
                                       justifyContent: 'center'
                                    }}>
                                    <div className="select is-rounded">
                                       <select ref="esex">
                                          <option>ชาย</option>
                                          <option>หญิง</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="column">
                              <div className="control">
                                 <input
                                    className="input is-rounded"
                                    type="text"
                                    ref="eposition"
                                    placeholder="ตำแหน่ง"
                                 />
                              </div>
                           </div>
                           <div className="column">
                              <div className="control">
                                 <input
                                    className="input is-rounded"
                                    type="text"
                                    ref="eemail"
                                    placeholder="Email"
                                 />
                              </div>
                           </div>
                           <div className="column">
                              <div className="control">
                                 <input
                                    className="input is-rounded"
                                    type="text"
                                    ref="ephone"
                                    placeholder="หมายเลขโทรศัพท์"
                                 />
                              </div>
                           </div>
                        </section>
                        <footer className="modal-card-foot">
                           <button
                              className="button is-success"
                              onClick={this.updateInstructor}>
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

export default connect(state => state)(Instructor)

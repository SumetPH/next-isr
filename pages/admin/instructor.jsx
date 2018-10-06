import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'

// redux
import { connect } from 'react-redux'

// components
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'

export class Instructor extends Component {
   state = {
      instructors: [],
      loadPage: false,
      loadingAdd: false,
      loadingDel: {}
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
            position: this.refs.position.value,
            email: this.refs.email.value,
            facebook: this.refs.facebook.value
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
                  <td>{instructor.name}</td>
               </Fade>
               <Fade>
                  <td>{instructor.position}</td>
               </Fade>
               <Fade>
                  <td>{instructor.email}</td>
               </Fade>
               <Fade>
                  <td>{instructor.facebook}</td>
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

      if (!this.state.loadPage) {
         return <Loading />
      }

      if (!this.props.isAuth) {
         return <NoAccess />
      }

      return (
         <div className="container">
            {/* add professor */}
            <div className="column">
               <div className="box">
                  <h6 className="subtitle is-6">เพิ่มอาจารย์</h6>
                  <form ref="form">
                     <div className="column">
                        <div className="control">
                           <input
                              className="input is-rounded"
                              type="text"
                              ref="name"
                              placeholder="ชื่อ-สกุล"
                           />
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
                              ref="facebook"
                              placeholder="Facebook"
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
                        <th>ชื่อ-สกุล</th>
                        <th>ตำแหน่ง</th>
                        <th>Email</th>
                        <th>Facebook</th>
                        <th>ลบ</th>
                     </tr>
                  </thead>
                  <tbody>{listInstructor}</tbody>
               </table>
            </div>
         </div>
      )
   }
}

export default connect(state => state)(Instructor)

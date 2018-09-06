import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

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
         this.setState({ instructors: res.data.res })
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
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value
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
         data: {
            _id
         }
      }).then(res => {
         this.loadInstructor()
      })
   }

   // view
   instructorList = instructors => {
      return instructors.map(instructor => {
         return (
            <tr key={instructor._id}>
               <td>
                  {instructor.firstname} {instructor.lastname}
               </td>
               <td>
                  <button
                     className={`button is-danger is-small ${
                        this.state.loadingDel[instructor._id]
                     }`}
                     onClick={() => this.deleteInstructor(instructor._id)}>
                     ลบ
                  </button>
               </td>
            </tr>
         )
      })
   }

   render() {
      if (!this.state.loadPage) {
         return <Loading />
      }

      if (!this.props.isAuth) {
         return <NoAccess />
      }

      return (
         <div className="container">
            <div className="column" style={{ marginTop: '1rem' }}>
               <h5 className="title is-5">Instructor Management</h5>
               <div className="box">
                  <table className="table is-striped is-fullwidth">
                     <thead>
                        <tr>
                           <th>Instructor</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.instructorList(this.state.instructors)}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* add professor */}
            <div className="column">
               <h6 className="subtitle is-6">เพิ่มอาจารย์</h6>
               <form ref="form">
                  <div className="columns">
                     <div className="column">
                        <div className="control">
                           <input
                              className="input"
                              type="text"
                              ref="firstname"
                              placeholder="ชื่อ"
                           />
                        </div>
                     </div>
                     <div className="column">
                        <div className="control">
                           <input
                              className="input"
                              type="text"
                              ref="lastname"
                              placeholder="นามสกุล"
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
                  </div>
               </form>
            </div>
            {/* --- */}
         </div>
      )
   }
}

export default connect(state => state)(Instructor)

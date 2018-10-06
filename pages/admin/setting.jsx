import React, { Component } from 'react'
import { toast } from 'react-toastify'
import Axios from 'axios'

// redux
import { connect } from 'react-redux'

// component
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'
import Navbar from '../../components/navbar/Navbar'

export class setting extends Component {
   // state
   state = {
      loadPage: false,
      statusBtnPass1: true,
      statusBtnPass2: true
   }

   // method
   componentDidMount = () => {
      setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
   }

   changeUsername = e => {
      e.preventDefault()
      Axios({
         url: '/api/admin/change-username',
         method: 'Post',
         data: {
            newUsername: this.refs.newUsername.value,
            oldPassword: this.refs.oldPassword1.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            toast.success('เปลี่ยนชื่อผู้ใช้สำเร็จ')
            this.refs.changeUsername.reset()
         } else {
            toast.error('เปลี่ยนชื่อผู้ใช้ไม่สำเร็จ')
         }
      })
   }

   changePassword = e => {
      e.preventDefault()
      Axios({
         url: '/api/admin/change-password',
         method: 'Post',
         data: {
            newPassword: this.refs.newPassword.value,
            oldPassword: this.refs.oldPassword2.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            toast.success('เปลี่ยนรหัสผ่านสำเร็จ')
            this.refs.changePassword.reset()
         } else {
            toast.error('เปลี่ยนรหัสผ่านไม่สำเร็จ')
         }
      })
   }

   checkPassword1 = e => {
      e.preventDefault()
      if (this.refs.oldPassword1.value === this.refs.oldPassword11.value) {
         this.setState({ statusBtnPass1: false })
      } else {
         this.setState({ statusBtnPass1: true })
      }
   }

   checkPassword2 = e => {
      e.preventDefault()
      if (this.refs.oldPassword2.value === this.refs.oldPassword22.value) {
         this.setState({ statusBtnPass2: false })
      } else {
         this.setState({ statusBtnPass2: true })
      }
   }

   // render
   render() {
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
               <div className="columns">
                  <div className="column" style={{ marginTop: '1rem' }}>
                     <div className="box">
                        <h5 className="title is-5 has-text-centered">
                           ตั้งค่าระบบ
                        </h5>
                     </div>
                  </div>
               </div>
               <div className="columns">
                  <div className="column">
                     <div className="box">
                        <h6 className="title is-6">
                           เปลี่ยนชื่อผู้ใช้ (Username Admin)
                        </h6>
                        <form ref="changeUsername">
                           <div className="column">
                              <small>ชื่อผู้ใช้ใหม่</small>
                              <input
                                 type="text"
                                 className="input"
                                 ref="newUsername"
                                 placeholder="ชื่อผู้ใช้ใหม่"
                              />
                           </div>
                           <div className="column">
                              <small>รหัสผ่านปัจจุบัน</small>
                              <input
                                 type="password"
                                 className="input"
                                 ref="oldPassword1"
                                 onChange={this.checkPassword1}
                                 placeholder="รหัสผ่านปัจจุบัน"
                              />
                              <input
                                 style={{ marginTop: '5px' }}
                                 onChange={this.checkPassword1}
                                 type="password"
                                 className="input"
                                 ref="oldPassword11"
                                 placeholder="รหัสผ่านปัจจุบันอีกครัง"
                              />
                           </div>
                           <div className="column">
                              <button
                                 className="button is-primary"
                                 disabled={this.state.statusBtnPass1}
                                 onClick={this.changeUsername}>
                                 บันทึก
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
                  <div className="column">
                     <div className="box">
                        <h6 className="title is-6">
                           เปลี่ยนรหัสผ่าน (Password Admin)
                        </h6>
                        <form ref="changePassword">
                           <div className="column">
                              <small>รหัสผ่านใหม่</small>
                              <input
                                 type="text"
                                 className="input"
                                 ref="newPassword"
                                 placeholder="รหัสผ่านใหม่"
                              />
                           </div>
                           <div className="column">
                              <small>รหัสผ่านปัจจุบัน</small>
                              <input
                                 type="password"
                                 onChange={this.checkPassword2}
                                 className="input"
                                 ref="oldPassword2"
                                 placeholder="รหัสผ่านปัจจุบัน"
                              />
                              <input
                                 style={{ marginTop: '5px' }}
                                 onChange={this.checkPassword2}
                                 type="password"
                                 className="input"
                                 ref="oldPassword22"
                                 placeholder="รหัสผ่านปัจจุบันอีกครัง"
                              />
                           </div>
                           <div className="column">
                              <button
                                 className="button is-warning"
                                 disabled={this.state.statusBtnPass2}
                                 onClick={this.changePassword}>
                                 บันทึก
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default connect(state => state)(setting)

import React, { Component } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import classnames from 'classnames'

// redux
import { connect } from 'react-redux'

class registerUser extends Component {
   state = {
      isLoading: false
   }
   // method
   loginUser = e => {
      e.preventDefault()
      this.setState({ isLoading: true })
      axios({
         url: '/api/user/register',
         method: 'POST',
         data: {
            email: this.refs.email.value,
            username: this.refs.username.value,
            password: this.refs.password.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            Router.push('/user/login')
            toast.info(
               'เราได้ส่งอีเมลยืนยันไปยังอีเมลของท่านแล้ว กรุณายืนยันทำการยืนยันเพื่อเข้าใช้งาน',
               { autoClose: 10000 }
            )
         } else {
            toast.error('ลงทะเบียนไม่สำเร็จ')
            this.refs.form.reset()
         }
         this.setState({ isLoading: false })
      })
   }

   // render
   render() {
      return (
         <div className="hero is-danger is-bold is-fullheight">
            <div className="hero-body">
               <div className="container has-text-centered">
                  <div className="column is-4 is-offset-4">
                     <h3 className="title">สมัครสมาชิก</h3>
                     <p className="subtitle" style={{ marginBottom: '70px' }}>
                        สำหรับผู้ใช้งานทั่วไป
                     </p>
                     <div className="box animated slideInUp">
                        <div>
                           <img
                              className="is-rounded"
                              src="/static/icons/login.png"
                              alt=""
                              width="128px"
                              style={{
                                 marginTop: '-70px',
                                 marginBottom: '30px'
                              }}
                           />
                        </div>
                        <form ref="form">
                           <div className="field">
                              <div className="control">
                                 <input
                                    className="input is-danger"
                                    ref="email"
                                    placeholder="Email"
                                    type="text"
                                 />
                              </div>
                           </div>
                           <div className="field">
                              <div className="control">
                                 <input
                                    className="input is-danger"
                                    ref="username"
                                    placeholder="Username"
                                    type="text"
                                 />
                              </div>
                           </div>
                           <div className="field">
                              <div className="control">
                                 <input
                                    className="input is-danger"
                                    ref="password"
                                    placeholder="Password"
                                    type="password"
                                 />
                              </div>
                           </div>
                           <div className="field">
                              <div
                                 className="control"
                                 style={{ textAlign: 'center' }}>
                                 <button
                                    onClick={this.loginUser}
                                    className={classnames({
                                       'button is-danger is-fullwidth': true,
                                       'is-loading': this.state.isLoading
                                    })}>
                                    Register
                                 </button>
                              </div>
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

export default connect(state => state)(registerUser)

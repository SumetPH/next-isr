import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

// redux
import { connect } from 'react-redux'
import { loginUser } from '../../redux/store'

class LoginUser extends Component {
   // method
   loginUser = e => {
      e.preventDefault()
      axios({
         url: '/api/user/login',
         method: 'POST',
         data: {
            email: this.refs.email.value,
            password: this.refs.password.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.props.dispatch(loginUser())
            Router.push('/')
            toast.success('เข้าสู่ระบบสำเร็จ')
         } else {
            toast.error('เข้าสู่ระบบไม่สำเร็จ')
            this.refs.form.reset()
         }
      })
   }

   // render
   render() {
      return (
         <div className="hero is-info is-bold is-fullheight">
            <div className="hero-body">
               <div className="container has-text-centered">
                  <div className="column is-4 is-offset-4">
                     <h3 className="title">เข้าสู่ระบบ</h3>
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
                                    className="input is-info"
                                    ref="email"
                                    placeholder="Email"
                                    type="text"
                                 />
                              </div>
                           </div>
                           <div className="field">
                              <div className="control">
                                 <input
                                    className="input is-info"
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
                                    className="button is-info is-fullwidth">
                                    Login
                                 </button>
                                 <Link href="/user/register">
                                    <a
                                       className="button is-white is-fullwidth"
                                       style={{ marginTop: '10px' }}>
                                       สมัครสมาชิก
                                    </a>
                                 </Link>
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

export default connect(state => state)(LoginUser)

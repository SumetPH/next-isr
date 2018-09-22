import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import classnames from 'classnames'

// redux
import { connect } from 'react-redux'
import { loginUser } from '../../redux/store'

class LoginUser extends Component {
   state = {
      isActive: false,
      isLoading: false
   }

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
            this.props.dispatch(loginUser({ username: res.data.username }))
            Router.push('/')
            toast.success('เข้าสู่ระบบสำเร็จ')
         } else {
            toast.error('เข้าสู่ระบบไม่สำเร็จ')
            this.refs.form.reset()
         }
      })
   }

   sendForgetPass = e => {
      e.preventDefault()
      const { isActive, isLoading } = this.state
      this.setState({ isLoading: true })

      axios({
         url: '/api/user/forgetpass',
         method: 'post',
         data: { email: this.refs.emailtopass.value }
      }).then(res => {
         console.log(res.data)
         this.setState({ isActive: false, isLoading: false })
         if (res.data.msg === 'Success') {
            toast.success('เราได้ส่งรหัสผ่านไปยังอีเมลของท่านแล้ว')
         } else {
            toast.error(res.data.msg)
         }
      })
   }

   // render
   render() {
      const { isActive, isLoading } = this.state

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
                                 <button
                                    className="button is-white is-fullwidth"
                                    style={{ marginTop: '5px' }}
                                    onClick={e => {
                                       e.preventDefault()
                                       this.setState({ isActive: !isActive })
                                    }}>
                                    ลืมรหัสผ่าน
                                 </button>
                                 <Link href="/user/register">
                                    <a className="button is-white is-fullwidth">
                                       สมัครสมาชิก
                                    </a>
                                 </Link>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>

               {/* modal */}
               <div
                  className={classnames({
                     modal: true,
                     'is-active': isActive
                  })}>
                  <div className="modal-background" />
                  <div className="modal-card">
                     <header className="modal-card-head">
                        <p className="modal-card-title">ลืมรหัสผ่าน</p>
                        <button
                           className="delete"
                           aria-label="close"
                           onClick={e => {
                              e.preventDefault()
                              this.setState({ isActive: !isActive })
                           }}
                        />
                     </header>
                     <section className="modal-card-body">
                        <div className="control">
                           <label style={{ color: 'black' }} htmlFor="email">
                              เราจะส่งรหัสผ่านไปยังอีเมลของท่าน
                           </label>
                           <input
                              className="input"
                              type="text"
                              placeholder="email"
                              name="email"
                              ref="emailtopass"
                           />
                        </div>
                     </section>
                     <footer className="modal-card-foot">
                        <button
                           className={classnames({
                              'button is-success': true,
                              'is-loading': isLoading
                           })}
                           onClick={this.sendForgetPass}>
                           ส่ง
                        </button>
                     </footer>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default connect(state => state)(LoginUser)

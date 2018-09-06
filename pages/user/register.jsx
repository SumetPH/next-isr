import React, { Component } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

// redux
import { connect } from 'react-redux'

class registerUser extends Component {
   // method
   loginUser = e => {
      e.preventDefault()
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
            toast.success('ลงทะเบียนสำเร็จ')
         } else {
            toast.error('ลงทะเบียนไม่สำเร็จ')
            this.refs.form.reset()
         }
      })
   }

   // render
   render() {
      return (
         <div className="hero is-danger is-bold is-fullheight">
            <div className="hero-body">
               <div className="container has-text-centered">
                  <div className="column is-4 is-offset-4">
                     <h3 className="title">Register User</h3>
                     <p className="subtitle" style={{ marginBottom: '70px' }}>
                        Please Register
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
                                    className="button is-danger is-fullwidth">
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

import React, { Component } from "react"
import Router from "next/router"
import axios from "axios"
import { toast } from "react-toastify"

// redux
import { connect } from "react-redux"
import { login } from "../redux/store"

class Login extends Component {
  // method
  login = e => {
    e.preventDefault()
    axios({
      url: "/api/login",
      method: "POST",
      data: {
        username: this.refs.username.value,
        password: this.refs.password.value
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.msg === "success") {
        this.props.dispatch(login())
        Router.push("/list")
        toast("✔️ เข้าสู่ระบบสำเร็จ")
      } else {
        toast("❌ เข้าสู่ระบบไม่สำเร็จ")
        this.refs.form.reset()
      }
    })
  }

  // render
  render() {
    return (
      <div className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title">Login</h3>
              <p className="subtitle" style={{ marginBottom: "70px" }}>
                Please Login
              </p>
              <div className="box animated slideInUp">
                <div>
                  <img
                    className="is-rounded"
                    src="/static/icons/login.png"
                    alt=""
                    width="128px"
                    style={{
                      marginTop: "-70px",
                      marginBottom: "30px"
                    }}
                  />
                </div>
                <form ref="form">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        ref="username"
                        placeholder="Username"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        ref="password"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control" style={{ textAlign: "center" }}>
                      <button
                        onClick={this.login}
                        className="button is-primary is-fullwidth"
                      >
                        Login
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

export default connect(state => state)(Login)

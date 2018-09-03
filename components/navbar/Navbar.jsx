import React, { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import classnames from "classnames"

// redux
import { connect } from "react-redux"
import { logout } from "../../redux/store"

export class Navbar extends Component {
  // state
  state = {
    isActive: false
  }

  // method
  logout = async () => {
    await Router.push("/")
    await this.props.dispatch(logout())
  }

  render() {
    const { color = "is-transparent" } = this.props
    return (
      <nav className={`navbar ${color}`}>
        <div
          className={classnames({
            "navbar-brand": true,
            "is-active": this.state.isActive
          })}
        >
          <span className="navbar-item">
            <img src="/static/icons/isr4b.png" alt="" />
          </span>
          <span
            className="navbar-burger burger"
            data-target="navbarMenuHeroA"
            onClick={() =>
              this.setState({
                isActive: !this.state.isActive
              })
            }
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        <div
          className={classnames({
            "navbar-menu": true,
            "is-active": this.state.isActive
          })}
          id="navbarMenuHeroA"
        >
          <div className="navbar-end">
            <Link href="/">
              <a className="navbar-item">หน้าแรก</a>
            </Link>
            <Link href="/branch/is">
              <a className="navbar-item">สาขาวิชา</a>
            </Link>
            <Link href="/questions">
              <a className="navbar-item">กระทู้ถามตอบ</a>
            </Link>
            <span className="navbar-item">
              {this.props.isAuth ? (
                <button
                  className="button is-warning is-rounded"
                  onClick={this.logout}
                >
                  <span className="icon">
                    <i className="fas fa-key" />
                  </span>
                  <span>
                    <b>Logout</b>
                  </span>
                </button>
              ) : (
                <Link href="/login">
                  <a className="button is-primary is-rounded">
                    <span className="icon">
                      <i className="fas fa-key" />
                    </span>
                    <span>
                      <b>Admin</b>
                    </span>
                  </a>
                </Link>
              )}
            </span>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(state => state)(Navbar)

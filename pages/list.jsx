import React, { Component } from "react"
import Link from "next/link"

// redux
import { connect } from "react-redux"

// component
import Loading from "../components/loading/Loading"
import NoAccess from "../components/noaccess/NoAccess"
import Navbar from "../components/navbar/Navbar"

class List extends Component {
  // state
  state = {
    loadPage: false
  }

  // method
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loadPage: true })
    }, 1000)
  }

  // render
  render() {
    if (!this.state.loadPage) {
      return <Loading />
    }

    if (!this.props.isAuth) {
      return <NoAccess />
    }

    return (
      <div>
        <Navbar color="is-danger" />
        <div className="hero  ">
          <div className="hero-body">
            <div className="container">
              <div className="column">
                <div
                  className="box "
                  style={{
                    textAlign: "center"
                  }}
                >
                  <h5 className="title is-5">ISR4B Mern Stack.</h5>
                </div>
              </div>
              <div className="column">
                <div className="box ">
                  <b>Admin</b>
                  <hr />
                  <p style={{ margin: "1rem" }}>
                    <Link href="/admin/questions">
                      <a>
                        <span className="icon m-5px">
                          <i className="fas fa-question" />
                        </span>
                        Questions Management
                      </a>
                    </Link>
                  </p>
                  <p style={{ margin: "1rem" }}>
                    <Link href="/admin/professor">
                      <a>
                        <span className="icon m-5px">
                          <i className="fas fa-chalkboard-teacher" />
                        </span>
                        Professor Management
                      </a>
                    </Link>
                  </p>
                  <p style={{ margin: "1rem" }}>
                    <Link href="/admin/images">
                      <a>
                        <span className="icon m-5px">
                          <i className="fas fa-images" />
                        </span>
                        Images Management
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(List)

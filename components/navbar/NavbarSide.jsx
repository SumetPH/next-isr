import React, { Component } from "react"
import Link from "next/link"
import classnames from "classnames"

export class Navbar extends Component {
  // state
  state = {
    is: false,
    professor: false,
    lesson: false,
    image: false
  }

  // method
  componentDidMount = () => {
    this.linkActive(window.location.pathname)
    console.log(window.location.pathname)
  }

  linkActive = path => {
    this.setState({ is: false, professor: false, lesson: false })
    if (path === "/branch/is") {
      this.setState({ is: true })
    } else if (path === "/branch/professor") {
      this.setState({ professor: true })
    } else if (path === "/branch/lesson") {
      this.setState({ lesson: true })
    } else if (path === "/branch/image") {
      this.setState({ image: true })
    }
  }

  render() {
    return (
      <div className="n">
        <div className="n-logo">
          <img src="/static/icons/is.png" alt="" />
        </div>
        <div className="n-link-g">
          <Link href="/branch/is">
            <a
              className={classnames({
                "n-link": true,
                "n-link-active": this.state.is
              })}
            >
              <span className="icon">
                <i className="fas fa-code-branch" />
              </span>
            </a>
          </Link>
          <Link href="/branch/professor">
            <a
              className={classnames({
                "n-link": true,
                "n-link-active": this.state.professor
              })}
            >
              <span className="icon">
                <i className="fas fa-chalkboard-teacher" />
              </span>
            </a>
          </Link>
          <Link href="/branch/lesson">
            <a
              className={classnames({
                "n-link": true,
                "n-link-active": this.state.lesson
              })}
            >
              <span className="icon">
                <i className="fas fa-book" />
              </span>
            </a>
          </Link>
          <Link href="/branch/image">
            <a
              className={classnames({
                "n-link": true,
                "n-link-active": this.state.image
              })}
            >
              <span className="icon">
                <i className="fas fa-images" />
              </span>
            </a>
          </Link>
        </div>
        <div className="n-link-g">
          <Link href="/">
            <a className="n-link">
              <span className="icon">
                <i className="fas fa-angle-double-left" />
              </span>
            </a>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar

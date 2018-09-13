import React, { Component } from 'react'
import { Link } from '../../routes'
import classnames from 'classnames'

export class Navbar extends Component {
   // state
   state = {
      is: false,
      instructor: false,
      lesson: false,
      images: false
   }

   // method
   componentDidMount = () => {
      this.linkActive(window.location.pathname)
      console.log(window.location.pathname)
   }

   linkActive = path => {
      this.setState({
         is: false,
         instructor: false,
         lesson: false,
         images: false
      })
      if (path === '/branch/is') {
         this.setState({ is: true })
      } else if (path === '/branch/instructor') {
         this.setState({ instructor: true })
      } else if (path === '/branch/lesson') {
         this.setState({ lesson: true })
      } else if (path === '/branch/images') {
         this.setState({ images: true })
      }
   }

   render() {
      return (
         <div className="n">
            <div className="n-logo">
               <img src="/static/icons/is.png" alt="" />
            </div>
            <div className="n-link-g">
               <Link route="/branch/is">
                  <a
                     className={classnames({
                        'n-link': true,
                        'n-link-active': this.state.is
                     })}>
                     <span className="icon">
                        <i className="fas fa-code-branch" />
                     </span>
                  </a>
               </Link>
               <Link route="/branch/instructor">
                  <a
                     className={classnames({
                        'n-link': true,
                        'n-link-active': this.state.instructor
                     })}>
                     <span className="icon">
                        <i className="fas fa-chalkboard-teacher" />
                     </span>
                  </a>
               </Link>
               <Link route="/branch/lesson">
                  <a
                     className={classnames({
                        'n-link': true,
                        'n-link-active': this.state.lesson
                     })}>
                     <span className="icon">
                        <i className="fas fa-book" />
                     </span>
                  </a>
               </Link>
               <Link route="/branch/images">
                  <a
                     className={classnames({
                        'n-link': true,
                        'n-link-active': this.state.images
                     })}>
                     <span className="icon">
                        <i className="fas fa-images" />
                     </span>
                  </a>
               </Link>
            </div>
            <div className="n-link-g">
               <Link route="/">
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

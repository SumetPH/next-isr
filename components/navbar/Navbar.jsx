import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import classnames from 'classnames'

// redux
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/store'

export class Navbar extends Component {
   // state
   state = {
      isActive: false,
      animate: false
   }

   // method
   componentDidMount = () => {
      this.interval = setInterval(() => {
         this.setState({ animate: !this.state.animate })
      }, 2000)
   }

   componentWillUnmount = () => {
      clearInterval(this.interval)
   }

   logoutUser = async () => {
      await Router.push('/')
      await this.props.dispatch(logoutUser())
   }

   render() {
      const { isAuth, isUser, color = 'is-transparent', logo } = this.props
      const { isActive, animate } = this.state
      return (
         <nav className={`navbar ${color}`}>
            <div
               className={classnames({
                  'navbar-brand': true,
                  'is-active': this.state.isActive
               })}>
               <span className="navbar-item">
                  <img src={logo} alt="" />
               </span>
               <span
                  className="navbar-burger burger"
                  data-target="navbarMenuHeroA"
                  onClick={() =>
                     this.setState({
                        isActive: !isActive
                     })
                  }>
                  <span />
                  <span />
                  <span />
               </span>
            </div>
            <div
               className={classnames({
                  'navbar-menu': true,
                  'is-active': isActive
               })}
               id="navbarMenuHeroA">
               {/* end */}
               <div className="navbar-end">
                  <Link href="/">
                     <a className="navbar-item">หน้าแรก</a>
                  </Link>
                  <Link href="/branch/is">
                     <a
                        className={classnames({
                           'navbar-item': true,
                           'animated flash': animate
                        })}>
                        สาขาวิชา
                     </a>
                  </Link>
                  <Link href="/questions">
                     <a className="navbar-item">กระทู้ถามตอบ</a>
                  </Link>
                  <Link href={isAuth ? '/admin' : '/admin/login'}>
                     <a className="navbar-item">สำหรับผู้ดูแล</a>
                  </Link>
                  <span className="navbar-item">
                     {isUser ? (
                        <button
                           className="button is-warning is-rounded"
                           onClick={this.logoutUser}>
                           <span className="icon">
                              <i className="fas fa-key" />
                           </span>
                           <span>
                              <b>ออกจากระบบ</b>
                           </span>
                        </button>
                     ) : (
                        <Link href="/user/login">
                           <a className="button is-primary is-rounded">
                              <span className="icon">
                                 <i className="fas fa-key" />
                              </span>
                              <span>
                                 <b>เข้าสู่ระบบ</b>
                              </span>
                           </a>
                        </Link>
                     )}
                  </span>
               </div>
               {/* --end-- */}
            </div>
         </nav>
      )
   }
}

export default connect(state => state)(Navbar)

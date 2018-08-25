import React, { Component } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

// redux
import { connect } from 'react-redux'
import { logout } from '../redux/store'

class Index extends Component {
   state = {
      isActive: false,
      animate: true
   }

   componentDidMount = () => {
      this.interval = setInterval(() => {
         this.setState({ animate: !this.state.animate })
      }, 2000)
   }

   componentWillUnmount = () => {
      clearInterval(this.interval)
   }

   logout = () => {
      this.props.dispatch(logout())
   }

   render() {
      return (
         <div>
            <div className="hero is-dark is-fullheight bg">
               <div className="hero-head" style={{ margin: '2rem' }}>
                  <nav className="navbar">
                     <div className="container">
                        <div
                           className={classnames({
                              'navbar-brand': true,
                              'is-active': this.state.isActive
                           })}>
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
                              }>
                              <span />
                              <span />
                              <span />
                           </span>
                        </div>
                        <div
                           className={classnames({
                              'navbar-menu': true,
                              'is-active': this.state.isActive
                           })}
                           id="navbarMenuHeroA">
                           <div className="navbar-end">
                              <a className="navbar-item" href="/">
                                 หน้าแรก
                              </a>
                              <Link href="/is">
                                 <a className="navbar-item">สาขาวิชา</a>
                              </Link>
                              <Link href="/questions">
                                 <a className="navbar-item">กระทู้ถามตอบ</a>
                              </Link>
                              <span className="navbar-item">
                                 {this.props.isAuth ? (
                                    <button
                                       className="button is-warning is-rounded"
                                       onClick={this.logout}>
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
                     </div>
                  </nav>
               </div>
               <div className="hero-body">
                  <div
                     className={classnames({
                        'container has-text-centered': true,
                        'animated pulse': this.state.animate
                     })}>
                     <p className="title is-3">เว็บไซต์ประชาสัมพันธ์</p>
                     <p className="title is-4">
                        โปรแกรมวิชา ระบบสารสนเทศทางคอมพิวเตอร์ พัฒนาซอฟต์แวร์
                     </p>
                     <p className="subtitle is-4">System Infomation.</p>
                  </div>
               </div>
               <div className="foot m-1">
                  <h3 className="animated fadeInLeft delay-1s slow">
                     Power by ISr4B
                  </h3>
               </div>
            </div>
            {/* preload */}
            <div style={{ display: 'none' }}>
               <img src="/static/images/anime.gif" alt="" />
               <img src="/static/icons/login.png" alt="" />
            </div>
            {/* --- */}
         </div>
      )
   }
}
export default connect(state => state)(Index)

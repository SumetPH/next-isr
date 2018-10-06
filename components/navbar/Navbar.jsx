import React, { Component } from 'react'
import { Link } from '../../routes'
import Router from 'next/router'
import classnames from 'classnames'

// redux
import { connect } from 'react-redux'

export class Navbar extends Component {
   // state
   state = {
      isActive: false,
      animate: false,
      logoWhite: '/static/icons/isr4b.png',
      logoBlack: '/static/icons/isr4b-black.png'
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

   render() {
      const { isAdmin, color = 'is-transparent', logo = 'white' } = this.props
      const { isActive, animate, logoWhite, logoBlack } = this.state
      return (
         <nav className={`navbar ${color}`}>
            <div
               className={classnames({
                  'navbar-brand': true,
                  'is-active': this.state.isActive
               })}>
               <span className="navbar-item">
                  <img src={logo === 'black' ? logoBlack : logoWhite} alt="" />
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
                  <Link route="/">
                     <a className="navbar-item">หน้าแรก</a>
                  </Link>
                  <Link route="/is">
                     <a
                        className={classnames({
                           'navbar-item': true,
                           'animated flash': animate
                        })}>
                        ข้อมูลโปรแกรมวิชา
                     </a>
                  </Link>

                  <Link route={isAdmin ? '/admin' : '/admin/login'}>
                     <a className="navbar-item">สำหรับผู้ดูแล</a>
                  </Link>
               </div>
               {/* --end-- */}
            </div>
         </nav>
      )
   }
}

export default connect(state => state)(Navbar)

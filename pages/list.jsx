import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

// redux
import { connect } from 'react-redux'
import { logout } from '../redux/store'

// component
import Loading from '../components/loading/Loading'
import NoAccess from '../components/noaccess/NoAccess'

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

   logout = () => {
      Router.push('/')
      this.props.dispatch(logout())
   }

   // render
   render() {
      return (
         <div>
            {this.state.loadPage ? (
               this.props.isAuth === true ? (
                  <div className="hero is-fullheight list">
                     <div className="hero-head">
                        <div className="container">
                           <div className="column">
                              <div
                                 className="box "
                                 style={{
                                    textAlign: 'center'
                                 }}>
                                 <h1>ISR4B Mern Stack.</h1>
                              </div>
                           </div>
                           <div className="column">
                              <div className="box ">
                                 <h3>Admin</h3>
                                 <hr />
                                 <p className="mb-1">
                                    <Link href="/admin/questions">
                                       <a>- Questions Management</a>
                                    </Link>
                                 </p>
                                 {/* <p className="mb-1">
                                    <Link href="/admin/360">
                                       <a>- Images 360 Management</a>
                                    </Link>
                                 </p> */}
                                 <p className="mb-1">
                                    <Link href="/admin/images">
                                       <a>- Images Management</a>
                                    </Link>
                                 </p>
                              </div>
                           </div>
                           <div className="column has-text-centered">
                              <button
                                 onClick={this.logout}
                                 className="button is-warning">
                                 Logout
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <NoAccess />
               )
            ) : (
               <Loading />
            )}
         </div>
      )
   }
}

export default connect(state => state)(List)

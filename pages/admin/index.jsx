import React, { Component } from 'react'
import { Link } from '../../routes'
import Router from 'next/router'

// redux
import { connect } from 'react-redux'
import { checkAdmin } from '../../redux/store'

// component
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'
import Navbar from '../../components/navbar/Navbar'

class Admin extends Component {
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

   logoutAdmin = async () => {
      await Router.push('/')
      await this.props.dispatch(checkAdmin('logout'))
   }

   // render
   render() {
      // if (!this.state.loadPage) {
      //    return <Loading />
      // }

      if (!this.props.isAdmin) {
         return <NoAccess />
      }

      return (
         <div>
            <Navbar color="is-primary" />
            <div className="hero  ">
               <div className="hero-body">
                  <div className="container">
                     <div className="column">
                        <div
                           className="box "
                           style={{
                              textAlign: 'center'
                           }}>
                           <h5 className="title is-5">ISR4B Mern Stack.</h5>
                        </div>
                     </div>
                     <div className="column">
                        <div className="box ">
                           <b>Admin</b>
                           <hr />
                           <p style={{ margin: '1rem' }}>
                              <Link route="/admin/lesson">
                                 <a>
                                    <span className="icon m-5px">
                                       <i className="fas fa-chalkboard-teacher" />
                                    </span>
                                    เพิ่ม / ลบ หลักสูตร
                                 </a>
                              </Link>
                           </p>
                           <p style={{ margin: '1rem' }}>
                              <Link route="/admin/instructor">
                                 <a>
                                    <span className="icon m-5px">
                                       <i className="fas fa-chalkboard-teacher" />
                                    </span>
                                    เพิ่ม / ลบ อาจารย์
                                 </a>
                              </Link>
                           </p>

                           <p style={{ margin: '1rem' }}>
                              <Link route="/admin/images">
                                 <a>
                                    <span className="icon m-5px">
                                       <i className="fas fa-images" />
                                    </span>
                                    เพิ่ม / ลบ รูปภาพ
                                 </a>
                              </Link>
                           </p>

                           <p style={{ margin: '1rem' }}>
                              <Link route="/admin/image360">
                                 <a>
                                    <span className="icon m-5px">
                                       <i className="fas fa-images" />
                                    </span>
                                    เพิ่ม / ลบ 360 องศา
                                 </a>
                              </Link>
                           </p>
                           <p style={{ margin: '1rem' }}>
                              <Link route="/admin/setting">
                                 <a>
                                    <span className="icon m-5px">
                                       <i className="fas fa-cogs" />
                                    </span>
                                    ตั้งค่าระบบ
                                 </a>
                              </Link>
                           </p>
                        </div>
                     </div>
                     <div className="column">
                        <div
                           className="box"
                           style={{
                              display: 'flex',
                              justifyContent: 'center'
                           }}>
                           <button
                              className="button is-danger"
                              onClick={this.logoutAdmin}>
                              ออกจากระบบ
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default connect(state => state)(Admin)

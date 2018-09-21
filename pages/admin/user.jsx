import React, { Component } from 'react'
import Axios from 'axios'
import classname from 'classnames'

// redux
import { connect } from 'react-redux'

// component
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'

export class user extends Component {
   state = {
      users: [],
      loadPage: false,
      isLoading: {}
   }

   // method
   componentDidMount = () => {
      this.loadUsers()
      setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
   }

   loadUsers = () => {
      Axios.get('/api/user').then(res => {
         console.log(res.data)
         this.setState({ users: res.data.doc })
      })
   }

   deleteUser = id => {
      const { isLoading } = this.state
      isLoading[id] = true
      this.setState({ isLoading })

      Axios({
         url: '/api/user',
         method: 'delete',
         data: { id }
      }).then(res => {
         console.log(res.data)
         this.loadUsers()
      })
   }

   // view
   userList = users => {
      return users.map(item => {
         return (
            <div className="column" key={item._id}>
               <div className="box">
                  <h3>Email : {item.email}</h3>
                  <h3>Username : {item.username}</h3>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                     <button
                        className={classname({
                           'button is-danger is-small': true,
                           'is-loading': this.state.isLoading[item._id]
                        })}
                        onClick={() => this.deleteUser(item._id)}>
                        ลบ
                     </button>
                  </div>
               </div>
            </div>
         )
      })
   }
   render() {
      const { users } = this.state

      if (!this.state.loadPage) {
         return <Loading />
      }

      if (!this.props.isAuth) {
         return <NoAccess />
      }

      return (
         <div className="container">
            <div className="column">
               <div className="box has-text-centered">
                  <h1 className="title is-5">ลบสมาชิก</h1>
               </div>
            </div>
            <div
               className="column"
               style={{
                  display: 'flex',
                  justifyContent: 'center'
               }}>
               <div className="column is-6">{this.userList(users)}</div>
            </div>
         </div>
      )
   }
}

export default connect(state => state)(user)

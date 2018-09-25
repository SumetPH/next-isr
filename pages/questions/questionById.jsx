import React, { Component } from 'react'
import { Link } from '../../routes'
import Router from 'next/router'
import axios from 'axios'
import classNames from 'classnames'

// redux
import { connect } from 'react-redux'
import { logoBlack, logoWhite } from '../../redux/store'

// components
import Loading from '../../components/loading/Loading'
import Navbar from '../../components/navbar/Navbar'
import Goto from '../../components/noaccess/GotoLoginAndRegister'

class Question extends Component {
   static getInitialProps({ query }) {
      return { questionId: query.questionId }
   }

   // state
   state = {
      question: [],
      loadPage: false,
      isLoading: false,
      isDelete: {},
      btnQuestionDel: false
   }

   // method
   componentDidMount = () => {
      this.props.dispatch(logoBlack())
      this.loadQuestion()
   }

   componentWillUnmount = () => {
      this.props.dispatch(logoWhite())
      clearInterval(this.interval)
   }

   loadQuestion = () => {
      const { questionId } = this.props
      axios({
         url: '/api/question/id',
         method: 'post',
         data: { questionId }
      }).then(res => {
         if (res.data.msg === 'Error' || res.data.res === null) {
            return Router.push('/questions')
         }
         this.setState({ question: res.data.question })
      })

      this.interval = setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
   }

   addComment = e => {
      e.preventDefault()

      const { questionId, username } = this.props
      this.setState({ isLoading: true })

      axios({
         url: '/api/answer/create',
         method: 'POST',
         data: {
            questionId: questionId,
            body: this.refs.comment.value,
            username: username,
            created: new Date()
         }
      }).then(res => {
         console.log(res.data)
         this.loadQuestion()
         this.refs.form.reset()
         this.setState({ isLoading: false })
      })
   }

   deleteComment = answerId => {
      const { isDelete } = this.state
      isDelete[answerId] = true
      this.setState({ isDelete })

      axios({
         url: '/api/answer/delete',
         method: 'Delete',
         data: {
            answerId
         }
      }).then(res => {
         console.log(res.data)
         this.loadQuestion()
      })
   }

   questionDel = questionId => {
      this.setState({ btnQuestionDel: true })
      axios({
         url: '/api/question/delete',
         method: 'delete',
         data: { questionId }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            Router.push('/questions')
         }

         this.setState({ btnQuestionDel: false })
      })
   }

   // view
   answersView = (answers = []) => {
      const answersList = answers.map(item => {
         const { _id, username, body, created } = item
         console.log(username, this.props.username)
         return (
            <div key={_id}>
               <p className="animated fadeIn">{body}</p>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'flex-end'
                  }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <small className="animated fadeIn">โดย : {username}</small>
                     <small className="animated fadeIn">
                        โพสต์เมื่อ :{new Date(created).toLocaleDateString()}
                     </small>
                     {this.props.isAuth === true ||
                     this.props.username === username ? (
                        <button
                           className={classNames({
                              'button is-danger is-small': true,
                              'is-loading': this.state.isDelete[_id]
                           })}
                           onClick={() => this.deleteComment(_id)}>
                           Del
                        </button>
                     ) : null}
                  </div>
               </div>
               <hr />
            </div>
         )
      })

      if (answers.length > 0) {
         return (
            <div className="column">
               <div className="box">{answersList}</div>
            </div>
         )
      }
   }

   // render
   render() {
      const { isUser, isAuth, username } = this.props
      const { isLoading, btnQuestionDel } = this.state
      const { _id, title, body, created, answers = [] } = this.state.question

      if (this.state.loadPage === false) {
         return <Loading bg="white" color="black" />
      }

      return (
         <div>
            {/* navbar */}
            <Navbar />
            <div className="container">
               {/* Breadcrumb */}
               <div className="column">
                  <nav className="breadcrumb" aria-label="breadcrumbs">
                     <ul>
                        <span className="icon">
                           <i className="far fa-compass" />
                        </span>
                        <li>
                           <Link route="/questions">
                              <a>คำถาม</a>
                           </Link>
                        </li>
                        <li className="is-active">
                           <a>{title}</a>
                        </li>
                     </ul>
                  </nav>
               </div>
               {/* --- */}
               {/* Question */}
               <div className="column">
                  <div className="box">
                     <b className="animated fadeIn">หัวข้อ : {title}</b>
                     <p className="animated fadeIn">{body}</p>
                     <div
                        className="animated fadeIn"
                        style={{
                           display: 'flex',
                           justifyContent: 'flex-end'
                        }}>
                        <div
                           style={{ display: 'flex', flexDirection: 'column' }}>
                           <small>
                              โพสต์เมื่อ :{' '}
                              {new Date(created).toLocaleDateString()}
                           </small>

                           {isAuth === true ||
                           username === this.state.question.username ? (
                              <button
                                 className={classNames({
                                    'button is-danger is-small': true,
                                    'is-loading': btnQuestionDel
                                 })}
                                 onClick={() => this.questionDel(_id)}>
                                 Del.
                              </button>
                           ) : null}
                        </div>
                     </div>
                  </div>
               </div>
               {/* --- */}

               {/* Answers */}
               {this.answersView(answers)}
               {/* --- */}

               {/* Comment */}
               <div className="column">
                  <label>แสดงความคิดเห็น</label>
                  {isUser ? (
                     <form ref="form">
                        <div className="column">
                           <textarea
                              className="textarea"
                              ref="comment"
                              placeholder="คุณมีความคิดเห็นอย่างไรบ้าง"
                           />
                        </div>
                        <div className="column">
                           <button
                              className={classNames({
                                 button: true,
                                 'is-info': true,
                                 'is-loading': isLoading
                              })}
                              onClick={this.addComment}>
                              โพสต์
                           </button>
                        </div>
                     </form>
                  ) : (
                     <Goto text="เพื่อแสดงความคิดเห็น" />
                  )}
               </div>
               {/* --- */}
            </div>
         </div>
      )
   }
}

export default connect(state => state)(Question)

import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'

// redux
import { connect } from 'react-redux'

// components
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'

class AdminQuestions extends Component {
   // state
   state = {
      questions: [],
      loadPage: false,
      isLoading: {}
   }

   // method
   componentDidMount = () => {
      this.loadQuestions()
   }

   loadQuestions = () => {
      axios.get('/api/question/all').then(res => {
         this.setState({ questions: res.data.res })

         setTimeout(() => {
            this.setState({ loadPage: true })
         }, 1000)
      })
   }

   deteteQuestion = _id => {
      let isLoading = this.state.isLoading
      isLoading[_id] = 'is-loading'
      this.setState({ isLoading })

      axios({
         url: `/api/question/delete/${_id}`,
         method: 'DELETE'
      }).then(res => {
         console.log(res.data)
         this.loadQuestions()
      })
   }

   // view
   questionsList = questions => {
      return questions.map(item => {
         return (
            <tr key={item._id}>
               <td>
                  <Link href={`/question/${item._id}`}>
                     <a>{item.title}</a>
                  </Link>
               </td>
               <td>
                  <button
                     className={`button is-danger is-small ${
                        this.state.isLoading[item._id]
                     }`}
                     onClick={() => this.deteteQuestion(item._id)}>
                     ลบ
                  </button>
               </td>
            </tr>
         )
      })
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
         <div className="container">
            <div className="column" style={{ marginTop: '1rem' }}>
               {/* Questions Admin */}
               <h5 className="title is-5">ลบกระทู้คำถาม</h5>
               <div className="box">
                  <table className="table is-fullwidth is-striped">
                     <thead>
                        <tr>
                           <th>Questions</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {/* questions list */}
                        {this.questionsList(this.state.questions)}
                        {/* --- */}
                     </tbody>
                  </table>
               </div>
               {/* --- */}
            </div>
         </div>
      )
   }
}

export default connect(state => state)(AdminQuestions)

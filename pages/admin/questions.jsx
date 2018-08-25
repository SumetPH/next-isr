import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'

// components
import Loading from '../../components/loading/Loading'

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
         this.setState({ questions: res.data.res, loadPage: true })
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
               <th style={{ paddingLeft: '11%' }}>
                  <Link href={`/question/${item._id}`}>
                     <a>{item.title}</a>
                  </Link>
               </th>
               <th style={{ textAlign: 'center' }}>
                  <button
                     onClick={() => this.deteteQuestion(item._id)}
                     className={`button is-danger ${
                        this.state.isLoading[item._id]
                     }`}>
                     Del.
                  </button>
               </th>
            </tr>
         )
      })
   }

   // render
   render() {
      return (
         <div className="container">
            {/* Loading Page */}
            {this.state.loadPage ? (
               <div className="column">
                  {/* Questions Admin */}
                  <h3>Questions Admin</h3>
                  <table className="table is-fullwidth">
                     <thead>
                        <tr>
                           <th style={{ paddingLeft: '10%' }}>Questions</th>
                           <th
                              style={{
                                 width: '40%',
                                 textAlign: 'center'
                              }}>
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {/* questions list */}
                        {this.questionsList(this.state.questions)}
                        {/* --- */}
                     </tbody>
                  </table>
                  {/* --- */}
               </div>
            ) : (
               <Loading />
            )}
            {/* --- */}
         </div>
      )
   }
}

export default AdminQuestions

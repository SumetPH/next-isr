import React, { Component } from 'react'
import axios from 'axios'

export class Professor extends Component {
   state = {
      professors: []
   }

   // method
   componentDidMount = () => {
      this.loadProfessors()
   }

   loadProfessors = () => {
      axios
         .get('/api/professor/all')
         .then(res => this.setState({ professors: res.data.res }))
   }

   addProfessor = e => {
      e.preventDefault()

      axios({
         method: 'POST',
         url: '/api/professor/post',
         data: {
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value
         }
      }).then(res => {
         console.log(res.data)
         if (res.data.msg === 'Success') {
            this.refs.form.reset()
            this.loadProfessors()
         }
      })
   }

   deleteProfessor = _id => {
      axios({
         method: 'DELETE',
         url: '/api/professor/delete',
         data: {
            _id
         }
      }).then(res => {
         this.loadProfessors()
      })
   }

   // view
   professorList = professors => {
      return professors.map(professor => {
         return (
            <div key={professor._id}>
               {professor.firstname} {professor.lastname}
               <br />
               <button onClick={() => this.deleteProfessor(professor._id)}>
                  Del.
               </button>
               <hr />
            </div>
         )
      })
   }

   render() {
      return (
         <div className="hero">
            <div className="hero-body">
               <div className="container">
                  <div className="column">
                     <h2>อาจารย์ประจำสาขาวิชา</h2>
                     <hr />
                     <div>{this.professorList(this.state.professors)}</div>
                  </div>
                  <div className="column">
                     <form ref="form">
                        <input type="text" ref="firstname" placeholder="ชื่อ" />
                        <input
                           type="text"
                           ref="lastname"
                           placeholder="นามสกุล"
                        />
                        <button onClick={this.addProfessor}>บันทึก</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Professor

import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class instructor extends Component {
   state = {
      instructors: []
   }

   componentDidMount = () => {
      this.loadInstructor()
   }

   loadInstructor = () => {
      Axios.get('/api/instructor/all').then(res => {
         console.log(res.data)
         this.setState({ instructors: res.data.instructors })
      })
   }

   render() {
      const { instructors } = this.state
      const listInstructor = instructors.map(instructor => {
         return (
            <div
               key={instructor._id}
               className="column"
               style={{
                  display: 'flex',
                  justifyContent: 'center'
               }}>
               <Fade left>
                  <div
                     className="column is-8 box has-background-dark"
                     style={{
                        display: 'flex',
                        color: 'white'
                     }}>
                     {instructor.sex === 'ชาย' ? (
                        <img src="/static/icons/boy.png" alt="" />
                     ) : (
                        <img src="/static/icons/girl.png" alt="" />
                     )}
                     <div style={{ paddingLeft: '1rem' }}>
                        <p>{instructor.name}</p>
                        <p>ตำแหน่ง : {instructor.position}</p>
                        <p>
                           <span className="icon">
                              <i className="far fa-envelope" />
                           </span>
                           : {instructor.email}
                        </p>
                        <p>
                           <span className="icon">
                              <i className="fab fa-facebook" />
                           </span>
                           : {instructor.facebook}
                        </p>
                     </div>
                  </div>
               </Fade>
            </div>
         )
      })

      if (instructors.length === 0) {
         return null
      }

      return (
         <div>
            <div className="column ">
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'flex-end'
                  }}>
                  <img src="/static/icons/teacher.png" alt="" />
                  <h3 className="title is-3 has-text-light">อาจารย์</h3>
               </div>
               {listInstructor}
            </div>
            <hr />
         </div>
      )
   }
}

export default instructor

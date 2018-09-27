import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export class lesson extends Component {
   render() {
      return (
         <div className="column">
            <div
               className="column"
               style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
               }}>
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'flex-end'
                  }}>
                  <img src="/static/icons/book.png" alt="" />
                  <h3 className="title is-3 has-text-light">หลักสูตร</h3>
               </div>
            </div>
            <div className="columns">
               <div className="column is-4" />
               <div className="column is-8">
                  <table className="table is-fullwidth is-bordered has-background-dark has-text-light">
                     <thead>
                        <tr>
                           <th style={{ color: 'white' }}>ชื่อวิชา</th>
                           <th style={{ color: 'white' }}>หน่วยกิต</th>
                        </tr>
                     </thead>
                     <tbody>
                        {Array.apply(null, Array(10)).map((item, i) => {
                           return (
                              <tr key={i}>
                                 <Fade>
                                    <td>Abc</td>
                                 </Fade>
                                 <Fade>
                                    <td>3</td>
                                 </Fade>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      )
   }
}

export default lesson

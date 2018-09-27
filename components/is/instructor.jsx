import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export class instructor extends Component {
   render() {
      return (
         <div className="column ">
            <div
               style={{
                  display: 'flex',
                  alignItems: 'flex-end'
               }}>
               <img src="/static/icons/teacher.png" alt="" />
               <h3 className="title is-3 has-text-light">อาจารย์</h3>
            </div>
            {Array.apply(null, Array(5)).map((item, i) => {
               if (i % 2 === 0) {
                  return (
                     <div
                        key={i}
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
                              <img src="/static/icons/girl.png" alt="" />
                              <div style={{ paddingLeft: '1rem' }}>
                                 <p>อาจารย์ xxxx zzzz</p>
                                 <p>ตำแหน่ง abc</p>
                                 <p>
                                    <span className="icon">
                                       <i className="far fa-envelope" />
                                    </span>
                                    : www@gmail.com
                                 </p>
                                 <p>
                                    <span className="icon">
                                       <i className="fab fa-facebook" />
                                    </span>
                                    Facebook : XxzZ
                                 </p>
                              </div>
                           </div>
                        </Fade>
                     </div>
                  )
               } else {
                  return (
                     <div
                        key={i}
                        className="column"
                        style={{
                           display: 'flex',
                           justifyContent: 'center'
                        }}>
                        <Fade right>
                           <div
                              className="column is-8 box has-background-dark"
                              style={{
                                 display: 'flex',
                                 color: 'white'
                              }}>
                              <img src="/static/icons/girl.png" alt="" />
                              <div style={{ paddingLeft: '1rem' }}>
                                 <p>อาจารย์ xxxx zzzz</p>
                                 <p>ตำแหน่ง abc</p>
                                 <p>
                                    <span className="icon">
                                       <i className="far fa-envelope" />
                                    </span>
                                    : www@gmail.com
                                 </p>
                                 <p>
                                    <span className="icon">
                                       <i className="fab fa-facebook" />
                                    </span>
                                    Facebook : XxzZ
                                 </p>
                              </div>
                           </div>
                        </Fade>
                     </div>
                  )
               }
            })}
         </div>
      )
   }
}

export default instructor

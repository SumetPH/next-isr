import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar'
import classnames from 'classnames'
import Typist from 'react-typist'

class Index extends Component {
   render() {
      return (
         <div>
            <div className="hero is-dark is-fullheight bg">
               <div className="hero-head" style={{ margin: '2rem' }}>
                  <Navbar />
               </div>
               <div className="hero-body">
                  <div className="container has-text-centered">
                     <div>
                        <h1>การพัฒนาเว็บไซต์</h1>
                        <Typist
                           avgTypingDelay={80}
                           cursor={{
                              element: ' _',
                              hideWhenDone: true
                           }}
                           onTypingDone={() =>
                              this.setState({ animate: true })
                           }>
                           <span
                              style={{ fontSize: '24px', fontWeight: 'bold' }}>
                              โปรแกรมวิชา ระบบสารสนเทศทางคอมพิวเตอร์
                           </span>

                           <span
                              style={{ fontSize: '24px', fontWeight: 'bold' }}>
                              พัฒนาซอฟต์แวร์ (เทียบโอน)
                           </span>
                        </Typist>
                     </div>
                     <div
                        className="animated fadeIn delay-3s"
                        style={{ marginTop: '1rem' }}>
                        <h3>
                           ด้วย จาวาสคริป เฟรมเวิร์ค (Javascript Framework)
                           <br />
                           Information System.
                        </h3>
                     </div>
                     <p className="subtitle is-5 animated zoomIn delay-1s" />
                  </div>
               </div>
               <div className="hero-foot">
                  <h5
                     className="animated fadeInLeft delay-1s slow"
                     style={{ margin: '1rem' }}>
                     Power by ISr4B
                  </h5>
               </div>
            </div>
            {/* preload */}
            <div style={{ display: 'none' }}>
               <img src="/static/icons/isr4b.png" alt="" />
               <img src="/static/icons/isr4b-black.png" alt="" />
               <img src="/static/icons/login.png" alt="" />
            </div>
            {/* --- */}
         </div>
      )
   }
}
export default Index

import React, { Component } from 'react'
import NavbarSide from '../../components/navbar/NavbarSide'
import Loading from '../../components/loading/Loading'
import Iframe from 'react-iframe'
import Fade from 'react-reveal/Fade'

class Is extends Component {
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

   render() {
      return (
         <div>
            <NavbarSide />
            {this.state.loadPage ? (
               <div className="section-back">
                  <div className="section-front">
                     <div className="container">
                        <div
                           style={{
                              paddingTop: '3.5rem',
                              paddingBottom: '1rem',
                              paddingLeft: '2rem'
                           }}>
                           <h3 className="title is-3 has-text-light">
                              Information System
                           </h3>
                           <h3 className="subtitle is-4 has-text-light animated shake delay-5s">
                              ระบบสาระสนเทศทางคอมพิวเตอร์ พัฒนาซอฟต์แวร์
                           </h3>
                        </div>
                        <div className="columns">
                           <div className="column is-8">
                              <div className="box animated fadeIn slow">
                                 <Iframe
                                    position="static"
                                    width="100%"
                                    height="370px"
                                    url="/panorama/2FeE0Wn.jpg"
                                 />
                                 <p>ห้องเรียน</p>
                              </div>
                           </div>
                           <div className="animated fadeInUp slow delay-1s">
                              <p style={{ padding: '2rem 1rem' }}>
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit. Veniam dolores sunt
                                 molestias, dolor, similique non esse ex
                                 eligendi at odit optio sed, sit assumenda
                                 dolorem placeat ipsam cum. Molestias,
                                 voluptatem?
                              </p>
                           </div>
                        </div>

                        <div className="columns">
                           <div className="column is-5">
                              <Fade left>
                                 <p style={{ padding: '2rem 1rem' }}>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ratione totam asperiores,
                                    explicabo doloribus atque, aliquam beatae
                                    itaque nihil ipsum tempora odio officia?
                                    Corrupti dolorem nihil quia vitae autem illo
                                    nulla!
                                 </p>
                              </Fade>
                           </div>
                           <div className=" column is-7">
                              <div className="box animated fadeIn slow">
                                 <Iframe
                                    position="static"
                                    width="100%"
                                    height="350px"
                                    url="/panorama/hlTIeQH.jpg"
                                 />
                                 <p>ห้องปฏิบัติการทางคอมพิวเตอร์</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <Loading bg="#363636" color="white" zIndex="-1" />
            )}
         </div>
      )
   }
}

export default Is

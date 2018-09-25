import React, { Component } from 'react'
import NavbarSide from '../../components/navbar/NavbarSide'
import Loading from '../../components/loading/Loading'
import Iframe from 'react-iframe'

class Is extends Component {
   // state
   state = {
      loadPage: false,
      local: 'http://localhost:3000'
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
                           className="animated fadeInLeft slow"
                           style={{
                              marginTop: '5rem',
                              marginBottom: '1rem',
                              marginLeft: '2rem'
                           }}>
                           <h3 className="title is-3 has-text-light">
                              Infomation System
                           </h3>
                           <h3 className="subtitle is-5 has-text-light">
                              ระบบสาระสนเทศทางคอมพิวเตอร์ พัฒนาซอฟต์แวร์
                           </h3>
                        </div>
                        <div className="columns">
                           <div className="column is-7">
                              <div className="box animated fadeIn">
                                 <Iframe
                                    position="static"
                                    width="100%"
                                    height="350px"
                                    url="/panorama/2FeE0Wn.jpg"
                                 />
                                 <p>ห้องเรียน</p>
                              </div>
                           </div>
                        </div>
                        <div className="columns">
                           <div className="column is-5" />
                           <div className=" column is-7">
                              <div className="box animated fadeIn">
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

import React, { Component } from 'react'
import NavbarSide from '../../components/navbar/NavbarSide'
import Loading from '../../components/loading/Loading'

class Image extends Component {
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
                     <div
                        className="animated fadeInDown slow"
                        style={{ margin: '5rem' }}>
                        <h3 className="title is-3 has-text-light">Images</h3>
                        <h3 className="subtitle is-5 has-text-light">
                           รูปภาพผลงาน และ กิจกรรมต่างๆ
                        </h3>
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

export default Image

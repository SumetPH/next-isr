import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar'
import Loading from '../components/loading/Loading'
import Axios from 'axios'

import I360 from '../components/is/i360'
import Lesson from '../components/is/lesson'
import Instructor from '../components/is/instructor'
import Image from '../components/is/image'

class Is extends Component {
   // state
   state = {
      loadPage: false,
      image360: [],
      pano: '',
      images: [],
      instructors: [],
      lessons: []
   }

   // method
   componentDidMount = () => {
      this.loadData()
      setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
   }

   loadData = () => {
      try {
         Axios.get('/api/image360/all').then(res => {
            this.setState({ image360: res.data.res, pano: res.data.res[0].src })
         })
         Axios.get('/api/image/all').then(res => {
            this.setState({ images: res.data.res })
         })
         Axios.get('/api/instructor/all').then(res => {
            this.setState({ instructors: res.data.instructors })
         })
         Axios.get('/api/lesson/all').then(res => {
            this.setState({ lessons: res.data.lesson })
         })
      } catch (err) {
         console.log(err)
      }
   }

   render() {
      const {
         loadPage,
         image360,
         pano,
         images,
         instructors,
         lessons
      } = this.state
      return (
         <div>
            {/* <NavbarSide /> */}
            <div className="section-back">
               <Navbar color="is-dark" />
               <div className="section-front">
                  <div className="container">
                     <div
                        className="column has-text-centered"
                        style={{ padding: '5rem' }}>
                        <h3 className="title is-3 has-text-light">
                           Information System
                        </h3>
                        <h3 className="subtitle is-4 has-text-light animated shake delay-5s">
                           ระบบสาระสนเทศทางคอมพิวเตอร์ พัฒนาซอฟต์แวร์ (เทียบโอน)
                        </h3>
                     </div>
                     {loadPage ? (
                        <div>
                           <I360 image360={image360} pano={pano} />
                           <Lesson lessons={lessons} />
                           <Instructor instructors={instructors} />
                           <Image images={images} />
                        </div>
                     ) : (
                        <Loading bg="#363636" color="white" />
                     )}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Is

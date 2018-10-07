import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class Image extends Component {
   // state = {
   //    images: []
   // }

   // componentDidMount = () => {
   //    this.loadImage()
   // }

   // loadImage = () => {
   //    Axios.get('/api/image/all').then(res => {
   //       this.setState({ images: res.data.res })
   //    })
   // }

   render() {
      const { images } = this.props
      const imgList = images.map(item => {
         return (
            <div key={item._id} className="column is-4">
               <Fade>
                  <div className="box">
                     <img src={item.src} alt="" />
                  </div>
               </Fade>
            </div>
         )
      })

      if (images.length === 0) {
         return null
      }

      return (
         <div className="column ">
            <div
               style={{
                  display: 'flex',
                  alignItems: 'flex-end'
               }}>
               <img src="/static/icons/picture.png" alt="" />
               <h3 className="title is-3 has-text-light">รูปภาพ</h3>
            </div>
            <div className="column">
               <div className="columns is-multiline">{imgList}</div>
            </div>
         </div>
      )
   }
}

export default Image

import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class Image extends Component {
   state = {
      images: []
   }

   componentDidMount = () => {
      Axios.get('/api/image/all').then(res => {
         console.log(res.data)
         this.setState({ images: res.data.res })
      })
   }

   render() {
      const imgList = this.state.images.map(item => {
         return (
            <div key={item._id} className="column is-4">
               <Fade>
                  <div className="box">
                     <img src={item.path} alt="" />
                  </div>
               </Fade>
            </div>
         )
      })
      return (
         <div className="column ">
            <div
               style={{
                  display: 'flex',
                  alignItems: 'flex-end'
               }}>
               <img src="/static/icons/picture.png" alt="" />
               <h3 className="title is-3 has-text-light">Images</h3>
            </div>
            <div className="column">
               <div className="columns is-multiline">{imgList}</div>
            </div>
         </div>
      )
   }
}

export default Image

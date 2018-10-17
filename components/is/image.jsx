import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
import classnames from 'classnames'

export class Image extends Component {
   state = {
      isActive: false,
      img: ''
   }

   render() {
      const { images } = this.props
      const imgList = images.map(item => {
         return (
            <div key={item._id} className="column is-4">
               <Zoom>
                  <div className="box">
                     <img
                        onClick={() =>
                           this.setState({ isActive: true, img: item.src })
                        }
                        src={item.src}
                        alt=""
                     />
                  </div>
               </Zoom>
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
            {/* modal */}
            <div
               className={classnames({
                  modal: true,
                  'is-active': this.state.isActive
               })}>
               <div className="modal-background" />
               <div className="modal-content">
                  <p className="image is-4by3">
                     <img src={this.state.img} alt="" />>
                  </p>
               </div>
               <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={() => this.setState({ isActive: false })}
               />
            </div>
         </div>
      )
   }
}

export default Image

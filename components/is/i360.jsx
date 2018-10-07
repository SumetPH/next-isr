import React, { Component } from 'react'
import Iframe from 'react-iframe'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class i360 extends Component {
   state = {
      image360: this.props.image360,
      pano: this.props.pano
   }

   // componentDidMount = () => {
   //    this.loadImage360()
   // }

   // loadImage360 = () => {
   //    try {
   //       Axios.get('/api/image360/all').then(res => {
   //          this.setState({ image360: res.data.res, pano: res.data.res[0].src })
   //       })
   //    } catch (err) {
   //       console.log(err)
   //    }
   // }

   render() {
      if (this.state.image360.length === 0) {
         return null
      }

      const listImage360 = this.state.image360.map(image => {
         return (
            <button
               key={image._id}
               className="button is-primary is-small is-rounded"
               style={{ margin: '0.5rem' }}
               onClick={() => this.setState({ pano: image.src })}>
               {image.filename}
            </button>
         )
      })

      return (
         <div>
            <div className="columns">
               <div className="column is-12">
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '5px'
                     }}>
                     <img src="/static/icons/360-degrees.png" alt="" />
                     <h3 className="title is-4 has-text-light">360 Preview</h3>
                  </div>
                  <div className="box animated fadeIn slow">
                     <Iframe
                        position="static"
                        width="100%"
                        height="400px"
                        url={`/panorama/${this.state.pano}/400px`}
                     />
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center'
                        }}>
                        <b>{'<<'}</b>
                        {listImage360}
                        <b>{'>>'}</b>
                     </div>
                  </div>
               </div>
            </div>
            <hr />
         </div>
      )
   }
}

export default i360

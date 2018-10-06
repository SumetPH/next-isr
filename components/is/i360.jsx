import React, { Component } from 'react'
import Iframe from 'react-iframe'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'

export class i360 extends Component {
   state = {
      image360: [],
      pano: ''
   }

   componentDidMount = () => {
      this.loadImage360()
   }

   loadImage360 = () => {
      Axios.get('/api/image360/all').then(res => {
         console.log(res.data)
         try {
            const { src } = res.data.res[0]
            const srcIndex = src.lastIndexOf('/') + 1
            const pano = src.substr(srcIndex)
            this.setState({ image360: res.data.res, pano: pano })
         } catch (err) {
            console.log(err)
         }
      })
   }

   render() {
      if (this.state.image360.length === 0) {
         return null
      }

      const listImage360 = this.state.image360.map((item, i) => {
         const { src } = item
         const srcIndex = src.lastIndexOf('/') + 1
         const pano = src.substr(srcIndex)
         return (
            <button
               key={i}
               className="button is-primary is-small is-rounded"
               style={{ margin: '0.5rem' }}
               onClick={() => this.setState({ pano })}>
               {item.filename}
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

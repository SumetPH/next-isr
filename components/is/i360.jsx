import React, { Component } from 'react'
import Iframe from 'react-iframe'
import Fade from 'react-reveal/Fade'

export class i360 extends Component {
   state = {
      img: [
         {
            name: 'ห้องเรียน',
            file: 'AAoETw1.jpg'
         }
      ],
      pano: 'AAoETw1.jpg'
   }
   render() {
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
                        {this.state.img.map((item, i) => {
                           return (
                              <button
                                 key={i}
                                 className="button is-primary is-small is-rounded"
                                 style={{ margin: '0.5rem' }}
                                 onClick={() =>
                                    this.setState({ pano: item.file })
                                 }>
                                 {item.name}
                              </button>
                           )
                        })}
                        <b>{'>>'}</b>
                     </div>
                  </div>
               </div>
               {/* <div className="animated fadeInUp slow delay-1s">
                  <p style={{ padding: '2rem 1rem' }}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Veniam dolores sunt molestias, dolor, similique non esse ex
                     eligendi at odit optio sed, sit assumenda dolorem placeat
                     ipsam cum. Molestias, voluptatem?
                  </p>
               </div> */}
            </div>
         </div>
      )
   }
}

export default i360

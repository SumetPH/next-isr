import React, { Component } from 'react'

class Loading extends Component {
   render() {
      return (
         <div className="hero is-fullheight">
            <div className="hero-body">
               <div className="container has-text-centered">
                  <img src="/static/images/anime.gif" width="80px" alt="" />
                  <h3>Loading..</h3>
               </div>
            </div>
         </div>
      )
   }
}

export default Loading

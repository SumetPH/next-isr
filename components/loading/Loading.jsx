import React, { Component } from 'react'

const Loading = ({ bg = 'white', color = 'black', zIndex = 0 }) => {
   return (
      <div
         style={{
            backgroundColor: bg,
            color: color,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: zIndex
         }}>
         <div className="has-text-centered">
            <img src="/static/images/anime.gif" width="100px" alt="" />
            <h3>Loading..</h3>
         </div>
      </div>
   )
}

export default Loading

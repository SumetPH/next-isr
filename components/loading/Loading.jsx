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
            <img
               className="animated bounce infinite"
               src={
                  color === 'black'
                     ? '/static/icons/isr4b-black.png'
                     : '/static/icons/isr4b.png'
               }
               width="100px"
               alt=""
            />
            <div>
               <small>Loading...</small>
            </div>
         </div>
      </div>
   )
}

export default Loading

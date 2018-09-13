import React from 'react'
import { Link } from '../../routes'

const NoAccess = () => {
   return (
      <div className="hero is-fullheight">
         <div className="hero-body">
            <div className="container has-text-centered">
               <h3 className="title is-3">คุณไม่มีสิทธิในการเข้าถึง</h3>
               <Link route="/">
                  <a className="button is-outlined is-danger">
                     กลับไปยังหน้าแรก
                  </a>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default NoAccess

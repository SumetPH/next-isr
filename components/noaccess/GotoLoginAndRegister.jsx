import React from 'react'
import { Link } from '../../routes'

const GotoLoginAndReginter = ({ text, color = 'black' }) => {
   return (
      <div
         style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'center',
            color: color
         }}>
         <Link route="/user/login">
            <a
               className="button is-warning is-small is-rounded"
               style={{ margin: '0 1rem' }}>
               เข้าสู่ระบบ
            </a>
         </Link>
         <span>หรือ</span>
         <Link route="/user/register">
            <a
               className="button is-danger is-small is-rounded"
               style={{ margin: '0 1rem' }}>
               <span>ลงทะเบียน</span>
            </a>
         </Link>
         <span>{text}</span>
      </div>
   )
}

export default GotoLoginAndReginter

import React from 'react'
import Link from 'next/link'

const GotoLoginAndReginter = ({ text, color = 'black' }) => {
   return (
      <div
         style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'center',
            color: color
         }}>
         <Link href="/user/login">
            <a
               className="button is-warning is-small is-rounded"
               style={{ margin: '0 1rem' }}>
               เข้าสู่ระบบ
            </a>
         </Link>
         <span>หรือ</span>
         <Link href="/user/register">
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

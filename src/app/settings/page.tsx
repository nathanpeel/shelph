import React from 'react'
import Navbar from '@/components/navbar'
import Link from 'next/link'

const Settings = () => {
  return (
    <div className='bg-white h-[100vh] text-black'>
      <Navbar current='Settings' />
      <Link href='/login'>Logout</Link>
    </div>
  )
}

export default Settings
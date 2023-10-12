import React, { ReactElement } from 'react'
import Navbar from '@/components/navbar'

const dashboard = (): ReactElement => {
  return (
    <div className='bg-white h-[100vh] text-black'>
      <Navbar current='Home'/>
    </div>
  )
}

export default dashboard
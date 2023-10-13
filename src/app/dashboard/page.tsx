import React, { ReactElement } from 'react'
import Navbar from '@/components/navbar'

const dashboard = (): ReactElement => {
  return (
    <div className='bg-white h-[100vh] text-black'>
      <Navbar current='Home' />
      <p className='text-center text-xl'>Nothing here yet. Come back soon!</p>
    </div>
  )
}

export default dashboard
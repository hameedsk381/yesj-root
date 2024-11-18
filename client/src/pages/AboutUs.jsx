import React from 'react'
import About from '../components/About'
import bannerProgrammes from "../assets/banner-programmes.jpg"

const AboutUs = () => {
  return (
    <div className='bg-[#f9fafc]'>
      <img className='h-[120px] object-cover lg:h-[200px] w-full' src={bannerProgrammes}/>
      <About/>
    </div>
  )
}

export default AboutUs

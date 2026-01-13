import React from 'react'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import ProgramCard from '../../components/ProgramCard'
import Testimonials from '../../components/Testimonials'
import FAQ from '../../components/FAQ'
import Footer from '../../components/Footer'
import CTASection from '../../components/CTASection'

function LandingPage() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <ProgramCard />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
    </> 
  )
}

export default LandingPage
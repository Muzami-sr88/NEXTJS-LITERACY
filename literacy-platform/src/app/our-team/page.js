import Navbar from '@/components/sharedComponents/Navbar'
import Footer from '@/components/sharedComponents/Footer'
import SpecialThanks from '@/components/Pages/StudentAndFaculty/SpecialThanks'
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade'

import React from 'react'

function OurTeam() {
    return (
        <>

            <Navbar />
            <SpecialThanks />

            <PremiumUpgrade />

            <Footer />

        </>
    )
}

export default OurTeam
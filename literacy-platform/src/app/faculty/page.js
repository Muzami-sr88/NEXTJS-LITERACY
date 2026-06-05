import Navbar from '@/components/sharedComponents/Navbar'
import Footer from '@/components/sharedComponents/Footer'
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade'
import Faculty from '@/components/Pages/StudentAndFaculty/Faculty'

import React from 'react'

function FacultyPage() {
    return (
        <>
            <Navbar />

            <Faculty />

            <PremiumUpgrade />

            <Footer />

        </>
    )
}

export default FacultyPage
import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Feature from '../../components/Feature'
import Quiz from '../../components/Quiz'
import Ourquiz from '../../components/Ourquiz'
import AddFeatures from '../../components/AddFeatures'
import Footer from '../../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Feature />
            <Quiz />
            <Ourquiz />
            <AddFeatures />
            <Footer />
        </>
    )
}

export default Home
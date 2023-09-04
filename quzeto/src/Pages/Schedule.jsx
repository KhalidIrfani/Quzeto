import React from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import Schedulequiz from '../components/Schedule/Schedulequiz'
import Dasboard from './Dasboard'

const Schedule = () => {
    return (
        <>
            <Dasboard
                child={
                    <Schedulequiz />
                }
            />


        </>
    )
}

export default Schedule
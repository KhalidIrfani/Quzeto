import React from 'react'
import QuestionAttempt from '../components/Question/QuestionAttempt'
import Dasboard from './Dasboard'

const AttemptQuiz = () => {
    return (
        <>
            <Dasboard
                child={
                    <QuestionAttempt />
                }

            />



        </>
    )
}

export default AttemptQuiz
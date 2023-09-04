import React from 'react'
import QuestionType from '../components/Question/QuestionType'
import Dasboard from './Dasboard'

const QuestionTypes = () => {
    return (
        <>
            <Dasboard
                child={(
                    <QuestionType />

                 )} /> 
        </>
    )
}

export default QuestionTypes
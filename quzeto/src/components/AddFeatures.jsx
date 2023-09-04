import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

const Features = [
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Post Quiz Message"
    },
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Set questions indvidually"
    },
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Set questions from categories"
    },
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Set mark for each question individually"
    },
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Set negative mark for each question individually"
    },
    {
        icons: <BsFillCheckCircleFill className='text-[#00459E]' />,
        details: "Set correct answer and answer explanation while taking quiz"
    }
]

const AddFeatures = () => {
    return (
        <>
            <div className="container">
                <h1 className='md:text-[3.5rem] text-2xl font-normal p-5 md:p-14'>Additonal Key Features</h1>
                <div className="">
                    <p className='md:px-14 px-5 md:tracking-wide text-lg leading-7 space-x-6 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt mollitia quam eum, ea quae asperiores? Aperiam, maxime. Consequuntur ab nihil aperiam, neque consequatur, ducimus officiis voluptate repellat, explicabo non soluta. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt mollitia quam eum, ea quae asperiores? Aperiam, maxime. Consequuntur ab nihil aperiam, neque consequatur, ducimus officiis voluptate repellat, explicabo non soluta.</p>
                </div>
                <div className=" py-10">

                    {Features.map((person, index) => (
                        <div className='flex md:px-14 py-2 px-5 text-lg items-center gap-3 '>
                            {person.icons} {person.details}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default AddFeatures
import React, { useState } from 'react';
import plus from '../../assets/plus.png';
import cross from '../../assets/cross.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const faqQuestion = () => [
    {
        question: "How much time does it take?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        number: "01",
        img: <img src={plus} alt="" className="lg:pl-[15rem]" />,
        imgs: <img src={cross} alt="" className="lg:pl-[14.5rem] " />
    },
    {
        question: "What is your class naming convention ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        number: "02",
        img: <img src={plus} alt="" className="lg:pl-[9.7rem] " />,
        imgs: <img src={cross} alt="" className="lg:pl-[9.4rem]" />
    },
    {
        question: "How do we communicate ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        number: "03",
        img: <img src={plus} alt="" className="lg:pl-[16rem]" />,
        imgs: <img src={cross} alt="" className="lg:pl-[15.5rem]" />
    },
    {
        question: "I have a bigger project. Can you handle it ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        number: "04",
        img: <img src={plus} alt="" className="lg:pl-[8rem]" />,
        imgs: <img src={cross} alt="" className="lg:pl-[8rem]" />
    },
    {
        question: "What is your class naming convention ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        number: "05",
        img: <img src={plus} alt="" className="lg:pl-[9.7rem]" />,
        imgs: <img src={cross} alt="" className="lg:pl-[9.6rem] " />
    }

];

const FAQ = () => {
    const [expandedStates, setExpandedStates] = useState(Array(faqQuestion().length).fill(false));

    const handleToggle = (index) => {
        const updatedStates = expandedStates.map((state, i) => (i === index ? !state : state));
        setExpandedStates(updatedStates);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="py-8">
                    <h1 className='py-3 text-center font-bold text-2xl md:text-[2.4rem]'>Frequently asked questions</h1>
                </div>
            </div>
            <div className="lg:px-40 md:px-20 px-3 py-10">
                {faqQuestion().map((details, index) => (
                    <div className="container border-b-2 py-4" key={index}>
                        <div className="question flex justify-between  items-center  cursor-pointer" onClick={() => handleToggle(index)}>
                            <div className="flex">
                                <span className='text-[#00459E]  font-bold px-2'>{details.number}</span>
                                <h3 className="text-lg font-semibold px-2">{details.question}</h3>
                            </div>
                            <div className="flex justify-end items-center pt-1 ">
                                <span className={expandedStates[index] ? "plus-icon hidden" : "plus-icon mr-2"}>
                                    {details.img}
                                </span>
                                <span className={expandedStates[index] ? "cross-icon ml-2" : "cross-icon hidden"}>
                                    {details.imgs}
                                </span>
                            </div>
                        </div>
                        {expandedStates[index] && (
                            <div className="answer mt-2">
                                <p className='px-[2.7rem]'>{details.answer}</p>
                            </div>
                        )}
                    </div>

                ))}
            </div>
            <Footer />
        </>
    );
};

export default FAQ;

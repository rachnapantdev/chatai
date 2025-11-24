import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper'

const Answers = ({ ans, index, totalResult }) => {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)
    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStars(ans))
        }

    }, [])
    return (
        <>
            {/* {ans} */}
            {
                index == 0 && totalResult>1 ?
                    <span className='text-xl font-bold'>{answer}</span> :
                    heading ? <span className='pt-2 block font-bold'> {answer} </span> : <span className='pl-5'> {answer} </span>
            }
        </>
    )
}

export default Answers

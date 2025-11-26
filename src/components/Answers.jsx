import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const Answers = ({ ans, index, totalResult, type }) => {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)
    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStars(ans))
        }

    }, [])

    // for code

    const renderer = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={dark}
                    PreTag="div"
                />
            ) : (
                <code {...props} className={className}>
                    {children}
                </code>
            );
        },
    };

    return (
        <>
            {/* {ans} */}
            {
                index == 0 && totalResult > 1 ?
                    <span className='text-xl font-bold'>{answer}</span> :
                    heading ? <span className='pt-2 block font-bold'> {answer} </span> :
                        <span className={type == 'q' ? "pl-1" : "pl-5"}>
                            <ReactMarkdown components={renderer} >{answer}</ReactMarkdown>
                        </span>
            }
        </>
    )
}

export default Answers

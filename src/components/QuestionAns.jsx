import Answers from "./Answers"

const QuestionAns = ({val, index}) => {
    console.log(val);
    
    return (
        <>
            <div key={index + Math.random()} className={val.type == "q" ? "flex justify-end " : ""}>
                {val.type == "q" ? <li className='text-right border-8 bg-zinc-700 border-zinc-700 w-fit rounded-tl-3xl  rounded-br-3xl rounded-bl-3xl mr-3'>
                    <Answers ans={val.text} index={index} totalResult={1} type={val.type} /></li> :
                    val.text.map((ansVal, ansIndex) => <li className='text-left' key={ansIndex + Math.random()}>
                        <Answers ans={ansVal} index={ansIndex} totalResult={ansVal.length} type={ansVal.type} /></li>)
                }

            </div>
        </>
    )
}

export default QuestionAns

import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants';
import Answers from './components/Answers';
import RecentSearch from './components/RecentSearch';
import QuestionAns from './components/QuestionAns';

function App() {
  // AIzaSyBZjb42P5hR5MDPu6V3aSwChshXIR5rzSw
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const [recentHistory, setRecentHistory] = useState([])
  const [selectedHistory, setSelectedHistory] = useState("")
  const [loader, setLoder] = useState(false)

  // ✅ Load history on app start
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('history')) || [];
    setRecentHistory(saved);
  }, []);


  useEffect(() => {
    if (selectedHistory) {
      askQuestion(selectedHistory)
      console.log(selectedHistory);
    }
  }, [selectedHistory])

  // for scroll functionality

  const scrollToAns = useRef();

  const askQuestion = async (payloadText) => {
    // e.preventDefault()
    console.log('in ask question');
    console.log(selectedHistory);
    let finalText = payloadText || query;
    if (!finalText) return;


    // e.preventDefault()
    setLoder(true)

    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      history = [query, ...history];
      localStorage.setItem("history", JSON.stringify(history))
      setRecentHistory(history)
    }
    else {
      localStorage.setItem("history", JSON.stringify([query]))
      setRecentHistory([query])

    }

    let payloadData = query ? query : selectedHistory

    let payload = {
      "contents": [
        {
          "parts": [
            {
              "text": payloadData
            }
          ]
        }
      ]
    }


    // console.log(query);
    let resp = await fetch(URL + "AIzaSyBt5IIImtna8CUo_p60QdHcStz7HE6HPKM", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    resp = await resp.json();
    // console.log(resp);

    let dataString = resp.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    console.log(dataString);

    // console.log(resp.candidates[0].content.parts[0].text);
    setResult([...result, { type: 'q', text: query ? query : selectedHistory }, { type: 'a', text: dataString }]);
    setQuery("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 700)

    setLoder(false)

  }
  // console.log(result);

  // Key Enter Functionality

  const isKeyEnter = (event) => {
    console.log(event.key);
    if (event.key == "Enter") {
      askQuestion()
    }

  }


  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        {/* Recent Search Component Starts Here  */}
        <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
        {/* Recent Search Component Ends Here  */}

        <div className='col-span-4 p-10'>

          {/* Gradient Text */}
          <h1 className='text-4xl font-bold text-zinc-400'>
            Hey Techies, I have the Answer of all your Questions
          </h1>

          {/* Loader Starts Here */}
          {
            loader ? <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-neutral-tertiary animate-spin fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : null
          }
          {/* Loader Ends Here */}

          {/* Answers Will Display Here  */}
          <div className="container h-170  overflow-scroll" ref={scrollToAns}>
            <div className='text-zinc-300'>
              <ul>
                {
                  result && result.map((val, index) => {
                    console.log(val)

                    return <QuestionAns val={val} index={index} key={index} />

                  })}

                {/* {
                  result && result.map((val, index) => {
                    return <li className='text-left' key={index + Math.random()}> <Answers ans={val} index={index} totalResult={result.length} /></li>

                  })
                } */}
              </ul>
            </div>
          </div>

          {/* Input for Asking Questions  Starts Here  */}
          <div className='bg-zinc-800 w-1/2 p-1 text-white m-auto rounded-4xl border border-zinc-700 flex h-16 pr-5'>

            <input type="text" className=' w-full h-full p-3 outline-none' placeholder='Ask me Anything'
              onKeyDown={isKeyEnter}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              id='askQuery'
            />
            <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 my-2 rounded-4xl' onClick={askQuestion}> Ask </button>


          </div>
          {/* Input for Asking Questions Ends Here  */}
        </div>
      </div>
    </>
  )
}

export default App

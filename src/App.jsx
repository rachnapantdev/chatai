import { useState } from 'react'
import './App.css'
import { URL } from './constants';
import Answers from './components/Answers';

function App() {
  // AIzaSyBZjb42P5hR5MDPu6V3aSwChshXIR5rzSw
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(undefined)

  let payload = {
    "contents": [
      {
        "parts": [
          {
            "text": query
          }
        ]
      }
    ]
  }
  const askQuestion = async () => {
    console.log(query);
    let resp = await fetch(URL + "AIzaSyBZjb42P5hR5MDPu6V3aSwChshXIR5rzSw", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    resp = await resp.json()
    let dataString = resp.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())
    console.log(dataString);

    console.log(resp.candidates[0].content.parts[0].text);
    setResult(dataString)

  }
  return (
    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-zinc-800'>

        </div>
        <div className='col-span-4 p-10'>
          <div className="container h-170  overflow-scroll">
            <div className='text-zinc-300'>
              <ul>
                {
                  result && result.map((val, index) => {
                    return <li className='text-left' key={index}> <Answers ans={val} index={index} totalResult={result.length} /></li>

                  })
                }
              </ul>
            </div>
          </div>
          <div className='bg-zinc-800 w-1/2 p-1 text-white m-auto rounded-4xl border border-zinc-700 flex h-16 pr-5'>
            <input type="text" className=' w-full h-full p-3 outline-none' placeholder='Ask me Anything' onChange={(e) => setQuery(e.target.value)} value={query} />
            <button onClick={askQuestion}> Ask </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

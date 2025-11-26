import { useEffect } from "react"

const RecentSearch = ({ recentHistory, setRecentHistory, setSelectedHistory }) => {
    const clearHistory = () => {
        if (confirm("Are You Sure ?")) {
            localStorage.removeItem("history")
            // localStorage.clear()
            setRecentHistory([])
        }
    }
  
    return (
        <>
            <div className='col-span-1 bg-zinc-800  pl-5'>
                <h1 className='text-amber-50 text-3xl font-bold my-6 flex justify-center'>
                    <span> Recent Search </span>
                    <button className='text-zinc-50 p-2 cursor-pointer' onClick={clearHistory}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg> </button> </h1>
                <ul className='text-left overflow-auto'>
                    {
                        recentHistory && recentHistory.map((val, index) => {
                          
                            return <li key={index} onClick={() => setSelectedHistory(val)} className='text-zinc-300 p-1 cursor-pointer hover:bg-zinc-700 hover:text-zinc-100 truncate'> {val} </li>
                        }
                        )

                    }
                </ul>
            </div>
        </>
    )
}

export default RecentSearch

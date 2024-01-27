import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]  = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passref = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str = str+"0123456789"
    }

    if(charAllowed){
      str = str + "!@#$%^&*()"
    }

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass = pass + str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  function copyPassword(){
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>passwordGenerator(),[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='wrapper flex justify-center'>
        <div className='card  bg-white w-full max-w-md h-[280px] mt-20 rounded-xl shadow-xl overflow-hidden'>
          <div className=' flex heading text-2xl font-extrabold justify-center mt-5'>
          PASSWORD GENERATOR
          </div>
          <div className='flex justify-start  ml-20 w-48 mt-7 input'>
            <input type="text" 
                    placeholder='Password'
                    className='py-1 px-3 border-2'
                    value={password}
                    readOnly
                    ref={passref}
                    />
            <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-5" onClick={copyPassword}>Copy</button>
          </div>
          <div className=' space-x-2'>
            <input type="range"
                    min={6}
                    max={100}
                    value={length}
                    onChange={(e)=>{setLength(e.target.value)}}
                    className='mt-6 ml-32 mr-0'
                    />
                    <label className='mt-5 mr-4 font-medium' >Length : {length}</label>
            <div>
              <input type="checkbox" 
              className='ml-32 mt-4'
              defaultChecked={numberAllowed} 
              onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
              <label htmlFor='numberInput' className='mt-5 mr-4 font-medium ml-3'>Numbers</label>
            </div>
            <div>
              <input type="checkbox" 
              className='ml-32 mt-4'
              defaultChecked={charAllowed}
              onChange={()=>{setCharAllowed((prev)=>!prev)}} />
              <label htmlFor='ch' className='mt-5 mr-4 font-medium ml-3 mb-10' >Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

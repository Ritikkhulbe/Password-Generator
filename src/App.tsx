import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState<number>(8);
  const [num,setNum] = useState<boolean>(false);
  const [char, setChar] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerate = useCallback(()=>{
    let pass:string = "";
    let str: string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsaxzcvbnm";
    if(num) str += "0123456789";
    if(char) str += "!@#$%^&*(){}~+=";

    for(let i = 0; i < length; i++){
      let s:number = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(s);
    }

    setPassword(pass);
    
  }, [length, num, char, setPassword]);

  useEffect(()=>{
    passwordGenerate();
  }, [length, num, char, setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      <center>
        <div className="bg-gray-800 flex flex-col w-full max-w-md p-6 m-6 rounded-xl">
          <h1 className="text-3xl mt-4">Generate Password</h1>
          <div>
            <input type="text" ref={passwordRef} value={password} className="bg-white mt-4 w-100 py-1 px-3 rounded-sm text-orange-400" placeholder='password' readOnly/>
            <button className="bg-blue-400 py-1 px-3 rounded-sm" onClick={copyToClipboard}>copy</button>
          </div>
          <div className="flex justify-center text-orange-400">
            <input type="range" min={4} max={30} value={length} className="cursor-pointer "
            onChange={(e)=>setLength(Number(e.target.value))}/>
            <label className="m-2">Length : {length}</label>
            <input type="checkbox" id="numInput" defaultChecked={num} onChange={() => setNum(prev => !prev)}/>
            <label htmlFor="numInput" className="m-2">Number</label>
            <input type="checkbox" id="charInput" defaultChecked={char} onChange={() => setChar(prev => !prev)}/>
            <label htmlFor="charInput" className="m-2">Char</label>
            
          </div>
        </div>
      </center>
    </>
  )
}

export default App;
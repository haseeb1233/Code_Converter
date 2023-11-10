import React, { useState } from 'react';
import {Editor} from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import './CodeConverter.css';
import Push from './Push';


function CodeConverter() {
  const[close,setClose]=useState(false)
  const handleClose=()=>{
   if(close){
    setClose(false)
   }else{
    setClose(true)
   }
      
    
  }
  const{id}=useParams()
  console.log(id)
    const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [gitusername,setGitusername]=useState("")
  const [gitemail,setGitemail]=useState("")
const [target_language,setTarget_language]=useState("")
const[convert,setConvert]=useState(false)
const[debug,setDebug]=useState(false)
const[quality,setQuality]=useState(false)
const [selectedLanguage, setSelectedLanguage] = useState('javascript');

if(id){
  fetch("https://api.github.com/user/emails", {
  headers : {
      Authorization : `Bearer ${id}`
  }
})
.then((res) => res.json())
.then((data)=>{
  setGitemail(data[0].email)
})
.catch((err) => console.log(err))
}

fetch("https://api.github.com/user", {
  headers : {
      Authorization : `Bearer ${id}`
  }
})
.then((res) => res.json())
.then((data)=>{
setGitusername(data.login)
})
.catch((err) => console.log(err))

const handleLanguageChange = (e) => {
  setSelectedLanguage(e.target.value);
};
  
const handleEditorChange = (newValue) => {
  setInputCode(newValue);
};


const handleConvert = async (e) => {
    e.preventDefault();
    setOutputCode("")
    setConvert(true)
    setDebug(false)
    setQuality(false)
    let obj={
        source_language:inputCode,
        target_language:target_language
    }
    const response = await fetch("https://codeconverter-no37.onrender.com/convert",{
method:"POST",
body:JSON.stringify(obj),
headers:{
 "content-type":"application/json"
}
})
let res = await response.json()

setOutputCode(res)
}


const handleDebug = async (e) => {
    e.preventDefault();
    setOutputCode("")
    setConvert(false)
    setDebug(true)
    setQuality(false)
    let obj={
        source_language:inputCode,
    }
    const response = await fetch("https://codeconverter-no37.onrender.com/debug",{
method:"POST",
body:JSON.stringify(obj),
headers:{
 "content-type":"application/json"
}
})
let res = await response.json()

console.log(res)
setOutputCode(res)
}
const handleQuality = async (e) => {
    e.preventDefault();
    setOutputCode("")
    setConvert(false)
    setDebug(false)
    setQuality(true)
    let obj={
        source_language:inputCode,
    }
    const response = await fetch("https://codeconverter-no37.onrender.com/quality",{
method:"POST",
body:JSON.stringify(obj),
headers:{
 "content-type":"application/json"
}
})
let res = await response.json()

console.log(res)
setOutputCode(res)
}

const btnfunctn=()=>{
    if(convert){
        return"//Converted code will be displayed here..."
    }else if(debug){
        return "//debuged code will be displayed here..."
    }else if(quality){
        return "//code quality will be displayed here..."
    }else{
        return "//Output will be displayed here..."
    }
}

  return (
    <div id='main'>
       <div id="logindetails">
       <h1 id="title">Code Converter App</h1>
       <p>{gitemail}</p>
       </div>
    <nav className="navbar">
    <select onChange={handleLanguageChange}>
       {/* Populate select options */}
       <option value="">Select Your Language</option>
       <option value="Javascript">JavaScript</option>
       <option value="Python">Python</option>
       <option value="Java">Java</option>
       <option value="Typescript">Typescript</option>
       {/* Add more options */}
     </select>
     <select onChange={(e) => setTarget_language(e.target.value)}>
       {/* Populate select options */}
       <option value="">Select Language to convert</option>
       <option value="Javascript">JavaScript</option>
       <option value="Python">Python</option>
       <option value="Java">Java</option>
       <option value="Typescript">Typescript</option>
       {/* Add more options */}
     </select>
     <button onClick={handleConvert}>Convert</button>
     <button onClick={handleDebug}>Debug</button>
     <button onClick={handleQuality}>Quality Check</button>
   </nav>
    <div className="code-converter">
    <div className="code-textarea">
      <h2>Input Code</h2>
      <Editor className="editor-container" height="90vh" defaultLanguage={selectedLanguage} defaultValue={inputCode} 
      value={inputCode} // Set the value from state
      onChange={handleEditorChange}
      />;
    </div>
    <div className="code-textarea">
      <div id='pushcodebtn'>
      <h2>Output Code</h2>
      <button onClick={handleClose} >push code</button>
      </div>
      <textarea
        rows="10"
        readOnly
        value={outputCode}
        placeholder={btnfunctn()}
      />
    </div>
  </div>
   {close && <Push handleClose={handleClose} id={id} gitusername={gitusername} outputCode={outputCode}/>}
    </div>
  )
}

export default CodeConverter

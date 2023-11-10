import React, { useState ,useEffect} from 'react'
import "./Push.css"
function Push({handleClose,id,gitusername,outputCode}) {
    
    const [selectrepo,setSelectrepo]=useState("")
    const [branchname,setBranchName]=useState("")
    const [filename,setFileName]=useState("")
    const [commitmessage,setCommitmessage]=useState("")

    const [repo,setRepo]=useState([])
   
    useEffect(()=>{
        fetch("https://codeconverter-no37.onrender.com/repo",{
            method:"POST",
       body:JSON.stringify({username:gitusername}),
      headers:{
     "content-type":"application/json"
    }
        })
        .then(res=>res.json())
        .then((data)=>{
            setRepo(data)
        })
    
    },[])
let obj={
    "repoOwner":gitusername, 
    "repoName":selectrepo, 
    "branchName":branchname, 
    "code":outputCode,
    "path":filename,
   "Commit_message":commitmessage
}
console.log(obj)
const handlePush=(e)=>{
    e.preventDefault()
    let obj={
        "repoOwner":gitusername, 
        "repoName":selectrepo, 
        "branchName":branchname, 
        "code":outputCode,
        "path":filename,
       "Commit_message":commitmessage
    }
        fetch("https://codeconverter-no37.onrender.com/api/push-to-github",{
        method:"POST",
   body:JSON.stringify(obj),
  headers:{
 "content-type":"application/json"
}
    })
    .then(res=>res.json())
    .then((data)=>{
        alert(data.success)
    })
    
}
  return (
    <div id='mainpush'>
        <div id='container'>
            <p onClick={handleClose}>close</p>
        </div>
      <form action="" id='form' onSubmit={handlePush}>
        <select name="" id="" onChange={(e)=>{
            setSelectrepo(e.target.value)
        }}>
           { repo.map((ele,index) =>(
           
             <option value={ele} key={index}>{ele}</option>
           ))}
           
        </select>
        <input type="text" placeholder='Enter the branch name' onChange={(e)=>{
            setBranchName(e.target.value)
        }}/>
        <input type="text"placeholder='Enter file name' onChange={(e)=>{
            setFileName(e.target.value)
        }}/>
        <input type="text" placeholder='Enter the commit message' onChange={(e)=>{
            setCommitmessage(e.target.value)
        }} />
        <input id='submitinpt' type="submit" value="Push code" />
      </form>
    </div>
  )
}

export default Push


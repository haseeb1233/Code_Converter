import React from 'react'
import "./Githuboauth.css"

function Githuboauth() {
    
  return (
    <div id="login">
<h1>Welcom to Code Coverter App</h1>
<a href="https://github.com/login/oauth/authorize?client_id=5cb57a62cfff9a335eb4&scope=user:email" ><button>Login with Github</button></a>
    </div>
  )
}

export default Githuboauth

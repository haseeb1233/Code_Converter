require("dotenv").config()
const express = require('express');
const axios = require('axios');
const cors=require("cors")
const app=express()
const port=process.env.port


app.use(express.json())
app.use(cors())

const apiKey =process.env.API_KEY
const openaiEndpoint=process.env.OPENAI_URL


app.get("/",(req,res)=>{
  res.send("Welcome To code Converter app")
})

// Function to interact with ChatOpenAI


const generate = async (prompt) => {
  try {
    const response = await axios.post(openaiEndpoint, {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

   return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    return error.message
  }
};


// api request
// covert code
  app.post("/convert", async(req,res)=>{
    const {source_language,target_language}=req.body

    const prompt=`Convert the following code from ${source_language} to ${target_language} give only target_language`

    try {
        
        const content= await generate(prompt);

        res.json(content)

    } catch (error) {
        res.status(500).json({ error: 'Error processing the question' });
    }

  })

//   debug code
app.post("/debug", async(req,res)=>{
    const {source_language}=req.body

    const prompt=`find the issues in the code ${source_language} suggesting fixes give it as point, and finally presenting the corrected code to the user.`

    try {
        
        const content= await generate(prompt);

        res.json(content)

    } catch (error) {
        res.status(500).json({ error: 'Error processing the question' });
    }

  })

//   quality check
app.post("/quality", async(req,res)=>{
    const {source_language}=req.body

    const prompt=`Please provide a code quality assessment for the given ${source_language}. Consider the following parameters:

    1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting.
    2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.
    3. Code Documentation: Review the code for appropriate comments, inline documentation, and clear explanations of complex logic.
    4. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms.
    5. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability.
    6. Code Modularity: Assess the code for modular design, separation of concerns, and reusability of components.
    7. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells.
    8. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability.
    9. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices.
    
    Please provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.
    `

    try {
        
        const content= await generate(prompt);

        res.json(content)

    } catch (error) {
        res.status(500).json({ error: 'Error processing the question' });
    }

  })


// connect to server
  app.listen(port,()=>{
    console.log(`server is running on ${port}`)
  })

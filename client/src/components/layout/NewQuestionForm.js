import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ErrorList from "./ErrorList.js"

const NewQuestionForm = (props) => {
  const [errors, setErrors] = useState([])
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    correct: "",
    wrong1: "",
    wrong2: "",
    imbdId: "",
  })

  const handleInputChange = event => {
    setNewQuestion({
      ...newQuestion,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await postQuestion(newQuestion)
    if(success){
      clearForm()
    }
  }

  const clearForm = () =>{
    setNewQuestion({
      prompt: "",
      correct: "",
      wrong1: "",
      wrong2: "",
      imbdId: "",
    })
  }

  const postQuestion = async (newQuestion) =>{
    try {
      const response = await fetch(`/api/v1/questions`, {
        method:"POST",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(newQuestion),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
          const newErrors = translateServerErrors(responseBody.errors)
          setErrors(newErrors)
        } else{
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  return(

    <div>
      <ErrorList errors={errors}/>
      <div className="callout form">
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">
          Prompt:
          <input
            type="text"
            id="prompt"
            name="prompt"
            onChange={handleInputChange}
            value={newQuestion.prompt}/>
        </label>

        <label htmlFor="correct">
          Correct Answer:
          <input
            type="text"
            id="correct"
            name="correct"
            onChange={handleInputChange}
            value={newQuestion.correct}/>
        </label>
        
        <label htmlFor="wrong1">
          First Wrong Answer:
          <input
            type="text"
            id="wrong1"
            name="wrong1"
            onChange={handleInputChange}
            value={newQuestion.wrong1}/>
        </label>

        <label htmlFor="wrong2">
          Second Wrong Answer:
          <input
            type="text"
            id="wrong2"
            name="wrong2"
            onChange={handleInputChange}
            value={newQuestion.wrong2}/>
        </label>

        <label htmlFor="imbdId">
          Please enter the imbd Id of the movie this question is about
          <input
            type="text"
            id="imbdId"
            name="imbdId"
            onChange={handleInputChange}
            value={newQuestion.imbdId}/>
        </label>

        <input className="submit-button" type="submit"/>
      </form>
    </div>
  </div>
  )

}

export default NewQuestionForm
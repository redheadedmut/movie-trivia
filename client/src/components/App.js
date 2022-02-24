import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MainPage from "./layout/MainPage";
import NewQuestionForm from "./layout/NewQuestionForm.js";
import Leaderboard from "./layout/Leaderboard";
import TriviaLogic from "./layout/TriviaLogic";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [questions, setQuestions] = useState([])
  const [movies, setMovies] = useState([])

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  let randomize = (ar, n) => {
    let arr = ar
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr)
    return arr
  }
  let randomizedQuestions = randomize(questions, questions?.length)

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/v1/questions`)
      const body = await response.json()
      const questionArr = body.questions
      setQuestions(questionArr)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`/api/v1/movies`)
      const body = await response.json()
      const movieArr = body.movies
      setMovies(movieArr)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchMovies()
    fetchCurrentUser()
  }, [])
 
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>

        <Route exact path="/">
          <MainPage/>
        </Route>
        <Route exact path="/new">
          <NewQuestionForm/>
        </Route>
        <Route exact path="/leaderboard">
          <Leaderboard/>
        </Route>
        <Route exact path="/trivia">
          <TriviaLogic questions = {randomizedQuestions} movies = {movies} randomize ={randomize} user ={currentUser}/>
        </Route>

        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);

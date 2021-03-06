import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import imbdRouter from "./api/imbdRouter.js";
import moviesRouter from "./api/v1/moviesRouter.js";
import questionsRouter from "./api/v1/questionsRouter.js";
import gamesRouter from "./api/v1/gamesRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/externalmovies", imbdRouter)
rootRouter.use("/api/v1/movies", moviesRouter )
rootRouter.use("/api/v1/questions", questionsRouter )
rootRouter.use("/api/v1/games", gamesRouter )



export default rootRouter;

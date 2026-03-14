import express from "express"
import cookieParser from "cookie-parser" 
const app=express()
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
app.use("/api/users",userRouter)

import CounsellorRoutes from './routes/counsellor.routes.js'
app.use("/api/counsellor",CounsellorRoutes)

import adminRoutes from './routes/admin.routes.js'
app.use("/api/admin",adminRoutes);


export default app;
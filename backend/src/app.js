import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const dataLimit="16kb"
const app=express();

//use method for middleware creation and globally using them in each endpoint

app.use(cors({
    origin:"*" //options(settings) origin....whitelistings
}))   
app.use(express.json({limit:dataLimit}))    //earlier we use body parser for this json conversion of datas

//generally url are with different literals like %-... to encode that we have to do an configuration
app.use(express.urlencoded({extended:true,limit:dataLimit})) //entended for getting nested objects also
app.use(express.static("public")) //for static files
app.use(cookieParser())






export {app};


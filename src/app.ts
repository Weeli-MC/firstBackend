import express from "express"
import { sequelize } from "./database"
import router from "./routes/employees";

const app = express()

app.use(express.json())
app.use('/employees', router);


app.listen(8080, ()=>{
    console.log("App is running at http://localhost:8080")
    sequelize.authenticate().then(async()=>{

        try{
            await sequelize.sync({force: true})
        }catch(error){
            console.log("HERE")
        }
        console.log("database connected")
    }).catch((e: Error)=>{
        console.log(e.message)
    })
})
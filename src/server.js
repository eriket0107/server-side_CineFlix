require('express-async-errors')

const express = require('express');
const AppError = require('./utils/AppError');
const cors = require('cors')
const uploadConfig = require('./config/upload')

const routes = require('./routes')


const app = express()


app.use(express.json())
app.use(cors())


app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)


app.use((error, req, res, next)=>{
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  
  console.log(error)
  
  return res.status(500).json({
    status: "error",
    message: "Internal server"
  })
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
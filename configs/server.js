'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import { swaggerDocs, swaggerUi } from "./swagger.js/index.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app)=>{

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}

const conectDataBase = async () => {
    try {
        await dbConnection()
    } catch (error) {
        console.log(`Data Base Connection  Has Failed: ${error}`)
        process.exit(1)
    }
}

export const initServer = () => {

    const app = express()
    try {
        middlewares(app)
        conectDataBase()
        routes(app)
        const port = process.env.PORT || 3002
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(`Error occurred: ${error.message}`)
    }
}
import http from 'http'
import serverConfig from './config/expressConfig'
import * as process from 'process'
import { mongooseConnect } from './config/mongooseConfig'

require('dotenv').config()

const port = process.env.PORT || 3000
;(async () => {
    const app = await serverConfig()

    // getting the dialect from .env file
    if (!process.env.DB_DIALECT) {
        throw new Error('DB_DIALECT not found in .env file')
    }


    // Connect to the database
        try {
            await mongooseConnect()
        } catch (err) {
            console.error('Unable to connect to the database:', err)
            throw err
        }
    // Create an HTTP server instance
    const httpServer = http.createServer(app)


    // Start listening for HTTP requests
    httpServer.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
})()

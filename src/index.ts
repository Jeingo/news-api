import { server } from './app'
import { settings } from './settings/setting'
import { runDb } from './db/db'

const PORT = settings.PORT

const startApp = async () => {
    await runDb()
    server.listen(PORT, () => {
        console.log(`Server is starting on port: ${PORT}`)
    })
}

startApp()

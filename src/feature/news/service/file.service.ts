import { v4 } from 'uuid'
import path from 'path'
import { UploadedFile } from 'express-fileupload'

class FileService {
    async saveFile(file: UploadedFile) {
        try {
            const type = file.name.split('.')[1]
            const fileName = v4() + '.' + type
            const filePath = path.resolve('public', fileName)
            await file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e)
        }
    }
}

export const fileService = new FileService()

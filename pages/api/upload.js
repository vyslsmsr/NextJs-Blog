import formidable from 'formidable'
import {join, resolve} from 'path'
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function Upload(req, res) {
    const optinos = {
        uploadDir: join(resolve(), '/public/images'),
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10mb
        maxFieldsSize: 10 * 1024* 1024, // 10mb
        filename: function(name, ext, part, form) {
            return name + ext
        }
    }
    const form = new formidable.IncomingForm(optinos)
    form.parse(req, async function(err, fields, files) {
        if(err) {
            console.log(err)
        }
        console.log(fields)
    })
}
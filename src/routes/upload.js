/* The upload endpoint */
import path from 'path';
import {FileUploadServer} from '$lib/FileUploadServer.js';

const staticPath = path.resolve('./static');

/* The POST request */
export async function post ({body}) {
    /* The file upload utility */
    const fileUpload = new FileUploadServer(body);
    /* Writes the file on disk */
    await fileUpload.writeToDisk(staticPath)
    .catch(err => {
        return {
            status: 500,
            err: err,
            statusText: err + '',
        };
    });
    /* Returns the result */
    return {
        status: 200,
        headers: {
            'content-type': 'text/plain',
        },
        body: 'done',
    };
}

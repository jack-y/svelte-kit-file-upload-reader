/* The file upload utility class (server side) */
import fs from 'fs-extra';
import {FileUpload} from './FileUpload.mjs';

class FileUploadServer extends FileUpload {
    /* The class constructor */
    constructor (...args) {
        super(...args);
    }

    /* Writes this file content to disk */
    writeToDisk (staticPath) {
        return new Promise((resolve, reject) => {
            /* Retrieves the data */
            const fileContent = this.decode(); // this.content is Base64 encoded. See the FileUploadClient class.
            /* Be sure that the directory exists, otherwise creates it */
            fs.ensureDir(this.getFullPath(staticPath))
            /* Writes on disk */
            .then(() => fs.writeFile(this.getFullFile(staticPath), fileContent))
            /* Returns the result */
            .then(() => resolve('done'))
            .catch(err => reject(err));
        });
    };

}

export {FileUploadServer};

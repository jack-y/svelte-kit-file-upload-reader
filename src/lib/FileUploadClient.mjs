/* The file upload utility class (client side) */
import {FileUpload} from '$lib/FileUpload.mjs';

class FileUploadClient extends FileUpload {
    /* The class constructor */
    constructor (...args) {
        super(...args);
    }

    /* Updates this content from an HTML input File */
    fromFile (aFile) {
        return new Promise((resolve, reject) => {
            /* Reads the file content with FileReader */
            let reader = new FileReader();
            /* The reader onload event */
            reader.onload = () => {
                const content = reader.result + ''; // content = base64 encoded
                /* Removes the Data-URL declaration */
                // see: https://deliciousbrains.com/using-javascript-file-api-to-avoid-file-upload-limits/
                this.content = content.split(',').pop();
                return resolve(this);
            };
            /* The reader onerror event */
            reader.onerror = () => {
                return reject(reader.error);
            };
            /* Starts the reader */
            // see: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
            reader.readAsDataURL(aFile);
        });
    };
}

export {FileUploadClient};

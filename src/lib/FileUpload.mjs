/* The file upload utility class */
import base64js from 'base64-js';

class FileUpload {
    /* The class constructor */
    constructor (...args) {
        /* Sets the defaults */
        let defaults = {
            content: '', // base64 encoded
            name: '',
            path: '',
        };
        let values = Object.assign(defaults, ...args);
        /* Public variables (values clones) */
        this.content = values.content + '';
        this.name = values.name + '';
        this.path = values.path + '';
    }

    /* Checks if the values are OK */
    check () {
        return (this.content && this.content.trim() > '') &&
            (this.name && this.name.trim() > '');
    }

    /* Returns this content decoded from base64 */
    decode () {
        return base64js.toByteArray(this.content)
    }

    /* Gets this full file path and name */
    getFullFile (staticPath) {
        const fullPath = this.getFullPath(staticPath);
        return fullPath + (fullPath.endsWith('/') ? '' : '/') + this.name;
    }

    /* Gets this full path */
    getFullPath (staticPath) {
        return staticPath +
            (staticPath.endsWith('/') ? '' : '/') +
            (this.path.startsWith('/') ? this.path.substring(1) : this.path);
    }
}

export {FileUpload};


const configuration = require('./cloud_config');
const cloudinary = require('cloudinary').v2;
const path = require('path');
cloudinary.config(configuration.cloudinary);

export class FileUploader {


    constructor(ctx) {
        this._acl = null;

        // cloudinary configuration

        // initialize file 
        this._file = null;

        this._ctx = ctx;
    }

 

    async _createBuffer() {
        return new Promise((resolve, reject) => {
            fs.readFile(this._file.path, (error, buffer) => {
                if (error) {
                    reject(error);
                }
                resolve(buffer);
            })
        })
    }

    _validFile(file) {
        if (!file || file.size < 100) {
            throw new Error('File invalid file or file too small');

        }

        /**
         * add your custom validation here for the files being uploaded
         */
    }

    _response(path, meta) {
        try {
            this._ctx.response.status = 201;
        } catch (e) {
            console.log(e);
            this._ctx.status(201);
        }
        return {
            path,
            meta
        }
    }

    async _uploadCloudinary() {
        //validate your file before starting uploading
        this._validFile(this._file);
        let response = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload(this._file.path, (error, res) => {
                if (error) {
                    reject(error);

                }
                resolve(res);
            });

        });

        if (!response || !response.public_id) {
            throw new Error('Cloudinary upload failed');
        }

        return this._response(response.url, response);
    }




    /**
     * @param {'CLOUDINDARY',} type
     */
    async upload(type) {
        if (type === 'CLOUDINARY') {
            return await this._uploadCloudinary();
        }  
        return 'Available upload type are CLOUDINARY | S3 | FILESYSTEM';
    }

    set file(file) {
        this._validFile(file);
        this._file = file;
    }

    set acl(acl) {
        this._acl = acl;
    }
}
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { extname } = require("path");
const { v4 } = require("uuid");

const STORAGE_PATH = "public/storage";

module.exports = {
    /**
     * check file extension
     * @param {object} file
     * @param {array} extensions
     * @returns
     */
    checkExtension: (file, extensions) => {
        /*  Get the extension of the uploaded file   */
        const file_extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

        let lowerCaseExtension = file_extension.toLowerCase();
        /* Check if the uploaded file is allowed   */
        if (!extensions.includes(lowerCaseExtension)) {
            return false;
        }
        return true;
    },

    /**
     * check file size
     * @param {object} file
     * @param {number} allowed_file_size // In MB
     */
    checkMaxFileSize: (file, allowed_file_size) => {
        const mb = file.size / 1000000; // byte / megabyte
        if (mb > allowed_file_size) {
            return false;
        }
        return true;
    },

    /**
     * upload file
     * @param dir
     * @param file
     * @returns
     */
    uploadFile: (dir, file) => {
        const storageDirExists = existsSync(STORAGE_PATH);
        if (!storageDirExists) {
            mkdirSync(STORAGE_PATH);
        }

        const randomName = v4();
        const fileName = `${dir}/${randomName}${extname(file.name)}`;

        const exists = existsSync(`${STORAGE_PATH}/${dir}`);
        if (!exists) {
            mkdirSync(`${STORAGE_PATH}/${dir}`);
        }
        writeFileSync(`${STORAGE_PATH}/${fileName}`, file.data);

        return fileName;
    },

    exportsDocuments: (dir, file) => {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
        const fileName = `${dir}/${randomName}${"registeredUserData"}${extname(file.name)}`;
        console.log("fileName", fileName);

        const storageDirExists = existsSync(STORAGE_PATH);
        if (!storageDirExists) mkdirSync(STORAGE_PATH);

        const exists = existsSync(`${STORAGE_PATH}/${dir}`);
        if (!exists) mkdirSync(`${STORAGE_PATH}/${dir}`);

        const path = `${STORAGE_PATH}/${fileName}`;

        return path;
    },

    /**
     * delete file
     * @param {string} file
     * @returns
     */
    deleteFile: (file) => {
        const path = `./${STORAGE_PATH}/${file}`;
        if (existsSync(path)) {
            unlinkSync(path);
        }
        return true;
    },

    /**
     * get storage url
     * @param file
     * @returns
     */
    castToStorage: (file) => {
        return `${process.env.DOMAIN_URL}/storage/${file}`;
    },
};

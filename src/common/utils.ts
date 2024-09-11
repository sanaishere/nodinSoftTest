import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new HttpException('Only image files are allowed!',HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};

export const fileName = (req, file, callback) => {
    const name=file.originalname
    callback(null, Date.now()+name);
};
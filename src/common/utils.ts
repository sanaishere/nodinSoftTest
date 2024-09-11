import { HttpException, HttpStatus } from "@nestjs/common";
import { Request } from "express";

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

export const bodyFilter = (req, file, callback) => {
    try {
      console.log(req.body);
      const { name, description } = req.body;
      if (!name || !description) {
        return callback(
          new HttpException('Name and description cannot be empty!', HttpStatus.BAD_REQUEST),
          false,
        );
      }
      
      return callback(null, true);
    } catch (error) {
      return callback(
        new HttpException('Unexpected error during file validation', HttpStatus.INTERNAL_SERVER_ERROR),
        false,
      );
    }
}

import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { Connection, createConnection } from "mysql2/promise";
import { config } from "./config";
import { taskTableQuery, userTableQuery } from "./db";
import mysql from 'mysql2/promise';
@Injectable()
export class DataBaseService implements OnModuleInit{
    private connection: Connection; 
    async onModuleInit() {
    await this.connect()
    await this.runQuery(userTableQuery,null)
    await this.runQuery(taskTableQuery,null)
    }

    async connect() {
     try{
     this.connection=await createConnection(config)
     }catch(error){
        throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
     }
    }
    async get(){
        return this.connection
    }

    async runQuery(query:string,params:unknown[]) {
        if(params===null){
            return await this.connection.execute(query)
        }else{
         return await this.connection.execute(query,params)
        }
    }
}
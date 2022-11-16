import { connection } from '../libs/database.js';
import { Course } from './Course.js';
export class Session{
    Id=0;
    Title="";
    Courses=[]; //liste de course
    

    constructor(RowDataPacket){
        this.Id=RowDataPacket.SSId;
        this.Title = RowDataPacket.SSTitle;
        this.Courses.push(new Course(RowDataPacket))
    }

    AddCourse(RowDataPacket){
        this.Courses.push(new Course(RowDataPacket))
    }
}
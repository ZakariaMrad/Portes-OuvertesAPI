import { connection } from '../libs/database.js';
import { Session } from './Session.js';
export class Program {
    Id = -1;
    Title = "";
    Sessions = []; //liste de session
    Description = "";
    Propos = "";

    constructor(RowDataPacket) {
        this.Id = RowDataPacket.PGId;
        this.Title = RowDataPacket.PGTitle;
        this.Description = RowDataPacket.PGDescription;
        this.Propos = RowDataPacket.PGPropos;
        this.Sessions.push(new Session(RowDataPacket))
    }

    TryInitialise(RowDataPacket) {
        if (this.Id != RowDataPacket.PGId) return true;
        if (this.Sessions[this.Sessions.length - 1].Id != RowDataPacket.SSId)
            this.Sessions.push(new Session(RowDataPacket))
        else
            this.Sessions[this.Sessions.length - 1].AddCourse(RowDataPacket);
        return false;
    }
} 
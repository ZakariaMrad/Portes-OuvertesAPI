export class Course{
    Id=0;
    Title="";
    //Code="";
    Content="";

    constructor(RowDataPacket){
        this.Id=RowDataPacket.CSId;
        this.Title=RowDataPacket.CSTitle;
        this.Content=RowDataPacket.CSContent;
    }
}
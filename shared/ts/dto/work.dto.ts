import { BaseData } from "./base.dto";

export class WorksData extends BaseData
{
    public values: WorkData[] = [];

    override fromJson(json: any) 
    {
        for (let v of json)
        {
            this.values.push(new WorkData(v.id, v.title, v.img, v.date))
        }
    }
}

export class WorkData
{
    id: string;
    title: string;
    img: string;
    date: string;

    constructor(id: string, title: string, img: string, date: string) 
    {
        this.id = id;
        this.title = title;
        this.img = img;
        this.date = date
    }
}
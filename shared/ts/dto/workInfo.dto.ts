import { BaseData } from "./base.dto";

export class WorkInfoData extends BaseData
{
    title: string = "";
    img: string = "";
    lang: string[] = [];
    content: WorkInfoContent[] = [];
    links: WorkInfoLink[] = [];
    gallery: WorkInfoGallery[] = [];

    async fromJson(json: any) 
    {
        this.title = json.title;
        this.img = json.img;
        this.lang = json.lang;
        this.content = json.content;
        for (const item of json.gallery)
        {
            this.gallery.push(new WorkInfoGallery(item));
        }
        for (const item of json.links)
        {
            this.links.push(new WorkInfoLink(item));
        }
    }
}

class WorkInfoLink
{
    type: string = "";
    label: string = "";
    link: string = "";

    constructor(json: any)
    {
        this.type = json.type;
        this.label = json.label;
        this.link = json.link;
    }
}

class WorkInfoContent
{
    content: string[] = [];
    grid: boolean = false;

    constructor(json: any)
    {
        this.content = json.content;
        this.grid = json.grid;
    }
}

class WorkInfoGallery
{
    img: string = "";
    title: string = "";

    constructor(json: any)
    {
        this.img = json.img;
        this.title = json.title;
    }
}
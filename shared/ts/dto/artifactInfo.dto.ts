import { BaseData } from "./base.dto";

export class ArtifactInfoData extends BaseData
{
    lang: string[] = [];
    content: string[] = [];

    async fromJson(json: any) 
    {
        this.lang = json.lang;
        this.content = json.content;
    }
}
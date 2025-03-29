import { BaseData } from "./base.dto";

export class ArtifactsData extends BaseData
{
    public values: string[] = [];

    override fromJson(json: any) 
    {
        this.values = json;
    }
}
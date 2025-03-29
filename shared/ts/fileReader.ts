import { BaseData } from "./dto/base.dto";

export class FileReader
{
    static async read<T extends BaseData>(path: string, cls: { new (): T }) : Promise<T>
    {
        const res = await fetch(path);
        const json = await res.json();
        const instance = new cls();
        instance.fromJson(json);
        return instance
    }
}
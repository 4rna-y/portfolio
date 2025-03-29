import { marked } from "marked";
import { ArtifactsData } from "./dto/artifact.dto";
import { ArtifactInfoData } from "./dto/artifactInfo.dto";
import { FileReader } from "./fileReader";

const container = document.getElementsByClassName("container")[0];
const itemMap = new Map<string, Element>();

export async function onArtifactsLoad()
{
    await fetchArtifactItems();
    itemMap.get(window.location.hash.replace("#", ""))?.scrollIntoView({ "behavior": "smooth" });
    
}

async function fetchArtifactItems()
{
    const list = await FileReader.read("../shared/list/artifacts.json", ArtifactsData);
    for (const value of list.values)
    {
        const data = await FileReader.read("../shared/list/artifacts/" + value + ".json", ArtifactInfoData);
        const item = document.createElement("div");
        const imgContainer = document.createElement("div");
        const textContainer = document.createElement("div");
        const separator = document.createElement("div");
        const img = document.createElement("img");
        const belowContainer = document.createElement("div");
        const usingLangContainer = document.createElement("div");
        const buttonContainer = document.createElement("div");

        item.id = value;
        item.classList.add("artifact-item");
        imgContainer.classList.add("artifact-item-img-container");
        textContainer.classList.add("artifact-item-text-container");
        separator.classList.add("artifact-item-separator");
        img.classList.add("artifact-item-img");
        belowContainer.classList.add("artifact-item-below-container");
        usingLangContainer.classList.add("artifact-item-using-lang-container");
        buttonContainer.classList.add("artifact-item-button-container");

        img.src = "https://opengraph.githubassets.com/1/4rna-y/" + value;
        for (const lang of data.lang)
        {
            const langImg = document.createElement("img");
            langImg.classList.add("using-lang-icon");
            langImg.src = "../shared/icon/" + lang + ".svg";
            usingLangContainer.appendChild(langImg);
        }

        const button = document.createElement("div");
        const buttonImg = document.createElement("img");
        const buttonText = document.createElement("p");
        button.classList.add("button");
        button.classList.add("textable-button");
        buttonImg.classList.add("button-img");
        buttonText.classList.add("textable-button-text");
        buttonImg.src = "../shared/icon/github.svg";
        buttonText.textContent = "Github";
        button.appendChild(buttonImg);
        button.appendChild(buttonText);

        let dest = "";

        for (const line of data.content)
        {
            dest += line + "<br/>\n";
        }
        const md = document.createElement("div");
        md.innerHTML = marked(dest) as string;
        md.classList.add("md-content");

        textContainer.appendChild(md);

        buttonContainer.appendChild(button);
        belowContainer.appendChild(usingLangContainer);
        belowContainer.appendChild(buttonContainer);
        imgContainer.appendChild(img);
        imgContainer.appendChild(belowContainer);
        item.appendChild(imgContainer);
        item.appendChild(textContainer);
        item.appendChild(separator);

        container.appendChild(item);
        itemMap.set(value, item);
    }
}
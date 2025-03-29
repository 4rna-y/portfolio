import { marked } from "marked";
import { WorkInfoData } from "./dto/workInfo.dto";
import { FileReader } from "./fileReader";
import anime from "animejs";
import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";

const workImg = document.getElementById("work-img")! as HTMLImageElement;
const workTitle = document.getElementById("work-title")! as HTMLParagraphElement;
const workUsingLang = document.getElementById("work-using-lang")! as HTMLDivElement;
const mdContainer = document.getElementById("md-container")! as HTMLDivElement;
const buttonContainer = document.getElementById("footer-button-container") as HTMLDivElement;
const galleryContainer = document.getElementById("work-gallery-img-container") as HTMLDivElement;
const galleryTitle = document.getElementById("work-gallery-img-title") as HTMLParagraphElement;
const galleryPagenationContainer = document.getElementById("pagenation-container") as HTMLDivElement;

let workData: WorkInfoData;
let workGalleryNum = 0;

export async function onWorksLoad()
{
    const id = new URL(window.location.href).searchParams.get("id");
    await fetchWorkInfo(id)
}

async function fetchWorkInfo(id: string | null)
{
    if (id == null)
    {
        setNotFoundElems();
        return;
    }
    try
    {
        const data = await FileReader.read("../shared/list/works/" + id + ".json", WorkInfoData);
        setInfoElems(data);
    }
    catch
    {
        setNotFoundElems();
    }
} 

function setInfoElems(data: WorkInfoData)
{
    workData = data;
    document.title = "Portfolio - "+ data.title;
    workImg.src = "../shared/img/" + data.img;
    workTitle.textContent = data.title;

    for (const lang of data.lang)
    {
        const langImg = document.createElement("img");
        langImg.classList.add("work-using-lang-icon");
        langImg.src = "../shared/icon/" + lang + ".svg";

        workUsingLang.appendChild(langImg);
    }

    for (const content of data.content)
    {
        const md = document.createElement("div");
        md.classList.add("md-content");
        if (!content.grid) md.classList.add("md-nowrap");

        let dest = "";
        for (const item of content.content)
        {
            dest += item + "<br/>\n";
        }

        md.innerHTML = marked(dest) as string;
        mdContainer.appendChild(md);
    }

    for (const link of data.links)
    {
        const button = document.createElement("div");
        const btnImg = document.createElement("img");
        const btnText = document.createElement("p");
        
        button.classList.add("footer-button");
        button.classList.add("textable-button");
        btnImg.classList.add("footer-button-img");
        btnText.classList.add("textable-button-text");

        btnImg.src = "../shared/icon/" + link.type + ".svg";
        btnText.textContent = link.label;
        
        button.appendChild(btnImg);
        button.appendChild(btnText);
        buttonContainer.appendChild(button);
        button.addEventListener("click", () => { window.open(link.link); });
    }

    let f: Flicking;

    for (let i = 0; i < data.gallery.length; i++)
    {
        if (i == 0)
        {
            galleryTitle.textContent = data.gallery[i].title;
        }
        const galleryImg = document.createElement("img");
        galleryImg.classList.add("work-gallery-img");
        galleryImg.classList.add("panel");
        galleryImg.src = "../shared/img/" + data.gallery[i].img;
        galleryContainer.appendChild(galleryImg);

        const pagenationDot = document.createElement("div");
        pagenationDot.classList.add("pagenation-dot");
        galleryPagenationContainer.appendChild(pagenationDot);
        pagenationDot.addEventListener("click", () => { f.moveTo(i); });
    }

    f = new Flicking("#work-gallery-carousel-container",
    {
        align: "center",
        circular: true,
        renderOnlyVisible: false
    });
    
    f.on("changed", (e) => {
        galleryTitle.textContent = data.gallery[e.index].title;
        anime({
            targets: galleryPagenationContainer.children[workGalleryNum],
            backgroundColor: ["#BEBFC5"],
            duration: 400,
            easing: "easeInOutCubic"
        })
        workGalleryNum = e.index;
        anime({
            targets: galleryPagenationContainer.children[workGalleryNum],
            backgroundColor: ["#000000"],
            duration: 400,
            easing: "easeInOutCubic"
        })
    });

}

function setNotFoundElems()
{
    
}
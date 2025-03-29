import anime from "animejs";
import { FileReader } from "./fileReader";
import { WorksData } from "./dto/work.dto";
import { ArtifactsData } from "./dto/artifact.dto";

const headerTexts = document.getElementsByClassName("container-label");
const hamburgerButton = document.getElementById("hamburger-button")!;
const sideMenuButton = document.getElementById("side-menu-dismiss-icon")!;
const sideMenuCurtain = document.getElementById("side-menu-curtain")!;
const sideMenu = document.getElementById("side-menu")!;
const sideMenuTexts = document.getElementsByClassName("side-menu-text");
const navItems = document.getElementsByClassName("header-nav-text");
const containers = document.getElementsByClassName("container");
const worksContainer = document.getElementById("works")!;
const artifactsContainer = document.getElementById("artifacts-container")!;

let isOpenSideMenu = false;
let focusedNav = 1;

export async function onHomeLoad()
{
    window.onload = () => {
        anime({
            targets: document.body,
            opacity: [0, 1],
            duration: 50,
            easing: "easeInOutCubic"
        });
    }

    hamburgerButton.addEventListener("click", onHambugerClick);
    sideMenuButton.addEventListener("click", onHambugerClick);

    await fetchWorkItems();
    await fetchArtifactItems();

    animateOnLoad();
}

function onHambugerClick()
{
    if (!isOpenSideMenu)
    {
        isOpenSideMenu = true;
        document.documentElement.style.setProperty("--side-menu-visibllity", "block");
        anime({
            targets: sideMenu,
            translateX: [100 + "%", 0 + "%"],
            duration: 500,
            easing: "easeInOutCubic"
        });
        anime({
            targets: sideMenuCurtain,
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutCubic"
        });
    }
    else
    {
        isOpenSideMenu = false;
        
        anime({
            targets: sideMenu,
            translateX: [0 + "%", 100 + "%"],
            duration: 500,
            easing: "easeInOutCubic"
        });
        anime({
            targets: sideMenuCurtain,
            opacity: [1, 0],
            duration: 500,
            easing: "easeInOutCubic",
            complete: () => document.documentElement.style.setProperty("--side-menu-visibllity", "none")
        });
    }
}

function setNavItems()
{
    for (let i = 0; i < headerTexts.length; i++)
    {
        navItems[i].addEventListener("click", () => headerTexts[i].scrollIntoView({ "behavior": "smooth" }));
        sideMenuTexts[i].addEventListener("click", () => { 
            headerTexts[i].scrollIntoView({ "behavior": "smooth" }); 
            onHambugerClick();
        });
        navItems[i].addEventListener("mouseenter", () => anime({ targets: navItems[i], color: ["#000"], duration: 250, easing: "easeInOutCubic" }));
        navItems[i].addEventListener("mouseleave", () => anime({ targets: navItems[i], color: [(focusedNav == i) ? "#000" : "#BEBFC5" ], duration: 250, easing: "easeInOutCubic" }));
    }

    const options: IntersectionObserverInit =
    {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.5
    }

    const cb: IntersectionObserverCallback = (e, o) => 
    {
        e.forEach(e => {
            if (e.isIntersecting) {
                let i = 0;
                for (const navItem of navItems)
                {
                    if (navItem.textContent == e.target.textContent)
                    {
                        focusedNav = i;
                        anime({
                            targets: navItem,
                            color: ["#000"],
                            duration: 400,
                            easing: "easeInOutCubic"
                        })
                    }
                    else
                    {
                        anime({
                            targets: navItem,
                            color: ["#BEBFC5"],
                            duration: 400,
                            easing: "easeInOutCubic"
                        })
                    }
                    i++;
                }
            }
        })
    }

    const observer = new IntersectionObserver(cb, options);
    for (const headerText of headerTexts)
    {
        observer.observe(headerText);
    }
}

async function fetchWorkItems()
{
    const res = await FileReader.read("./shared/list/works.json", WorksData);
    for (const data of res.values)
    {
        const workItem = document.createElement("div");
        const workPopup = document.createElement("div");
        const workPopupArea = document.createElement("div");
        const workPopupTitle = document.createElement("p");
        const workPopupDate = document.createElement("p");
        const workImg = document.createElement("img");

        workItem.classList.add("works-item");
        workPopup.classList.add("works-item-popup");
        workPopupArea.classList.add("works-item-popup-area");
        workPopupTitle.classList.add("works-item-popup-title");
        workPopupDate.classList.add("works-item-popup-date");
        workImg.classList.add("works-item-img");

        workPopupTitle.textContent = data.title;
        workPopupDate.textContent = data.date;
        workImg.src = "./shared/img/" + data.img;

        workPopupArea.appendChild(workPopupTitle);
        workPopupArea.appendChild(workPopupDate);
        workPopup.appendChild(workPopupArea);
        workItem.appendChild(workPopup);
        workItem.appendChild(workImg);

        worksContainer.appendChild(workItem);
        workPopup.addEventListener("click", () => onWorkItemClick(data.id));
    }
}

async function fetchArtifactItems()
{
    const data = await FileReader.read("./shared/list/artifacts.json", ArtifactsData);
    for (const value of data.values)
    {
        const item = document.createElement("div");
        const popup = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");

        item.classList.add("artifact-item");
        popup.classList.add("artifact-item-popup");
        img.classList.add("artifact-img");
        title.classList.add("artifact-item-popup-text");

        img.src = "https://opengraph.githubassets.com/1/4rna-y/" + value;
        title.textContent = value;

        popup.appendChild(title);
        item.appendChild(popup);
        item.appendChild(img);

        artifactsContainer.appendChild(item);
        item.addEventListener("click", () => onArtifactItemClick(value));
    }
}

function animateOnLoad()
{
    for (let i = 0; i < containers.length; i++)
    {
        anime({
            targets: containers[i],
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: i * 150,
            easing: "easeInOutCubic"
        });
        anime({
            targets: navItems[i],
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: i * 150,
            easing: "easeInOutCubic",
            complete: () => {
                if (i == containers.length - 1)
                {
                    setNavItems();
                }    
            }
        });
    }
}

function onWorkItemClick(id: string)
{
    window.location.href = "./works/?id=" + id;
}

function onArtifactItemClick(id: string)
{
    window.location.href = "./artifacts#" + id;
    
}
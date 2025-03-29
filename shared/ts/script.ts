import { onArtifactsLoad } from "./artifacts";
import { onContactLoad } from "./contact";
import { onHomeLoad } from "./home";
import { onWorksLoad } from "./works";

document.addEventListener("DOMContentLoaded", onLoad);

function onLoad()
{
    if (window.location.pathname.startsWith("/works"))
    {
        onWorksLoad();
    }
    else
    if (window.location.pathname.startsWith("/artifacts"))
    {
        onArtifactsLoad();
    }
    else
    if (window.location.pathname.startsWith("/contact"))
    {
        onContactLoad();
    }
    else
    {
        onHomeLoad();
    }

}


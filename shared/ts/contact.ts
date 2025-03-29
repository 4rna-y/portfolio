const form = document.getElementById("contact-form")! as HTMLFormElement;
const resultContainer = document.getElementById("result-container")! as HTMLDivElement;
const resultText = document.getElementById("result-text")! as HTMLParagraphElement;

export function onContactLoad()
{
    form.addEventListener("submit", onSubmit);
}

function onSubmit(e: SubmitEvent)
{
    const url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdH0JqBsqXxLjRwA8dA7-qKnpew2PpksmdHmCcWATKjy2V8UQ/formResponse";
    const data = new FormData(form);

    e.preventDefault();
    fetch(url, { method: "POST", body: data, mode: "no-cors" })
        .then(() => {
            form.style.setProperty("display", "none");
            resultContainer.style.setProperty("display", "block");
            resultText.textContent = "正常に送信されました。";
        })
        .catch(() =>
        {
            form.style.setProperty("display", "none");
            resultContainer.style.setProperty("display", "block");
            resultText.textContent = "送信に失敗しました。再度お試しください。";
        });
}
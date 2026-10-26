document.addEventListener("DOMContentLoaded", () => {
    for (const [tag, url] of [["header", "/header.html"], ["footer", "/footer.html"]]) {
        const target = document.querySelector(tag);
        if (!target) continue;
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("HTTP " + response.status);
                return response.text();
            })
            .then(html => { target.innerHTML = html; })
            .catch(error => {
                console.error("Napaka pri nalaganju navigacije:", error);
                if (tag === "header") {
                    target.innerHTML = '<a href="/">Domov</a> · <a href="/projekti.html">Projekti</a> · <a href="/kontakt.html">Kontakt</a>';
                } else {
                    target.innerHTML = '<a href="mailto:jaz@cekluka.com">jaz@cekluka.com</a>';
                }
            });
    }
});
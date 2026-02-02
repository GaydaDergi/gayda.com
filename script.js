// ==========================================================
// DERGİ SAYILARI
// ==========================================================

const issues = {
    "Sayı 3 (Kış 2026) - SON SAYI": { folder: "sayi_3", totalPages: 4 },
    "Sayı 2 (Ekim 2025)": { folder: "sayi2", totalPages: 4 },
    "Sayı 1 (Eylül 2024)": { folder: "sayi1", totalPages: 4 }
};

// ==========================================================
// ÖZEL BUTON KONFİG
// ==========================================================

const specialButtonConfig = [
    {
        issueIncludes: "Sayı 2",
        page: 4,
        text: "Reklam Filmini İzle",
        url: "https://gaydadergi.github.io/gotkedileri.com/"
    },
    {
        issueIncludes: "Sayı 3",
        page: 4,
        text: "Limon Abla ve Haydari Bey Formu",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfoYn2uCizos0YDeiRtMM9a6bZX7wLcnKfSkv46Akt9NDzQww/viewform"
    }
];

// ==========================================================
// DOM ELEMANLARI
// ==========================================================

const pageImage = document.getElementById("page");
const pageNumberSpan = document.getElementById("pageNumber");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const issueSelector = document.getElementById("issueSelector");
const specialButton = document.getElementById("specialButton");

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const zoomLevelSpan = document.getElementById("zoomLevel");

// ==========================================================
// STATE
// ==========================================================

let currentIssueKey;
let currentIssue;
let currentPage = 1;

let zoomLevel = 1;
const ZOOM_STEP = 0.2;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

// ==========================================================
// ZOOM
// ==========================================================

function applyZoom() {
    pageImage.style.transform = `scale(${zoomLevel})`;
    zoomLevelSpan.textContent = Math.round(zoomLevel * 100) + "%";
}

function zoomIn() {
    zoomLevel = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP);
    applyZoom();
}

function zoomOut() {
    zoomLevel = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP);
    applyZoom();
}

// ==========================================================
// SAYI SEÇİCİ
// ==========================================================

function populateIssueSelector() {
    const issueKeys = Object.keys(issues).reverse();

    issueKeys.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        issueSelector.appendChild(option);
    });

    const latestIssueKey = Object.keys(issues)[0];
    issueSelector.value = latestIssueKey;
    loadIssue(latestIssueKey);
}

// ==========================================================
// SAYI YÜKLE
// ==========================================================

function loadIssue(issueKey) {
    currentIssueKey = issueKey;
    currentIssue = issues[issueKey];
    currentPage = 1;
    updateMagazine();
}

// ==========================================================
// DERGİ GÜNCELLE
// ==========================================================

function updateMagazine() {
    const { folder, totalPages } = currentIssue;

    pageImage.src = `images/${folder}/${currentPage}.jpg`;
    pageNumberSpan.textContent = `${currentPage} / ${totalPages}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // ---- özel buton ----
    specialButton.style.display = "none";
    specialButton.dataset.url = "";

    const matchedConfig = specialButtonConfig.find(cfg =>
        currentIssueKey.includes(cfg.issueIncludes) &&
        currentPage === cfg.page
    );

    if (matchedConfig) {
        specialButton.style.display = "block";
        specialButton.textContent = matchedConfig.text;
        specialButton.dataset.url = matchedConfig.url;
    }

    // zoom korunur
    applyZoom();
}

// ==========================================================
// SAYFA DEĞİŞTİR
// ==========================================================

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= currentIssue.totalPages) {
        currentPage = newPage;
        updateMagazine();
    }
}

// ==========================================================
// EVENTLER
// ==========================================================

document.addEventListener("DOMContentLoaded", populateIssueSelector);

prevButton.addEventListener("click", () => changePage(-1));
nextButton.addEventListener("click", () => changePage(1));

issueSelector.addEventListener("change", e => {
    loadIssue(e.target.value);
});

zoomInBtn.addEventListener("click", zoomIn);
zoomOutBtn.addEventListener("click", zoomOut);

specialButton.addEventListener("click", () => {
    if (specialButton.dataset.url) {
        window.open(specialButton.dataset.url, "_blank");
    }
});

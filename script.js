// ==========================================================
// DERGİ SAYILARI
// ==========================================================

const issues = {
    "Sayı 3 (Kış 2026) - SON SAYI": { folder: "sayi_3", totalPages: 4 },
    "Sayı 2 (Ekim 2025)": { folder: "sayi2", totalPages: 4 },
    "Sayı 1 (Eylül 2024)": { folder: "sayi1", totalPages: 4 }
};

// ==========================================================
// ÖZEL BUTON – DATA DRIVEN KONFİG
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

const pageImage = document.getElementById('page');
const pageNumberSpan = document.getElementById('pageNumber');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const issueSelector = document.getElementById('issueSelector');
const specialButton = document.getElementById('specialButton');

// ==========================================================
// STATE
// ==========================================================

let currentIssueKey;
let currentIssue;
let currentPage = 1;

// ==========================================================
// SAYI SEÇİCİYİ DOLDUR
// ==========================================================

function populateIssueSelector() {
    const issueKeys = Object.keys(issues).reverse();

    issueKeys.forEach(key => {
        const option = document.createElement('option');
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
    const totalPages = currentIssue.totalPages;
    const folder = currentIssue.folder;

    pageImage.src = `images/${folder}/${currentPage}.jpg`;
    pageNumberSpan.textContent = `${currentPage} / ${totalPages}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // -------------------------------
    // ÖZEL BUTON (DATA DRIVEN)
    // -------------------------------

    specialButton.style.display = 'none';
    specialButton.dataset.url = "";

    const matchedConfig = specialButtonConfig.find(cfg =>
        currentIssueKey.includes(cfg.issueIncludes) &&
        currentPage === cfg.page
    );

    if (matchedConfig) {
        specialButton.style.display = 'block';
        specialButton.textContent = matchedConfig.text;
        specialButton.dataset.url = matchedConfig.url;
    }
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

document.addEventListener('DOMContentLoaded', () => {
    if (!specialButton) {
        console.error("specialButton bulunamadı!");
    }
    populateIssueSelector();
});

prevButton.addEventListener('click', () => changePage(-1));
nextButton.addEventListener('click', () => changePage(1));

issueSelector.addEventListener('change', (e) => {
    loadIssue(e.target.value);
});

// Dergi sayılarını ve her birindeki sayfa sayısını tanımlayın.
const issues = {
    "Sayı 3 (Kış 2026) - SON SAYI": { folder: "sayi_3", totalPages: 4 },
    "Sayı 2 (Ekim 2025)": { folder: "sayi2", totalPages: 4 },
    "Sayı 1 (Eylül 2024)": { folder: "sayi1", totalPages: 4 }
};

// DOM Elemanları
const pageImage = document.getElementById('page');
const pageNumberSpan = document.getElementById('pageNumber');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const issueSelector = document.getElementById('issueSelector');
const specialButton = document.getElementById('specialButton'); 

// Durum Değişkenleri
let currentIssueKey; 
let currentIssue;    
let currentPage = 1; 

// ==========================================================
// 1. Sayı Seçiciyi Doldurma İşlevi
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
// 2. Sayıyı Yükleme İşlevi
// ==========================================================
function loadIssue(issueKey) {
    currentIssueKey = issueKey;
    currentIssue = issues[issueKey];
    currentPage = 1; 
    updateMagazine();
}

// ==========================================================
// 3. Dergi Görünümünü ve Butonları Güncelleme İşlevi
// ==========================================================
function updateMagazine() {
    const totalPages = currentIssue.totalPages;
    const folder = currentIssue.folder;

    // Resim yolunu ve sayfa numarasını güncelleme
    pageImage.src = `images/${folder}/${currentPage}.jpg`;
    pageNumberSpan.textContent = `${currentPage} / ${totalPages}`;
    
    // Navigasyon butonlarını etkinleştir/devre dışı bırak
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // --------------------------------------------------------
// ÖZEL BUTON KONTROLÜ (DATA-DRIVEN)
// --------------------------------------------------------

specialButton.style.display = 'none';
specialButton.dataset.url = "";

// Uygun konfigürasyonu bul
const matchedConfig = specialButtonConfig.find(config =>
    currentIssueKey.includes(config.issueIncludes) &&
    currentPage === config.page
);

if (matchedConfig) {
    specialButton.style.display = 'block';
    specialButton.textContent = matchedConfig.text;
    specialButton.dataset.url = matchedConfig.url;
}


// ==========================================================
// 4. Sayfa Geçiş İşlevi
// ==========================================================
function changePage(direction) {
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= currentIssue.totalPages) {
        currentPage = newPage;
        updateMagazine();
    }
}

// ==========================================================
// 5. Olay Dinleyicileri (Event Listeners)
// ==========================================================

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    // BURADA specialButton'ın gerçekten algılanıp algılanmadığını kontrol edin
    if (!specialButton) {
        console.error("HATA: 'specialButton' ID'li HTML elementi bulunamadı. Lütfen index.html'i kontrol edin.");
    }
    populateIssueSelector();
});

// Önceki/Sonraki Sayfa Butonları
prevButton.addEventListener('click', () => changePage(-1));
nextButton.addEventListener('click', () => changePage(1));

// Sayı Seçici (Dropdown) Değişimi
issueSelector.addEventListener('change', (event) => {
    loadIssue(event.target.value);
});

// --------------------------------------------------------
// ÖZEL BUTON KONFİGÜRASYONU (DATA-DRIVEN)
// --------------------------------------------------------

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

});

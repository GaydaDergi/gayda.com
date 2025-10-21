// Dergi sayılarını ve her birindeki sayfa sayısını tanımlayın.
const issues = {
    "Sayı 2 (Ekim 2025) - SON SAYI": { folder: "sayi2", totalPages: 4 },
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
    // KRİTİK BÖLÜM: ÖZEL BUTON KONTROLÜ
    // --------------------------------------------------------
    
    // **1. ADIM: Her şeyden önce butonu GİZLE! (Bu, kalıcılığı önler)**
    specialButton.style.display = 'none'; 
    
    // Koşul 1: Sayı "Sayı 2" kelimesini içermeli
    const isIssueTwo = currentIssueKey.includes("Sayı 2");
    
    // Koşul 2: Şu anki sayfa 4 olmalı
    const isPageFour = currentPage === 4;

    if (isIssueTwo && isPageFour) {
        // 2. ADIM: Şartlar sağlanıyorsa GÖSTER!
        specialButton.style.display = 'block'; 
        specialButton.textContent = 'Reklam Filmini İzle'; 
    }
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

// Özel Tuş Olay Dinleyicisi
specialButton.addEventListener('click', () => {
    const externalURL = "https://www.youtube.com/watch?v=REKLAM_FILMININ_LINKI"; 
    window.open(externalURL, '_blank'); 
});

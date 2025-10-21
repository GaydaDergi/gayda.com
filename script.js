// Dergi sayılarını ve her birindeki sayfa sayısını tanımlayın.
// Not: Anahtarların, özel buton kontrolü için "Sayı 2" içerdiğinden emin olun.
const issues = {
    // EN YENİ SAYI EN ÜSTTE OLMALI
    "Sayı 2 (Ekim 2025) - SON SAYI": { folder: "sayi2", totalPages: 4 },
    "Sayı 1 (Eylül 2024)": { folder: "sayi1", totalPages: 4 }
};

// DOM Elemanları
const pageImage = document.getElementById('page');
const pageNumberSpan = document.getElementById('pageNumber');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const issueSelector = document.getElementById('issueSelector');
const specialButton = document.getElementById('specialButton'); // Özel Tuş

// Durum Değişkenleri
let currentIssueKey; // Şu anki sayının anahtarı (örn: "Sayı 2 (Ekim 2025) - SON SAYI")
let currentIssue;    // Şu anki sayının detay objesi
let currentPage = 1; // Şu anki sayfa numarası

// ==========================================================
// 1. Sayı Seçiciyi Doldurma İşlevi
// ==========================================================
function populateIssueSelector() {
    // Sayıları sondan başa doğru (en yeni üste) listelemek için anahtarları ters çeviriyoruz
    const issueKeys = Object.keys(issues).reverse(); 

    issueKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        issueSelector.appendChild(option);
    });
    
    // En son sayıyı varsayılan olarak seç (objenin ilk anahtarı)
    const latestIssueKey = Object.keys(issues)[0]; 
    issueSelector.value = latestIssueKey;
    
    // Başlangıçta dergiyi yükle
    loadIssue(latestIssueKey);
}

// ==========================================================
// 2. Sayıyı Yükleme İşlevi (Sayı seçimi veya sayfa yüklendiğinde çağrılır)
// ==========================================================
function loadIssue(issueKey) {
    currentIssueKey = issueKey;
    currentIssue = issues[issueKey];
    currentPage = 1; // Yeni sayıya geçince her zaman ilk sayfadan başla
    updateMagazine();
}

// ==========================================================
// 3. Dergi Görünümünü ve Butonları Güncelleme İşlevi
// ==========================================================
function updateMagazine() {
    const totalPages = currentIssue.totalPages;
    const folder = currentIssue.folder;

    // Resim yolunu ayarla: images/klasör_adı/sayfa_numarası.jpg
    pageImage.src = `images/${folder}/${currentPage}.jpg`;
    
    // Sayfa numarasını güncelle
    pageNumberSpan.textContent = `${currentPage} / ${totalPages}`;
    
    // Navigasyon butonlarını etkinleştir/devre dışı bırak
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Koşul 1: Sayının anahtarı "Sayı 2" kelimesini içermeli (Hangi sayı olduğunu kontrol eder)
    const isIssueTwo = currentIssueKey.includes("Sayı 2");
    
    // Koşul 2: Şu anki sayfa 4 olmalı
    const isPageFour = currentPage === 4;

    if (isIssueTwo && isPageFour) {
        // Eğer hem Sayı 2 ise hem de 4. sayfa ise, butonu göster.
        specialButton.style.display = 'block'; 
        specialButton.textContent = 'Reklam Filmini İzle'; // Buton metnini de güncelleyebilirsiniz
    } else {
        // Aksi takdirde (başka bir sayı veya başka bir sayfa), butonu gizle.
        specialButton.style.display = 'none'; 
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
    // Tıklanınca açılacak siteyi buraya yazın
    const externalURL = "https://gaydadergi.github.io/gotkedileri.com/"; 
    
    // Yeni sekmede açmak için:
    window.open(externalURL, '_blank'); 
});

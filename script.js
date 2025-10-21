// Dergi sayılarını ve her birindeki sayfa sayısını tanımlayın.
// DİKKAT: Yeni sayı çıktıkça bu objeyi güncellemeniz GEREKİR!
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

// YENİ: Özel Tuş
const specialButton = document.getElementById('specialButton');

// Durum Değişkenleri
let currentIssueKey; // Şu anki sayının anahtarı (örn: "Sayı 3 (Kasım 2023)")
let currentIssue;    // Şu anki sayının detay objesi
let currentPage = 1; // Şu anki sayfa numarası

// 1. Sayı Seçiciyi Doldurma İşlevi
function populateIssueSelector() {
    // Sayıları sondan başa doğru (en yeni üste) listelemek daha iyi olabilir
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

// 2. Sayıyı Yükleme İşlevi
function loadIssue(issueKey) {
    currentIssueKey = issueKey;
    currentIssue = issues[issueKey];
    currentPage = 1; // Yeni sayıya geçince her zaman ilk sayfadan başla
    updateMagazine();
}

// 3. Dergi Görünümünü Güncelleme İşlevi
function updateMagazine() {
    const totalPages = currentIssue.totalPages;
    const folder = currentIssue.folder;
    

    // Resim yolunu ayarla: images/klasör_adı/sayfa_numarası.jpg
    // LÜTFEN DOSYA UZANTILARININ .jpg OLDUĞUNDAN EMİN OLUN
    pageImage.src = `images/${folder}/${currentPage}.jpg`;
    
    // Sayfa numarasını güncelle
    pageNumberSpan.textContent = `${currentPage} / ${totalPages}`;

    if (currentIssueKey.includes("Sayı 2")) {
        specialButton.style.display = 'block'; // Tuşu görünür yap
    } else {
        specialButton.style.display = 'none'; // Diğer sayılarda tuşu gizle
    }
}
    
    // Navigasyon butonlarını etkinleştir/devre dışı bırak
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// 4. Sayfa Geçiş İşlevi
function changePage(direction) {
    // Geçerli sınırlar içinde olup olmadığını kontrol et
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= currentIssue.totalPages) {
        currentPage = newPage;
        updateMagazine();
    }
}

// 5. Olay Dinleyicileri (Event Listeners)

// Önceki/Sonraki Sayfa Butonları
prevButton.addEventListener('click', () => changePage(-1));
nextButton.addEventListener('click', () => changePage(1));

// Sayı Seçici (Dropdown) Değişimi
issueSelector.addEventListener('change', (event) => {
    loadIssue(event.target.value);
});


// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    populateIssueSelector();
});


// YENİ: Özel Tuş Olay Dinleyicisi
specialButton.addEventListener('click', () => {
    // Tıklanınca açılacak siteyi buraya yazın
    const externalURL = "https://www.orneksite.com/sayi2-ek-icerik"; 
    
    // Yeni sekmede açmak için:
    window.open(externalURL, '_blank'); 

    // Aynı sekmede açmak için (eğer bunu tercih ederseniz):
    // window.location.href = externalURL;
});


// Sayfa yüklendiğinde uygulamayı başlat...
// ...

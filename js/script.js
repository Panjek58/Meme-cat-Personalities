// Quiz data - gambar dari folder aset
const questions = [
    {
        image: "aset/Group 1.png",
        question: "Jam 02.00 pagi di kamar kost, apa yang biasanya kamu lakuin?",
        options: [
            { text: "Scroll TikTok, kadang main game", characters: ["vira"] },
            { text: "Apa lagi kalau bukan ngelaprak", characters: ["ayu"] },
            { text: "Bikin to do list buat besok", characters: ["agung"] },
            { text: "Biasanya overthinking sih", characters: ["kevin"] }
        ]
    },
    {
        image: "aset/Group 2.png",
        question: "Kalau tiba-tiba ada pintu misterius yang menarik di embung, kira-kira responmu gimana?",
        options: [
            { text: "Ngajak orang lain buat cek pintu", characters: ["agung"] },
            { text: "Berharap itu pintu ke kamar kost", characters: ["kevin"] },
            { text: '"Study space kah itu?"', characters: ["ayu"] },
            { text: '"Masuknya bayar ga ya?"', characters: ["agus"] }
        ]
    },
    {
        image: "aset/Group 3.png",
        question: "Jika stresmu adalah sebuah cuaca di kampus Itera, maka itu adalah",
        options: [
            { text: "Badai petir", characters: ["ayu"] },
            { text: "Matahari terik", characters: ["agung"] },
            { text: "Gerimis tipis", characters: ["vira"] },
            { text: "Berkabut tebal", characters: ["kevin"] }
        ]
    },
    {
        image: "aset/Group 4.png",
        question: "Temen kelompok ngechat malem-malem. Tindakanmu?",
        options: [
            { text: "Baca notif, lanjut tidur", characters: ["kevin"] },
            { text: "Kirim long text pembagian tugas", characters: ["agung"] },
            { text: '"Bagian mana yang belum kelar?"', characters: ["ayu"] },
            { text: '"Ngikut aja gimana enaknya"', characters: ["agus", "vira"] }
        ]
    },
    {
        image: "aset/Group 5.png",
        question: "Apa menu andalanmu saat dompet kritis?",
        options: [
            { text: "Indomie jumbo 2 bungkus", characters: ["kevin"] },
            { text: "Ikut seminar kampus", characters: ["agung"] },
            { text: '"Money will come back"', characters: ["vira"] },
            { text: "Nasi putih + kerupuk + kecap", characters: ["agus"] }
        ]
    },
    {
        image: "aset/Group 6.png",
        question: "Self reward habis ujianmu apa?",
        options: [
            { text: "Hibernasi 1 hari", characters: ["kevin"] },
            { text: "Ngajak temen nongkrong", characters: ["agung"] },
            { text: '"Mending uangnya ditabung"', characters: ["agus"] },
            { text: "Me Time", characters: ["ayu"] }
        ]
    },
    {
        image: "aset/Group 7.png",
        question: "Apa responmu kalau ada beban kelompok?",
        options: [
            { text: "Ajakin deeptalk", characters: ["vira"] },
            { text: '"Mungkin lagi burn out"', characters: ["agus"] },
            { text: '"Mending kerjain sendiri aja deh"', characters: ["ayu"] },
            { text: '"Besok aku laporin dosen"', characters: ["agung"] }
        ]
    },
    {
        image: "aset/Group 8.png",
        question: "Barang wajib apa yang ada di tasmu?",
        options: [
            { text: "Freshcare dan paracetamol", characters: ["ayu"] },
            { text: "Tumblr minum", characters: ["vira"] },
            { text: "Earphone", characters: ["kevin"] },
            { text: "Powerbank", characters: ["agung"] }
        ]
    },
    {
        image: "aset/Group 9.png",
        question: "Temanmu ngajak nongkrong, jawabanmu?",
        options: [
            { text: "Mau ngelaprak huhu", characters: ["ayu"] },
            { text: "Gasss", characters: ["agung"] },
            { text: "Next time ya, mau istirahat", characters: ["vira"] },
            { text: "Kalau ada promo boleh lah", characters: ["agus"] }
        ]
    },
    {
        image: "aset/Group 10.png",
        question: "Apa sumber energi utamamu?",
        options: [
            { text: "Kopi", characters: ["agung"] },
            { text: "Validasi dari orang-orang", characters: ["ayu"] },
            { text: '"Apa ya, Bingung juga"', characters: ["kevin"] },
            { text: "Promo & gratisan", characters: ["agus"] }
        ]
    }
];

// Character data - gambar hasil dari folder Result
const characterData = {
    agung: { image: "Result/agung.png" },
    agus: { image: "Result/agus.png" },
    ayu: { image: "Result/ayu.png" },
    kevin: { image: "Result/kevin.png" },
    vira: { image: "Result/vira.png" }
};

// Google Sheets Web App URL
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwPI6-isYzqU4Pw5FE6lFG0mFOUapBKFEEJe-GykslPWFbDuA_2bV-Tr-_pfhXeLuT8ew/exec';

/**
 * Kirim data hasil quiz ke Google Sheets
 * @param {string} winner - Karakter pemenang
 * @param {Object} allScores - Semua skor karakter
 */
function sendDataToSheets(winner, allScores) {
    fetch(SHEETS_URL, {
        method: 'POST',
        body: JSON.stringify({ result: winner, scores: allScores }),
    })
    .then(response => console.log('Data berhasil tersimpan!', response))
    .catch(error => console.error('Gagal simpan data!', error));
}

// State variables
let currentQuestion = 0;
let scores = {
    agung: 0,
    agus: 0,
    ayu: 0,
    kevin: 0,
    vira: 0
};

/**
 * Mulai quiz dari awal
 */
function startQuiz() {
    document.getElementById('starter').classList.remove('active');
    document.getElementById('quiz').classList.add('active');
    currentQuestion = 0;
    scores = { agung: 0, agus: 0, ayu: 0, kevin: 0, vira: 0 };
    showQuestion();
}

/**
 * Tampilkan pertanyaan saat ini
 */
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('progressText').textContent = `${currentQuestion + 1} / 10`;
    document.getElementById('questionImage').src = question.image;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(option.characters);
        optionsContainer.appendChild(button);
    });
}

/**
 * Handle pilihan jawaban
 * @param {Array} characters - Array karakter yang mendapat poin
 */
function selectOption(characters) {
    characters.forEach(char => {
        scores[char]++;
    });

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

/**
 * Tampilkan hasil akhir
 */
function showResult() {
    document.getElementById('quiz').classList.remove('active');
    const resultPage = document.getElementById('result');
    resultPage.classList.add('active');

    // Cari karakter dengan skor tertinggi
    let winner = 'agung';
    let maxScore = 0;

    for (const [char, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            winner = char;
        }
    }

    const charInfo = characterData[winner];

    document.getElementById('resultImage').src = charInfo.image;
    
    // Hapus class bg lama dan tambah yang baru
    resultPage.className = 'page active bg-' + winner;

    // Kirim data ke Google Sheets
    sendDataToSheets(winner, scores);
}

// ========================================
// ACADEMIC PAGE JAVASCRIPT - TO'LIQ VERSION
// ========================================

// DOM elementlari
const academicElements = {
    bachelorContent: document.getElementById('bachelor-content'),
    masterContent: document.getElementById('master-content'),
    bachelorForms: document.getElementById('bachelor-forms-container'),
    masterPrograms: document.getElementById('master-programs-container'),
    programModal: document.getElementById('program-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body')
};

// Global o'zgaruvchilar
let academicData = null;

function tAcademic(key) {
    return typeof window.t === 'function' ? window.t(key) : key;
}

function trAcademic(value) {
    return typeof window.tr === 'function' ? window.tr(value) : value;
}

function isEnglishAcademic() {
    const appLang = (window.appData?.language || '').toLowerCase();
    if (appLang) return appLang === 'en';

    const savedLang = (localStorage.getItem('tdu_language') || '').toLowerCase();
    if (savedLang) return savedLang === 'en';

    const htmlLang = (document.documentElement?.lang || '').toLowerCase();
    return htmlLang.startsWith('en');
}

function autoTranslateAcademic(root) {
    if (typeof window.autoTranslateElement === 'function') {
        window.autoTranslateElement(root || document.body);
    }
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    loadAcademicData();
    window.addEventListener('hashchange', applyAcademicHash);
});

// data.json dan ma'lumotlarni yuklash
async function loadAcademicData() {
    try {
        // Avval asosiy app ma'lumotlarini yuklab olamiz (localStorage siteData ham shu yerda birlashadi)
        if ((!window.appData || !window.appData.programs) && typeof loadAppData === 'function') {
            await loadAppData();
        }

        // Avval window.appData dan olishga harakat qilamiz
        if (window.appData && window.appData.programs) {
            academicData = window.appData;
        } else {
            // Agar window.appData yo'q bo'lsa, avval API, keyin data.json dan o'qiymiz
            let fullData = null;
            try {
                const apiResponse = await fetch('/api/site-data');
                if (!apiResponse.ok) throw new Error('api yuklanmadi');
                fullData = await apiResponse.json();
            } catch (apiError) {
                const response = await fetch('data.json');
                if (!response.ok) throw new Error('data.json yuklanmadi');
                fullData = await response.json();
            }

            // data.json da birinchi ob'ekt asosiy ma'lumotlarni o'z ichiga oladi
            academicData = fullData;
        }
        
        // Ma'lumotlarni sahifaga yuklash
        loadBachelorForms();
        loadMasterPrograms();
        applyAcademicHash();
        
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        // Xatolik bo'lsa, default ma'lumotlarni ishlatamiz
        useDefaultData();
    }
}

// Default ma'lumotlar (agar data.json yuklanmasa)
function useDefaultData() {
    academicData = {
        programs: {
            bachelor: [
                {
                    id: 1,
                    name: "Iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
                    code: "60110100",
                    duration: "4 yil",
                    description: "Iqtisodiy jarayonlarni tahlil qilish, bashorat qilish va boshqarish ko'nikmalarini shakllantirish. Makro va mikroiqtisodiyot, moliya, statistika, ekonometrika fanlarini o'rganish.",
                    score: 140,
                    seats: 100,
                    form: "Kunduzgi",
                    department: "Iqtisodiyot va turizm",
                    subjects: ["Makroiqtisodiyot", "Mikroiqtisodiyot", "Statistika", "Ekonometrika", "Moliya"],
                    career: ["Iqtisodchi", "Tahlilchi", "Mutaxassis", "Menejer"]
                }
            ],
            master: [
                {
                    id: 1,
                    name: "Iqtisodiyot nazariyasi",
                    code: "70110101",
                    duration: "2 yil",
                    description: "Ilmiy tadqiqotlar va nazariy bilimlar chuqurlashtirilgan o'qitiladi. Magistratura darajasida ilmiy ishlar olib borish.",
                    score: 65,
                    seats: 30,
                    form: "Kunduzgi",
                    department: "Iqtisodiyot va turizm",
                    subjects: ["Iqtisodiyot nazariyasi", "Ilmiy tadqiqotlar metodologiyasi", "Ekonometrik modellar", "Global iqtisodiyot"],
                    career: ["Ilmiy xodim", "Tadqiqotchi", "O'qituvchi", "Ekspert"]
                }
            ],
            extramural: [
                {
                    id: 1,
                    name: "Iqtisodiyot (sirtqi)",
                    code: "60110101",
                    duration: "5 yil",
                    description: "Ishlaydigan talabalar uchun maxsus dastur. O'qish hafta oxirida va kechqurun amalga oshiriladi.",
                    score: 110,
                    seats: 150,
                    form: "Sirtqi",
                    department: "Iqtisodiyot va turizm",
                    subjects: ["Asosiy iqtisodiyot", "Moliya asoslari", "Buxgalteriya hisobi", "Tadbirkorlik", "Statistika"],
                    career: ["Iqtisodchi", "Buxgalter", "Menejer", "Mutaxassis"]
                }
            ]
        }
    };
    
    loadBachelorForms();
    loadMasterPrograms();
}

// Bakalavriat formalarini yuklash
function loadBachelorForms() {
    if (!academicElements.bachelorForms) return;
    
    // data.json dan ma'lumotlarni olish
    const bachelorPrograms = academicData?.programs?.bachelor || [];
    const extramuralPrograms = academicData?.programs?.extramural || [];
    
    // Har bir forma uchun yo'nalishlar soni
    const kunduzgiPrograms = bachelorPrograms.filter(p => 
        p.form === 'Kunduzgi' || !p.form
    );
    
    const kechkiPrograms = bachelorPrograms.filter(p => 
        p.form === 'Kechki' || p.form === 'Kechgi'
    );
    
    const sirtqiPrograms = [
        ...extramuralPrograms,
        ...bachelorPrograms.filter(p => p.form === 'Sirtqi')
    ];
    
    const masofaviyPrograms = bachelorPrograms.filter(p => 
        p.form === 'Masofaviy'
    );
    
    // Formalar ma'lumotlari
    const forms = [
        {
            icon: 'fa-sun',
            name: 'Kunduzgi',
            duration: '4 yil',
            badge: `${kunduzgiPrograms.length} ta yo'nalish`,
            formType: 'kunduzgi',
            color: '#4361ee',
            gradient: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
            programs: kunduzgiPrograms,
            description: 'To\'liq vaqtli, kunduzgi ta\'lim'
        },
        {
            icon: 'fa-moon',
            name: 'Kechki',
            duration: '4 yil',
            badge: `${kechkiPrograms.length} ta yo'nalish`,
            formType: 'kechki',
            color: '#f72585',
            gradient: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
            programs: kechkiPrograms,
            description: 'Ishlaydiganlar uchun kechki ta\'lim'
        },
        {
            icon: 'fa-clock',
            name: 'Sirtqi',
            duration: '5 yil',
            badge: `${sirtqiPrograms.length} ta yo'nalish`,
            formType: 'sirtqi',
            color: '#fb8b24',
            gradient: 'linear-gradient(135deg, #fb8b24 0%, #9c2e04 100%)',
            programs: sirtqiPrograms,
            description: 'Masofaviy va mustaqil ta\'lim'
        },
        {
            icon: 'fa-laptop',
            name: 'Masofaviy',
            duration: '4 yil',
            badge: `${masofaviyPrograms.length} ta yo'nalish`,
            formType: 'masofaviy',
            color: '#4cc9f0',
            gradient: 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)',
            programs: masofaviyPrograms,
            description: 'Onlayn va masofaviy ta\'lim'
        }
    ];
    
    // Formalarni chiroyli qilib ko'rsatish
    academicElements.bachelorForms.innerHTML = forms.map(form => {
        const hasPrograms = form.programs.length > 0;

        return `
        <div class="form-card ${hasPrograms ? '' : 'is-empty'}"
             onclick="${hasPrograms ? `showProgramsByForm('${form.formType}')` : 'showNoProgramsMessage()'}"
             style="--form-gradient: ${form.gradient}; --form-accent: ${form.color};"
             data-programs="${form.programs.length}">
            <div class="form-card-glow"></div>
            <div class="form-top">
                <div class="form-left">
                    <div class="form-icon">
                        <i class="fas ${form.icon}"></i>
                    </div>
                    <div class="form-heading">
                        <h3 class="form-title">${trAcademic(form.name)}</h3>
                        <p class="form-duration">${trAcademic(form.duration)}</p>
                        <p class="form-description">${trAcademic(form.description)}</p>
                    </div>
                </div>
                <div class="form-right">
                    <div class="form-actions">
                        <span class="form-badge">${trAcademic(form.badge)}</span>
                        <div class="form-status ${hasPrograms ? 'ready' : ''}">
                            <i class="fas ${hasPrograms ? 'fa-arrow-right' : 'fa-info-circle'}"></i>
                            ${trAcademic(hasPrograms ? "Yo'nalishlarni ko'rish" : "Tez orada")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    autoTranslateAcademic(academicElements.bachelorForms);
}

// Magistratura dasturlarini yuklash
function loadMasterPrograms() {
    if (!academicElements.masterPrograms) return;
    
    const masterPrograms = academicData?.programs?.master || [];
    
    if (masterPrograms.length === 0) {
        academicElements.masterPrograms.innerHTML = `
            <div class="no-programs">
                <i class="fas fa-graduation-cap"></i>
                <h3>${trAcademic("Hozircha magistratura yo'nalishlari mavjud emas")}</h3>
                <p>${trAcademic("Tez orada yangi yo'nalishlar qo'shiladi")}</p>
            </div>
        `;
        return;
    }
    
    // Magistratura dasturlarini chiroyli qilib ko'rsatish
    academicElements.masterPrograms.innerHTML = masterPrograms.map((program, index) => {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        
        const borderColors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];
        
        return `
        <div class="master-program-card" onclick="showMasterProgramDetail(${program.id})" 
             style="border-left-color: ${borderColors[index % borderColors.length]};">
            <h3>${trAcademic(program.name)}</h3>
            <div class="program-meta">
                <span><i class="fas fa-clock"></i> ${trAcademic(program.duration)}</span>
                <span><i class="fas fa-users"></i> ${isEnglishAcademic() ? `${program.seats} seats` : `${program.seats} o'rin`}</span>
                <span><i class="fas fa-code"></i> ${program.code}</span>
            </div>
            <p>${trAcademic(program.description).substring(0, 150)}...</p>
            <div class="program-footer">
                <span class="program-tag" style="background: ${gradients[index % gradients.length]};">
                    ${isEnglishAcademic() ? "Passing score" : "O'tish balli"}: ${program.score}
                </span>
                <span class="program-type">
                    <i class="fas fa-building"></i> ${trAcademic(program.department)}
                </span>
            </div>
        </div>
    `}).join('');
    autoTranslateAcademic(academicElements.masterPrograms);
}

function setAcademicLevel(level, scrollToSection = false) {
    // Level buttonlarni yangilash
    const buttons = document.querySelectorAll('.level-btn');
    buttons.forEach((btn) => {
        const isMasterBtn = !!btn.querySelector('[data-i18n="master"]') || /magistr/i.test(btn.textContent || '');
        const isActive = level === 'master' ? isMasterBtn : !isMasterBtn;
        btn.classList.toggle('active', isActive);
    });

    // Kontentni ko'rsatish
    if (level === 'bachelor') {
        academicElements.bachelorContent.classList.add('active');
        academicElements.masterContent.classList.remove('active');
    } else {
        academicElements.bachelorContent.classList.remove('active');
        academicElements.masterContent.classList.add('active');
    }

    if (scrollToSection) {
        const targetId = level === 'master' ? 'master-content' : 'bachelor-content';
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function applyAcademicHash() {
    const hash = (location.hash || '').replace('#', '').toLowerCase();
    if (!hash) return;
    if (hash.includes('master')) {
        setAcademicLevel('master', true);
    } else if (hash.includes('bachelor')) {
        setAcademicLevel('bachelor', true);
    }
}

// Ta'lim darajasini ko'rsatish
function showAcademicLevel(level) {
    setAcademicLevel(level);
}

// Forma bo'yicha dasturlarni ko'rsatish
function showProgramsByForm(formType) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    const formNames = {
        kunduzgi: 'Kunduzgi',
        kechki: 'Kechki',
        sirtqi: 'Sirtqi',
        masofaviy: 'Masofaviy'
    };
    
    // Ma'lumotlarni olish
    const bachelorPrograms = academicData?.programs?.bachelor || [];
    const extramuralPrograms = academicData?.programs?.extramural || [];
    
    let filteredPrograms = [];
    
    if (formType === 'kunduzgi') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Kunduzgi' || !p.form
        );
    } else if (formType === 'kechki') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Kechki' || p.form === 'Kechgi'
        );
    } else if (formType === 'sirtqi') {
        filteredPrograms = [
            ...extramuralPrograms,
            ...bachelorPrograms.filter(p => p.form === 'Sirtqi')
        ];
    } else if (formType === 'masofaviy') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Masofaviy'
        );
    }
    
    const formLabel = trAcademic(formNames[formType] || formType);
    modalTitle.textContent = isEnglishAcademic() ? `${formLabel} programs` : `${formLabel} ta'lim yo'nalishlari`;
    
    if (filteredPrograms.length > 0) {
        modalBody.innerHTML = `
            <div class="programs-list">
                ${filteredPrograms.map(program => `
                    <div class="program-item" onclick="showBachelorProgramDetail(${program.id}, '${formType}')">
                        <h3>${trAcademic(program.name)}</h3>
                        <div class="program-tags">
                            <span class="tag">Kod: ${program.code}</span>
                            <span class="tag">Muddat: ${program.duration}</span>
                            <span class="tag" style="background: ${program.score >= 130 ? '#10b981' : program.score >= 120 ? '#f59e0b' : '#ef4444'}; color: white;">
                                Ball: ${program.score}
                            </span>
                            <span class="tag">O'rin: ${isEnglishAcademic() ? `${program.seats} seats` : program.seats}</span>
                        </div>
                        <p>${program.description.substring(0, 120)}...</p>
                        <button class="btn btn-primary" style="margin-top: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                            <i class="fas fa-info-circle"></i> ${trAcademic("Batafsil ko'rish")}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="no-programs">
                <i class="fas fa-search" style="font-size: 5rem; color: #cbd5e0; margin-bottom: 30px;"></i>
                <h3>${trAcademic(`${formNames[formType]} yo'nalishlari topilmadi`)}</h3>
                <p>${trAcademic("Bu ta'lim shakli bo'yicha hozircha yo'nalishlar mavjud emas")}</p>
                <p style="margin-top: 20px; color: #718096;">${trAcademic("Tez orada yangi yo'nalishlar qo'shiladi")}</p>
            </div>
        `;
    }
    
    modal.classList.add('active');
    autoTranslateAcademic(modal);
}

// Yo'nalish mavjud emas xabari
function showNoProgramsMessage() {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    modalTitle.textContent = trAcademic("Ma'lumot mavjud emas");
    modalBody.innerHTML = `
        <div class="no-programs">
            <i class="fas fa-info-circle" style="font-size: 5rem; color: #cbd5e0; margin-bottom: 30px;"></i>
            <h3>${trAcademic("Hozircha yo'nalishlar mavjud emas")}</h3>
            <p>${trAcademic("Bu ta'lim shakli bo'yicha hozircha yo'nalishlar mavjud emas")}</p>
            <p style="margin-top: 20px; color: #718096;">${trAcademic("Tez orada yangi yo'nalishlar qo'shiladi")}</p>
        </div>
    `;
    
    modal.classList.add('active');
    autoTranslateAcademic(modal);
}

// Bakalavriat dasturi to'liq ma'lumotini ko'rsatish
function showBachelorProgramDetail(programId, formType) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    // data.json dan ma'lumot olish
    let program = null;
    
    if (formType === 'sirtqi') {
        program = academicData?.programs?.extramural?.find(p => p.id === programId);
    } else {
        program = academicData?.programs?.bachelor?.find(p => p.id === programId);
    }
    
    if (!program) return;
    
    modalTitle.textContent = trAcademic(program.name);
    
    // Fanlar va karyera ma'lumotlari
    const subjects = program.subjects || [
        "Makroiqtisodiyot", "Mikroiqtisodiyot", "Statistika", 
        "Ekonometrika", "Moliya", "Iqtisodiy tahlil"
    ];
    
    const career = program.career || [
        "Iqtisodchi", "Tahlilchi", "Mutaxassis", 
        "Menejer", "Maslahatchi", "Tadqiqotchi"
    ];
    
    modalBody.innerHTML = `
        <div class="program-full-info">
            <div class="info-section">
                <h3><i class="fas fa-info-circle"></i> ${trAcademic("Asosiy ma'lumotlar")}</h3>
                <table class="info-table">
                    <tr><td>${trAcademic("Kodi:")}</td><td><strong>${program.code}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim muddati:")}</td><td><strong>${trAcademic(program.duration)}</strong></td></tr>
                    <tr><td>${trAcademic("O'tish balli:")}</td><td><strong class="${program.score >= 130 ? 'high-score' : program.score >= 120 ? 'medium-score' : ''}">${program.score}</strong></td></tr>
                    <tr><td>${trAcademic("O'rinlar soni:")}</td><td><strong>${program.seats}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim shakli:")}</td><td><strong>${trAcademic(program.form || 'Kunduzgi')}</strong></td></tr>
                    <tr><td>${trAcademic("Kafedra:")}</td><td><strong>${trAcademic(program.department || 'Iqtisodiyot va turizm')}</strong></td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-align-left"></i> ${trAcademic("To'liq tavsif")}</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #4a5568;">${trAcademic(program.description)}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-book"></i> ${trAcademic("O'qitiladigan fanlar")}</h3>
                <div class="subjects-list">
                    ${subjects.map(subject => `<span class="subject-tag">${trAcademic(subject)}</span>`).join('')}
                </div>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-briefcase"></i> ${trAcademic("Karyera imkoniyatlari")}</h3>
                <div class="career-list">
                    ${career.map(c => `<span class="career-item"><i class="fas fa-check-circle"></i> ${trAcademic(c)}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="contact.html" class="btn btn-primary" onclick="closeProgramModal()">
                    <i class="fas fa-file-signature"></i> ${trAcademic("Aloqa bo'limi")}
                </a>
                <a href="contact.html" class="btn btn-outline" onclick="closeProgramModal()">
                    <i class="fas fa-calculator"></i> ${trAcademic("Ballarni hisoblash")}
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Magistratura dasturi detallarini ko'rsatish
function showMasterProgramDetail(programId) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    const program = academicData?.programs?.master?.find(p => p.id === programId);
    
    if (!program) return;
    
    modalTitle.textContent = trAcademic(program.name);
    
    const subjects = program.subjects || [
        "Iqtisodiyot nazariyasi", "Ilmiy tadqiqot metodologiyasi", 
        "Ekonometrika", "Global iqtisodiyot"
    ];
    
    const career = program.career || [
        "Ilmiy xodim", "Tadqiqotchi", "O'qituvchi", "Ekspert", "Analitik"
    ];
    
    modalBody.innerHTML = `
        <div class="program-full-info">
            <div class="info-section">
                <h3><i class="fas fa-info-circle"></i> ${trAcademic("Asosiy ma'lumotlar")}</h3>
                <table class="info-table">
                    <tr><td>${trAcademic("Kodi:")}</td><td><strong>${program.code}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim muddati:")}</td><td><strong>${trAcademic(program.duration)}</strong></td></tr>
                    <tr><td>${trAcademic("O'tish balli:")}</td><td><strong class="${program.score >= 70 ? 'high-score' : 'medium-score'}">${program.score}</strong></td></tr>
                    <tr><td>${trAcademic("O'rinlar soni:")}</td><td><strong>${program.seats}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim shakli:")}</td><td><strong>${trAcademic(program.form || 'Kunduzgi')}</strong></td></tr>
                    <tr><td>${trAcademic("Kafedra:")}</td><td><strong>${trAcademic(program.department || 'Iqtisodiyot va turizm')}</strong></td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-align-left"></i> ${trAcademic("To'liq tavsif")}</h3>
                <p style="font-size: 1.1rem; line-height: 1.8;">${trAcademic(program.description)}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-book"></i> ${trAcademic("O'qitiladigan fanlar")}</h3>
                <div class="subjects-list">
                    ${subjects.map(subject => `<span class="subject-tag">${trAcademic(subject)}</span>`).join('')}
                </div>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-briefcase"></i> ${trAcademic("Karyera imkoniyatlari")}</h3>
                <div class="career-list">
                    ${career.map(c => `<span class="career-item"><i class="fas fa-check-circle"></i> ${trAcademic(c)}</span>`).join('')}
                </div>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-flask"></i> Ilmiy yo'nalishlar</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <span class="subject-tag" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">Iqtisodiyot nazariyasi</span>
                    <span class="subject-tag" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">Ekonometrik modellashtirish</span>
                    <span class="subject-tag" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">Makroiqtisodiy tahlil</span>
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="contact.html" class="btn btn-primary" onclick="closeProgramModal()">
                    <i class="fas fa-file-signature"></i> ${trAcademic("Aloqa bo'limi")}
                </a>
                <a href="contact.html" class="btn btn-outline" onclick="closeProgramModal()">
                    <i class="fas fa-calculator"></i> ${trAcademic("Ballarni hisoblash")}
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Modalni yopish
function closeProgramModal() {
    const modal = academicElements.programModal;
    modal.classList.remove('active');
}

// Modalni tashqariga bosilganda yopish
window.onclick = function(event) {
    const modal = academicElements.programModal;
    if (event.target === modal) {
        closeProgramModal();
    }
}

// Global funksiyalar
window.showAcademicLevel = showAcademicLevel;
window.showProgramsByForm = showProgramsByForm;
window.showMasterProgramDetail = showMasterProgramDetail;
window.showBachelorProgramDetail = showBachelorProgramDetail;
window.showNoProgramsMessage = showNoProgramsMessage;
window.closeProgramModal = closeProgramModal;

// Modal ochilganda body scroll to'xtatish
function openModal() {
    const modal = academicElements.programModal;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Modal yopilganda body scroll qaytarish
function closeProgramModal() {
    const modal = academicElements.programModal;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Forma bo'yicha dasturlarni ko'rsatish (yangilangan)
function showProgramsByForm(formType) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    const formNames = {
        kunduzgi: 'Kunduzgi',
        kechki: 'Kechki',
        sirtqi: 'Sirtqi',
        masofaviy: 'Masofaviy'
    };
    
    // Ma'lumotlarni olish
    const bachelorPrograms = academicData?.programs?.bachelor || [];
    const extramuralPrograms = academicData?.programs?.extramural || [];
    
    let filteredPrograms = [];
    
    if (formType === 'kunduzgi') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Kunduzgi' || !p.form
        );
    } else if (formType === 'kechki') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Kechki' || p.form === 'Kechgi'
        );
    } else if (formType === 'sirtqi') {
        filteredPrograms = [
            ...extramuralPrograms,
            ...bachelorPrograms.filter(p => p.form === 'Sirtqi')
        ];
    } else if (formType === 'masofaviy') {
        filteredPrograms = bachelorPrograms.filter(p => 
            p.form === 'Masofaviy'
        );
    }
    
    const formLabel = trAcademic(formNames[formType] || formType);
    modalTitle.textContent = isEnglishAcademic() ? `${formLabel} programs` : `${formLabel} ta'lim yo'nalishlari`;
    
    if (filteredPrograms.length > 0) {
        modalBody.innerHTML = `
            <div class="programs-list">
                ${filteredPrograms.map(program => `
                    <div class="program-item" onclick="showBachelorProgramDetail(${program.id}, '${formType}')">
                        <h3>${trAcademic(program.name)}</h3>
                        <div class="program-tags">
                            <span class="tag"><i class="fas fa-code"></i> ${program.code}</span>
                            <span class="tag"><i class="fas fa-clock"></i> ${trAcademic(program.duration)}</span>
                            <span class="tag" style="background: ${program.score >= 130 ? '#10b981' : program.score >= 120 ? '#f59e0b' : '#ef4444'}; color: white;">
                                <i class="fas fa-star"></i> ${isEnglishAcademic() ? `${program.score} points` : `${program.score} ball`}
                            </span>
                            <span class="tag"><i class="fas fa-users"></i> ${isEnglishAcademic() ? `${program.seats} seats` : `${program.seats} o'rin`}</span>
                        </div>
                        <p>${trAcademic(program.description).substring(0, 150)}...</p>
                        <button class="btn-primary">
                            <i class="fas fa-info-circle"></i> ${trAcademic("Batafsil ko'rish")}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="no-programs">
                <i class="fas fa-search"></i>
                <h3>${isEnglishAcademic() ? `${formLabel} programs not found` : `${formNames[formType]} yo'nalishlari topilmadi`}</h3>
                <p>${trAcademic("Bu ta'lim shakli bo'yicha hozircha yo'nalishlar mavjud emas")}</p>
                <p style="margin-top: 15px; color: #a0aec0;">${trAcademic("Tez orada yangi yo'nalishlar qo'shiladi")}</p>
            </div>
        `;
    }
    
    openModal();
    autoTranslateAcademic(modal);
}

// Bakalavriat dasturi to'liq ma'lumotini ko'rsatish (yangilangan)
function showBachelorProgramDetail(programId, formType) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    // data.json dan ma'lumot olish
    let program = null;
    
    if (formType === 'sirtqi') {
        program = academicData?.programs?.extramural?.find(p => p.id === programId);
    } else {
        program = academicData?.programs?.bachelor?.find(p => p.id === programId);
    }
    
    if (!program) return;
    
    modalTitle.textContent = trAcademic(program.name);
    
    // Fanlar va karyera ma'lumotlari
    const subjects = program.subjects || [
        "Makroiqtisodiyot", "Mikroiqtisodiyot", "Statistika", 
        "Ekonometrika", "Moliya", "Iqtisodiy tahlil"
    ];
    
    const career = program.career || [
        "Iqtisodchi", "Tahlilchi", "Mutaxassis", 
        "Menejer", "Maslahatchi", "Tadqiqotchi"
    ];
    
    modalBody.innerHTML = `
        <div class="program-full-info">
            <div class="info-section">
                <h3><i class="fas fa-info-circle"></i> ${trAcademic("Asosiy ma'lumotlar")}</h3>
                <table class="info-table">
                    <tr><td>${trAcademic("Kodi:")}</td><td><strong>${program.code}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim muddati:")}</td><td><strong>${trAcademic(program.duration)}</strong></td></tr>
                    <tr><td>${trAcademic("O'tish balli:")}</td><td><strong class="${program.score >= 130 ? 'high-score' : ''}">${program.score}</strong></td></tr>
                    <tr><td>${trAcademic("O'rinlar soni:")}</td><td><strong>${program.seats}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim shakli:")}</td><td><strong>${trAcademic(program.form || 'Kunduzgi')}</strong></td></tr>
                    <tr><td>${trAcademic("Kafedra:")}</td><td><strong>${trAcademic(program.department || 'Iqtisodiyot va turizm')}</strong></td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-align-left"></i> ${trAcademic("To'liq tavsif")}</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #4a5568;">${trAcademic(program.description)}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-book"></i> ${trAcademic("O'qitiladigan fanlar")}</h3>
                <div class="subjects-list">
                    ${subjects.map(subject => `<span class="subject-tag">${trAcademic(subject)}</span>`).join('')}
                </div>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-briefcase"></i> ${trAcademic("Karyera imkoniyatlari")}</h3>
                <div class="career-list">
                    ${career.map(c => `<span class="career-item"><i class="fas fa-check-circle"></i> ${trAcademic(c)}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="contact.html" class="btn-primary" onclick="closeProgramModal()">
                    <i class="fas fa-file-signature"></i> ${trAcademic("Aloqa bo'limi")}
                </a>
                <a href="contact.html" class="btn-outline" onclick="closeProgramModal()">
                    <i class="fas fa-calculator"></i> ${trAcademic("Ballarni hisoblash")}
                </a>
            </div>
        </div>
    `;
    
    openModal();
    autoTranslateAcademic(modal);
}

// Magistratura dasturi detallarini ko'rsatish (yangilangan)
function showMasterProgramDetail(programId) {
    const modal = academicElements.programModal;
    const modalTitle = academicElements.modalTitle;
    const modalBody = academicElements.modalBody;
    
    const program = academicData?.programs?.master?.find(p => p.id === programId);
    
    if (!program) return;
    
    modalTitle.textContent = trAcademic(program.name);
    
    const subjects = program.subjects || [
        "Iqtisodiyot nazariyasi", "Ilmiy tadqiqot metodologiyasi", 
        "Ekonometrika", "Global iqtisodiyot"
    ];
    
    const career = program.career || [
        "Ilmiy xodim", "Tadqiqotchi", "O'qituvchi", "Ekspert", "Analitik"
    ];
    
    modalBody.innerHTML = `
        <div class="program-full-info">
            <div class="info-section">
                <h3><i class="fas fa-info-circle"></i> ${trAcademic("Asosiy ma'lumotlar")}</h3>
                <table class="info-table">
                    <tr><td>${trAcademic("Kodi:")}</td><td><strong>${program.code}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim muddati:")}</td><td><strong>${trAcademic(program.duration)}</strong></td></tr>
                    <tr><td>${trAcademic("O'tish balli:")}</td><td><strong class="${program.score >= 70 ? 'high-score' : ''}">${program.score}</strong></td></tr>
                    <tr><td>${trAcademic("O'rinlar soni:")}</td><td><strong>${program.seats}</strong></td></tr>
                    <tr><td>${trAcademic("Ta'lim shakli:")}</td><td><strong>${trAcademic(program.form || 'Kunduzgi')}</strong></td></tr>
                    <tr><td>${trAcademic("Kafedra:")}</td><td><strong>${trAcademic(program.department || 'Iqtisodiyot va turizm')}</strong></td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-align-left"></i> ${trAcademic("To'liq tavsif")}</h3>
                <p style="font-size: 1.1rem; line-height: 1.8;">${trAcademic(program.description)}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-book"></i> ${trAcademic("O'qitiladigan fanlar")}</h3>
                <div class="subjects-list">
                    ${subjects.map(subject => `<span class="subject-tag">${trAcademic(subject)}</span>`).join('')}
                </div>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-briefcase"></i> ${trAcademic("Karyera imkoniyatlari")}</h3>
                <div class="career-list">
                    ${career.map(c => `<span class="career-item"><i class="fas fa-check-circle"></i> ${trAcademic(c)}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="contact.html" class="btn-primary" onclick="closeProgramModal()">
                    <i class="fas fa-file-signature"></i> ${trAcademic("Aloqa bo'limi")}
                </a>
                <a href="contact.html" class="btn-outline" onclick="closeProgramModal()">
                    <i class="fas fa-calculator"></i> ${trAcademic("Ballarni hisoblash")}
                </a>
            </div>
        </div>
    `;
    
    openModal();
    autoTranslateAcademic(modal);
}

// Modalni tashqariga bosilganda yopish
window.onclick = function(event) {
    const modal = academicElements.programModal;
    if (event.target === modal) {
        closeProgramModal();
    }
}

// Escape tugmasi bosilganda modalni yopish
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProgramModal();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    autoTranslateAcademic(document.body);
});


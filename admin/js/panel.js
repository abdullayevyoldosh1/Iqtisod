let siteData = null;
const AUTH_KEY = "admin_panel_auth";
const DATA_KEY = "siteData";
const PERSIST_DB_NAME = "tdu_site_storage";
const PERSIST_STORE_NAME = "kv";
const PERSIST_SITE_KEY = "siteData";
let editingNewsId = null;
let editingLeadershipId = null;
let editingProgramId = null;
let editingProgramType = null;
let editingDepartmentId = null;
let editingTeacherInfoId = null;
let editingClubId = null;
const SITE_SYNC_CHANNEL = "tdu_site_sync";
let adminSyncChannel = null;
try {
    adminSyncChannel = new BroadcastChannel(SITE_SYNC_CHANNEL);
} catch (error) {
    // ignore
}

document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;
    initTabs();
    initForms();
    initSave();
    initExport();
    initLogout();
    loadData();
});

function checkAuth() {
    if (sessionStorage.getItem(AUTH_KEY) !== "ok") {
        window.location.href = "index.html";
        return false;
    }
    return true;
}

function openPersistDb() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(PERSIST_DB_NAME, 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(PERSIST_STORE_NAME)) {
                db.createObjectStore(PERSIST_STORE_NAME);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function readPersistentSiteData() {
    try {
        const db = await openPersistDb();
        const value = await new Promise((resolve, reject) => {
            const tx = db.transaction(PERSIST_STORE_NAME, "readonly");
            const req = tx.objectStore(PERSIST_STORE_NAME).get(PERSIST_SITE_KEY);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
        db.close();
        if (value && typeof value === "object") {
            localStorage.setItem(DATA_KEY, JSON.stringify(value));
            return value;
        }
    } catch (error) {
        // ignore
    }

    try {
        const raw = localStorage.getItem(DATA_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") return parsed;
        }
    } catch (error) {
        // ignore
    }

    return null;
}

async function savePersistentSiteData(data) {
    const payload = JSON.parse(JSON.stringify(data || {}));
    try {
        localStorage.setItem(DATA_KEY, JSON.stringify(payload));
    } catch (error) {
        // Fallback to IndexedDB only when localStorage quota is exceeded
        localStorage.removeItem(DATA_KEY);
    }
    try {
        const db = await openPersistDb();
        await new Promise((resolve, reject) => {
            const tx = db.transaction(PERSIST_STORE_NAME, "readwrite");
            tx.objectStore(PERSIST_STORE_NAME).put(payload, PERSIST_SITE_KEY);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
        db.close();
    } catch (error) {
        // localStorage already has data
    }
}

async function loadData() {
    let fileData = null;
    try {
        const response = await fetch("../data.json");
        if (!response.ok) throw new Error("data.json topilmadi");
        fileData = await response.json();
    } catch (error) {
        fileData = null;
    }

    const savedData = await readPersistentSiteData();
    if (savedData) {
        siteData = mergeDeep(fileData || {}, savedData);
    } else {
        siteData = fileData;
    }

    if (Array.isArray(fileData?.stats)) {
        siteData.stats = fileData.stats;
    }

    if (siteData) {
        ensureCampusShape();
        ensureLeadershipShape();
        ensureTeacherInfoShape();
        renderAll();
        return;
    }

    siteData = {
        news: [],
        programs: { bachelor: [], master: [], extramural: [] },
        departments: [],
        campus: { achievements: [], upcomingEvents: [], clubs: [], facilities: [] }
    };

    ensureCampusShape();
    ensureLeadershipShape();
    ensureTeacherInfoShape();
    renderAll();
}

function mergeDeep(base, override) {
    if (Array.isArray(override)) return override;
    if (override === null || override === undefined) return base;

    const baseIsObject = base && typeof base === "object" && !Array.isArray(base);
    const overrideIsObject = typeof override === "object" && !Array.isArray(override);

    if (!baseIsObject || !overrideIsObject) return override;

    const result = { ...base };
    Object.keys(override).forEach((key) => {
        result[key] = mergeDeep(base?.[key], override[key]);
    });
    return result;
}

function ensureCampusShape() {
    if (!siteData.campus) siteData.campus = {};
    if (!Array.isArray(siteData.campus.achievements)) siteData.campus.achievements = [];
    if (!Array.isArray(siteData.campus.upcomingEvents)) siteData.campus.upcomingEvents = [];
    if (!Array.isArray(siteData.campus.clubs)) siteData.campus.clubs = [];
    if (!Array.isArray(siteData.campus.facilities)) siteData.campus.facilities = [];
    assignMissingIds(siteData.campus.achievements);
    assignMissingIds(siteData.campus.upcomingEvents);
    assignMissingIds(siteData.campus.clubs);
}

function ensureLeadershipShape() {
    if (!Array.isArray(siteData.rahbariyat)) siteData.rahbariyat = [];
}

function ensureTeacherInfoShape() {
    if (!Array.isArray(siteData.teacherDetails)) siteData.teacherDetails = [];
}

function initTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const tabs = document.querySelectorAll(".tab-content");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active"));
            tabs.forEach((t) => t.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
        });
    });
}

function initSave() {
    document.getElementById("saveBtn").addEventListener("click", async () => {
        savePersistentSiteData(siteData);
        const serverOk = await saveSiteDataToServer(siteData);
        showToast(serverOk ? "Ma'lumotlar saqlandi" : "Lokal saqlandi, serverga yozilmadi");
    });
}

function initExport() {
    const exportBtn = document.getElementById("exportBtn");
    if (!exportBtn) return;
    exportBtn.addEventListener("click", () => {
        if (!siteData) {
            showToast("Ma'lumot topilmadi");
            return;
        }
        ensureCampusShape();
        ensureLeadershipShape();
        ensureTeacherInfoShape();
        const payload = JSON.parse(JSON.stringify(siteData || {}));
        const json = JSON.stringify(payload, null, 2);
        downloadJsonFile(json, "data.json");
        showToast("data.json yuklab olindi");
    });
}

function initLogout() {
    document.getElementById("logoutBtn").addEventListener("click", () => {
        sessionStorage.removeItem(AUTH_KEY);
        window.location.href = "index.html";
    });
}

function initForms() {
    const programType = document.querySelector('#programForm select[name="type"]');
    const bachelorForm = document.getElementById("bachelorForm");

    function toggleBachelorForm() {
        const isBachelor = programType.value === "bachelor";
        bachelorForm.style.display = isBachelor ? "block" : "none";
        bachelorForm.required = isBachelor;
    }

    programType.addEventListener("change", toggleBachelorForm);
    toggleBachelorForm();

    document.getElementById("newsForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        siteData.news = siteData.news || [];
        const image = await resolveNewsImage(form, editingNewsId);

        if (editingNewsId) {
            const target = siteData.news.find((item) => item.id === editingNewsId);
            if (target) {
                target.title = form.get("title");
                target.date = form.get("date");
                target.category = form.get("category");
                target.description = form.get("description");
                target.image = image;
            }
            showToast("Yangilik tahrirlandi");
        } else {
            siteData.news.unshift({
                id: Date.now(),
                title: form.get("title"),
                date: form.get("date"),
                category: form.get("category"),
                description: form.get("description"),
                image
            });
        }

        cancelNewsEdit();
        persistAndRender();
    });

    document.getElementById("newsCancelEditBtn").addEventListener("click", () => {
        cancelNewsEdit();
    });

    document.getElementById("programForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const type = form.get("type");
        const selectedBachelorFormRaw = form.get("bachelorForm");
        const selectedBachelorForm = selectedBachelorFormRaw === "Kechgi" ? "Kechki" : selectedBachelorFormRaw;
        siteData.programs = siteData.programs || { bachelor: [], master: [], extramural: [] };

        const isSirtqiBachelor = type === "bachelor" && selectedBachelorForm === "Sirtqi";
        const targetType = isSirtqiBachelor ? "extramural" : type;
        const resolvedForm = type === "bachelor" ? selectedBachelorForm : "Kunduzgi";
        const programPayload = {
            id: editingProgramId || Date.now(),
            name: form.get("name"),
            code: form.get("code"),
            duration: form.get("duration"),
            score: Number(form.get("score")),
            seats: Number(form.get("seats")),
            department: form.get("department"),
            description: form.get("description"),
            form: resolvedForm,
            subjects: parseListInput(form.get("subjects")),
            career: parseListInput(form.get("career"))
        };

        if (editingProgramId && editingProgramType) {
            siteData.programs[editingProgramType] = (siteData.programs[editingProgramType] || [])
                .filter((item) => item.id !== editingProgramId);
            siteData.programs[targetType] = siteData.programs[targetType] || [];
            siteData.programs[targetType].unshift(programPayload);
            showToast("Yo'nalish tahrirlandi");
            cancelProgramEdit();
        } else {
            siteData.programs[targetType] = siteData.programs[targetType] || [];
            siteData.programs[targetType].unshift(programPayload);
            e.target.reset();
            toggleBachelorForm();
        }

        persistAndRender();
    });

    document.getElementById("programCancelEditBtn").addEventListener("click", () => {
        cancelProgramEdit();
        toggleBachelorForm();
    });

    document.getElementById("departmentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        siteData.departments = siteData.departments || [];
        const teachersList = parseTeachersList(form.get("teachersList"));

        if (editingDepartmentId) {
            const target = siteData.departments.find((item) => item.id === editingDepartmentId);
            if (target) {
                target.name = form.get("name");
                target.head = form.get("head");
                target.teachers = Number(form.get("teachers"));
                target.students = Number(form.get("students"));
                target.description = form.get("description");
                target.teachersList = teachersList;
            }
            showToast("Kafedra tahrirlandi");
            cancelDepartmentEdit();
        } else {
            siteData.departments.unshift({
                id: Date.now(),
                name: form.get("name"),
                head: form.get("head"),
                teachers: Number(form.get("teachers")),
                students: Number(form.get("students")),
                description: form.get("description"),
                teachersList
            });
            e.target.reset();
        }
        persistAndRender();
    });

    document.getElementById("departmentCancelEditBtn").addEventListener("click", () => {
        cancelDepartmentEdit();
    });

    document.getElementById("leadershipForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        ensureLeadershipShape();
        const rasm = await resolveLeaderImage(form, editingLeadershipId);

        if (editingLeadershipId) {
            const target = siteData.rahbariyat.find((item) => item.id === editingLeadershipId);
            if (target) {
                target.ism = form.get("name");
                target.lavozim = form.get("position");
                target.mutaxassislik = form.get("degree");
                target.qabulVaqti = form.get("reception");
                target.telefon = form.get("phone");
                target.email = form.get("email");
                target.telegram = form.get("telegram");
                target.manzil = form.get("address");
                target.rasm = rasm;
            }
            showToast("Rahbar ma'lumoti tahrirlandi");
        } else {
            siteData.rahbariyat.unshift({
                id: Date.now(),
                ism: form.get("name"),
                lavozim: form.get("position"),
                mutaxassislik: form.get("degree"),
                qabulVaqti: form.get("reception"),
                telefon: form.get("phone"),
                email: form.get("email"),
                telegram: form.get("telegram"),
                manzil: form.get("address"),
                rasm
            });
        }

        cancelLeadershipEdit();
        persistAndRender();
    });

    document.getElementById("leadershipCancelEditBtn").addEventListener("click", () => {
        cancelLeadershipEdit();
    });

    document.getElementById("teacherInfoForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        ensureTeacherInfoShape();
        const image = await resolveTeacherInfoImage(form, editingTeacherInfoId);
        const payload = {
            id: editingTeacherInfoId || Date.now(),
            departmentId: Number(form.get("departmentId")),
            name: form.get("name"),
            degree: form.get("degree"),
            specialty: form.get("specialty"),
            bio: form.get("bio"),
            image,
            scientificWorks: parseListInput(form.get("scientificWorks")),
            achievements: parseListInput(form.get("achievements"))
        };

        if (editingTeacherInfoId) {
            siteData.teacherDetails = (siteData.teacherDetails || []).filter((item) => item.id !== editingTeacherInfoId);
            siteData.teacherDetails.unshift(payload);
            showToast("O'qituvchi ma'lumoti tahrirlandi");
            cancelTeacherInfoEdit();
        } else {
            siteData.teacherDetails.unshift(payload);
            e.target.reset();
        }
        persistAndRender();
    });

    document.getElementById("teacherInfoCancelEditBtn").addEventListener("click", () => {
        cancelTeacherInfoEdit();
    });

    document.getElementById("achievementForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        ensureCampusShape();
        siteData.campus.achievements.unshift({
            id: Date.now(),
            title: form.get("title"),
            year: Number(form.get("year")) || form.get("year"),
            result: form.get("result"),
            description: form.get("description")
        });
        e.target.reset();
        persistAndRender();
    });

    document.getElementById("eventForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        ensureCampusShape();
        const image = await resolveEventImage(form);
        siteData.campus.upcomingEvents.unshift({
            id: Date.now(),
            day: form.get("day"),
            month: form.get("month"),
            title: form.get("title"),
            description: form.get("description"),
            image
        });
        e.target.reset();
        persistAndRender();
    });

    document.getElementById("clubForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        ensureCampusShape();

        const payload = {
            id: editingClubId || Date.now(),
            name: form.get("name"),
            icon: form.get("icon"),
            description: form.get("description"),
            members: Number(form.get("members")) || 0
        };

        if (editingClubId) {
            siteData.campus.clubs = (siteData.campus.clubs || []).filter((item) => item.id !== editingClubId);
            siteData.campus.clubs.unshift(payload);
            showToast("Klub tahrirlandi");
            cancelClubEdit();
        } else {
            siteData.campus.clubs.unshift(payload);
            e.target.reset();
        }

        persistAndRender();
    });

    document.getElementById("clubCancelEditBtn").addEventListener("click", () => {
        cancelClubEdit();
    });
}

function renderAll() {
    renderStats();
    renderNews();
    renderPrograms();
    renderDepartments();
    renderLeadershipAdmin();
    renderTeacherInfoAdmin();
    renderTeacherDepartmentOptions();
    renderCampusAdmin();
    renderContactsAdmin();
}

function renderStats() {
    const programsCount =
        (siteData.programs?.bachelor?.length || 0) +
        (siteData.programs?.master?.length || 0) +
        (siteData.programs?.extramural?.length || 0);

    const contacts = getContacts();

    document.getElementById("statsGrid").innerHTML = [
        { label: "Yangiliklar", value: siteData.news?.length || 0 },
        { label: "Yo'nalishlar", value: programsCount },
        { label: "Kafedralar", value: siteData.departments?.length || 0 },
        { label: "Murojaatlar", value: contacts.length }
    ]
        .map(
            (item) => `
            <div class="stat-box">
                <p>${item.label}</p>
                <h3>${item.value}</h3>
            </div>
        `
        )
        .join("");
}

function renderNews() {
    const list = (siteData.news || [])
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.title)}</div>
                    <div class="item-meta">${escapeHtml(item.category)} | ${escapeHtml(item.date || "")}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="startEditNews(${item.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="removeNews(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");
    document.getElementById("newsList").innerHTML = `<div class="data-list">${list || "<p>Ma'lumot yo'q</p>"}</div>`;
}

function renderPrograms() {
    const bachelor = siteData.programs?.bachelor || [];
    const master = siteData.programs?.master || [];
    const extramural = siteData.programs?.extramural || [];

    const groups = [
        {
            title: "Bakalavr - Kunduzgi",
            items: bachelor.filter((p) => !p.form || p.form === "Kunduzgi"),
            key: "bachelor"
        },
        {
            title: "Bakalavr - Kechki",
            items: bachelor.filter((p) => p.form === "Kechki" || p.form === "Kechgi"),
            key: "bachelor"
        },
        {
            title: "Bakalavr - Masofaviy",
            items: bachelor.filter((p) => p.form === "Masofaviy"),
            key: "bachelor"
        },
        {
            title: "Bakalavr - Sirtqi",
            items: [...bachelor.filter((p) => p.form === "Sirtqi"), ...extramural],
            key: "mixed-sirtqi"
        },
        {
            title: "Magistratura",
            items: master,
            key: "master"
        }
    ];

    const html = groups
        .map((group) => {
            const list = group.items
                .map((item) => {
                    const storageKey = item.form === "Sirtqi" && extramural.some((x) => x.id === item.id) ? "extramural" : (group.key === "master" ? "master" : "bachelor");
                    return `
                        <div class="data-item">
                            <div>
                                <div class="item-title">${escapeHtml(item.name)}</div>
                                <div class="item-meta">${escapeHtml(item.code)} | ball: ${item.score} | ${escapeHtml(item.form || "")}</div>
                                <div class="item-meta">Fanlar: ${(item.subjects || []).length} | Karyera: ${(item.career || []).length}</div>
                            </div>
                            <div class="item-actions">
                                <button class="edit-btn" onclick="startEditProgram('${storageKey}', ${item.id})"><i class="fas fa-pen"></i></button>
                                <button onclick="removeProgram('${storageKey}', ${item.id})"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                })
                .join("");

            return `
                <div class="program-group">
                    <h3>${group.title} (${group.items.length})</h3>
                    <div class="data-list">${list || "<p>Ma'lumot yo'q</p>"}</div>
                </div>
            `;
        })
        .join("");

    document.getElementById("programList").innerHTML = html;
}

function renderDepartments() {
    const list = (siteData.departments || [])
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.name)}</div>
                    <div class="item-meta">${escapeHtml(item.head)} | talabalar: ${item.students}</div>
                    <div class="item-meta">Asosiy o'qituvchilar: ${(item.teachersList || []).length}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="startEditDepartment(${item.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="removeDepartment(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");

    document.getElementById("departmentList").innerHTML = `<div class="data-list">${list || "<p>Ma'lumot yo'q</p>"}</div>`;
}

function renderLeadershipAdmin() {
    ensureLeadershipShape();
    const list = (siteData.rahbariyat || [])
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.ism || "")}</div>
                    <div class="item-meta">${escapeHtml(item.lavozim || "")}</div>
                    <div class="item-meta">${escapeHtml(item.mutaxassislik || "")}</div>
                    ${item.telefon ? `<div class="item-meta">Tel: ${escapeHtml(item.telefon)}</div>` : ""}
                    ${item.email ? `<div class="item-meta">Email: ${escapeHtml(item.email)}</div>` : ""}
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="startEditLeadership(${item.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="removeLeadership(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");

    document.getElementById("leadershipList").innerHTML = `<div class="data-list">${list || "<p>Rahbariyat ma'lumoti yo'q</p>"}</div>`;
}

function renderTeacherDepartmentOptions() {
    const select = document.getElementById("teacherInfoDepartment");
    if (!select) return;
    const departments = siteData.departments || [];
    const current = select.value;

    select.innerHTML = departments.length
        ? departments.map((dept) => `<option value="${dept.id}">${escapeHtml(dept.name)}</option>`).join("")
        : `<option value="">Avval kafedra qo'shing</option>`;

    if (current && departments.some((d) => String(d.id) === String(current))) {
        select.value = current;
    }
}

function renderTeacherInfoAdmin() {
    ensureTeacherInfoShape();
    const deptMap = new Map((siteData.departments || []).map((d) => [Number(d.id), d.name]));
    const list = siteData.teacherDetails
        .map((item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.name || "")}</div>
                    <div class="item-meta">${escapeHtml(deptMap.get(Number(item.departmentId)) || "Kafedra topilmadi")}</div>
                    <div class="item-meta">${escapeHtml(item.degree || "")}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="startEditTeacherInfo(${item.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="removeTeacherInfo(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `)
        .join("");

    document.getElementById("teacherInfoList").innerHTML = `<div class="data-list">${list || "<p>O'qituvchi ma'lumoti yo'q</p>"}</div>`;
}

function renderCampusAdmin() {
    ensureCampusShape();

    const clubs = siteData.campus.clubs
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.name || "")}</div>
                    <div class="item-meta">icon: fa-${escapeHtml(item.icon || "")} | a'zolar: ${escapeHtml(item.members ?? "")}</div>
                    <div class="item-meta">${escapeHtml(item.description || "")}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="startEditClub(${item.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="removeClub(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");
    document.getElementById("clubList").innerHTML = `<div class="data-list">${clubs || "<p>Klublar mavjud emas</p>"}</div>`;

    const achievements = siteData.campus.achievements
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.title)}</div>
                    <div class="item-meta">${escapeHtml(item.year)} | ${escapeHtml(item.result || "")}</div>
                    <div class="item-meta">${escapeHtml(item.description || "")}</div>
                </div>
                <div class="item-actions">
                    <button onclick="removeAchievement(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");
    document.getElementById("achievementList").innerHTML = `<div class="data-list">${achievements || "<p>Yutuqlar mavjud emas</p>"}</div>`;

    const events = siteData.campus.upcomingEvents
        .map(
            (item) => `
            <div class="data-item">
                <div class="item-stack">
                    <div class="item-thumb" style="${getAdminImageStyle(item.image)}"></div>
                    <div>
                        <div class="item-title">${escapeHtml(item.title)}</div>
                        <div class="item-meta">${escapeHtml(item.day)} ${escapeHtml(item.month)}</div>
                        <div class="item-meta">${escapeHtml(item.description || "")}</div>
                        <div class="item-meta">${escapeHtml(item.image || "")}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button onclick="removeCampusEvent(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");
    document.getElementById("eventList").innerHTML = `<div class="data-list">${events || "<p>Tadbirlar mavjud emas</p>"}</div>`;
}

function renderContactsAdmin() {
    const contacts = getContacts();
    const list = contacts
        .slice()
        .reverse()
        .map(
            (item) => `
            <div class="data-item">
                <div>
                    <div class="item-title">${escapeHtml(item.name || "Noma'lum")}</div>
                    <div class="item-meta">${escapeHtml(item.phone || "")} | ${escapeHtml(item.email || "")}</div>
                    <div class="item-meta">Mavzu: ${escapeHtml(item.subject || "")} | Sana: ${escapeHtml(formatAdminDate(item.date))}</div>
                    <div class="item-meta">${escapeHtml(item.message || "")}</div>
                    <div class="item-meta">Holat: ${item.reviewed ? "Ko'rib chiqildi" : "Yangi"}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="toggleContactReviewed(${item.id})">
                        <i class="fas ${item.reviewed ? "fa-rotate-left" : "fa-check"}"></i>
                    </button>
                    <button onclick="removeContact(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `
        )
        .join("");

    const container = document.getElementById("contactList");
    if (container) {
        container.innerHTML = `<div class="data-list">${list || "<p>Murojaatlar mavjud emas</p>"}</div>`;
    }
}

function removeNews(id) {
    siteData.news = (siteData.news || []).filter((item) => item.id !== id);
    if (editingNewsId === id) {
        cancelNewsEdit();
    }
    persistAndRender();
}

function startEditNews(id) {
    const target = (siteData.news || []).find((item) => item.id === id);
    if (!target) return;

    editingNewsId = id;
    const form = document.getElementById("newsForm");
    form.elements.id.value = String(id);
    form.elements.title.value = target.title || "";
    form.elements.date.value = target.date || "";
    form.elements.category.value = target.category || "";
    form.elements.description.value = target.description || "";
    form.elements.imageUrl.value = target.image || "";
    form.elements.imageFile.value = "";

    document.getElementById("newsSubmitBtn").textContent = "Saqlash";
    document.getElementById("newsCancelEditBtn").style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelNewsEdit() {
    editingNewsId = null;
    const form = document.getElementById("newsForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("newsSubmitBtn").textContent = "Qo'shish";
    document.getElementById("newsCancelEditBtn").style.display = "none";
}

function removeProgram(type, id) {
    siteData.programs[type] = (siteData.programs[type] || []).filter((item) => item.id !== id);
    if (editingProgramId === id) {
        cancelProgramEdit();
    }
    persistAndRender();
}

function startEditProgram(type, id) {
    const target = (siteData.programs?.[type] || []).find((item) => item.id === id);
    if (!target) return;

    editingProgramId = id;
    editingProgramType = type;
    const form = document.getElementById("programForm");

    const resolvedType = type === "extramural" ? "bachelor" : type;
    const normalizedForm = target.form === "Kechgi" ? "Kechki" : target.form;
    const resolvedForm = type === "extramural" ? "Sirtqi" : (normalizedForm || "Kunduzgi");

    form.elements.id.value = String(id);
    form.elements.type.value = resolvedType;
    form.elements.bachelorForm.value = resolvedForm;
    form.elements.name.value = target.name || "";
    form.elements.code.value = target.code || "";
    form.elements.duration.value = target.duration || "";
    form.elements.score.value = target.score ?? "";
    form.elements.seats.value = target.seats ?? "";
    form.elements.department.value = target.department || "";
    form.elements.description.value = target.description || "";
    form.elements.subjects.value = (target.subjects || []).join("\n");
    form.elements.career.value = (target.career || []).join("\n");

    document.getElementById("programSubmitBtn").textContent = "Saqlash";
    document.getElementById("programCancelEditBtn").style.display = "inline-flex";

    const bachelorForm = document.getElementById("bachelorForm");
    bachelorForm.style.display = resolvedType === "bachelor" ? "block" : "none";
    bachelorForm.required = resolvedType === "bachelor";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelProgramEdit() {
    editingProgramId = null;
    editingProgramType = null;
    const form = document.getElementById("programForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("programSubmitBtn").textContent = "Qo'shish";
    document.getElementById("programCancelEditBtn").style.display = "none";
}

function removeDepartment(id) {
    siteData.departments = (siteData.departments || []).filter((item) => item.id !== id);
    if (editingDepartmentId === id) {
        cancelDepartmentEdit();
    }
    persistAndRender();
}

function startEditDepartment(id) {
    const target = (siteData.departments || []).find((item) => item.id === id);
    if (!target) return;

    editingDepartmentId = id;
    const form = document.getElementById("departmentForm");
    form.elements.id.value = String(id);
    form.elements.name.value = target.name || "";
    form.elements.head.value = target.head || "";
    form.elements.teachers.value = target.teachers ?? "";
    form.elements.students.value = target.students ?? "";
    form.elements.description.value = target.description || "";
    form.elements.teachersList.value = (target.teachersList || [])
        .map((t) => `${t.name || ""} - ${t.degree || ""}`.trim())
        .join("\n");

    document.getElementById("departmentSubmitBtn").textContent = "Saqlash";
    document.getElementById("departmentCancelEditBtn").style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelDepartmentEdit() {
    editingDepartmentId = null;
    const form = document.getElementById("departmentForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("departmentSubmitBtn").textContent = "Qo'shish";
    document.getElementById("departmentCancelEditBtn").style.display = "none";
}

function removeLeadership(id) {
    ensureLeadershipShape();
    siteData.rahbariyat = siteData.rahbariyat.filter((item) => item.id !== id);
    if (editingLeadershipId === id) {
        cancelLeadershipEdit();
    }
    persistAndRender();
}

function removeTeacherInfo(id) {
    ensureTeacherInfoShape();
    siteData.teacherDetails = siteData.teacherDetails.filter((item) => item.id !== id);
    if (editingTeacherInfoId === id) {
        cancelTeacherInfoEdit();
    }
    persistAndRender();
}

function removeAchievement(id) {
    ensureCampusShape();
    siteData.campus.achievements = siteData.campus.achievements.filter((item) => item.id !== id);
    persistAndRender();
}

function removeCampusEvent(id) {
    ensureCampusShape();
    siteData.campus.upcomingEvents = siteData.campus.upcomingEvents.filter((item) => item.id !== id);
    persistAndRender();
}

function removeContact(id) {
    const contacts = getContacts().filter((item) => item.id !== id);
    saveContacts(contacts);
    renderAll();
    showToast("Murojaat o'chirildi");
}

function toggleContactReviewed(id) {
    const contacts = getContacts().map((item) => {
        if (item.id === id) {
            return { ...item, reviewed: !item.reviewed };
        }
        return item;
    });
    saveContacts(contacts);
    renderAll();
    showToast("Murojaat holati yangilandi");
}

function removeClub(id) {
    ensureCampusShape();
    siteData.campus.clubs = siteData.campus.clubs.filter((item) => item.id !== id);
    if (editingClubId === id) {
        cancelClubEdit();
    }
    persistAndRender();
}

function startEditClub(id) {
    ensureCampusShape();
    const target = siteData.campus.clubs.find((item) => item.id === id);
    if (!target) return;

    editingClubId = id;
    const form = document.getElementById("clubForm");
    form.elements.id.value = String(id);
    form.elements.name.value = target.name || "";
    form.elements.icon.value = target.icon || "";
    form.elements.members.value = target.members ?? "";
    form.elements.description.value = target.description || "";

    document.getElementById("clubSubmitBtn").textContent = "Saqlash";
    document.getElementById("clubCancelEditBtn").style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelClubEdit() {
    editingClubId = null;
    const form = document.getElementById("clubForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("clubSubmitBtn").textContent = "Klub qo'shish";
    document.getElementById("clubCancelEditBtn").style.display = "none";
}

function startEditLeadership(id) {
    ensureLeadershipShape();
    const target = siteData.rahbariyat.find((item) => item.id === id);
    if (!target) return;

    editingLeadershipId = id;
    const form = document.getElementById("leadershipForm");
    form.elements.id.value = String(id);
    form.elements.name.value = target.ism || "";
    form.elements.position.value = target.lavozim || "";
    form.elements.degree.value = target.mutaxassislik || "";
    form.elements.reception.value = target.qabulVaqti || "";
    form.elements.phone.value = target.telefon || "";
    form.elements.email.value = target.email || "";
    form.elements.telegram.value = target.telegram || "";
    form.elements.address.value = target.manzil || "";
    form.elements.imageUrl.value = target.rasm || "";
    form.elements.imageFile.value = "";

    document.getElementById("leadershipSubmitBtn").textContent = "Saqlash";
    document.getElementById("leadershipCancelEditBtn").style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelLeadershipEdit() {
    editingLeadershipId = null;
    const form = document.getElementById("leadershipForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("leadershipSubmitBtn").textContent = "Qo'shish";
    document.getElementById("leadershipCancelEditBtn").style.display = "none";
}

function startEditTeacherInfo(id) {
    ensureTeacherInfoShape();
    const target = siteData.teacherDetails.find((item) => item.id === id);
    if (!target) return;

    editingTeacherInfoId = id;
    const form = document.getElementById("teacherInfoForm");
    form.elements.id.value = String(id);
    form.elements.departmentId.value = String(target.departmentId || "");
    form.elements.name.value = target.name || "";
    form.elements.degree.value = target.degree || "";
    form.elements.specialty.value = target.specialty || "";
    form.elements.bio.value = target.bio || "";
    form.elements.imageUrl.value = target.image || "";
    form.elements.imageFile.value = "";
    form.elements.scientificWorks.value = (target.scientificWorks || []).join("\n");
    form.elements.achievements.value = (target.achievements || []).join("\n");

    document.getElementById("teacherInfoSubmitBtn").textContent = "Saqlash";
    document.getElementById("teacherInfoCancelEditBtn").style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelTeacherInfoEdit() {
    editingTeacherInfoId = null;
    const form = document.getElementById("teacherInfoForm");
    form.reset();
    form.elements.id.value = "";
    document.getElementById("teacherInfoSubmitBtn").textContent = "Qo'shish";
    document.getElementById("teacherInfoCancelEditBtn").style.display = "none";
}

function persistAndRender() {
    savePersistentSiteData(siteData);
    saveSiteDataToServer(siteData);
    renderAll();
    showToast("Yangilandi");
    try {
        adminSyncChannel?.postMessage({ type: "siteDataUpdated", at: Date.now() });
    } catch (error) {
        // ignore
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
}

function downloadJsonFile(content, filename) {
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

async function saveSiteDataToServer(data) {
    if (!data || typeof data !== "object") return false;
    try {
        const response = await fetch("/api/site-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizeAdminImage(value) {
    const safe = String(value || "").trim();
    if (!safe) return "";
    const isAbsolute = /^(https?:|data:|\/)/i.test(safe);
    return isAbsolute ? safe : `../image/${safe}`;
}

function getAdminImageStyle(image) {
    const normalized = normalizeAdminImage(image);
    if (!normalized) {
        return "background: linear-gradient(135deg, rgba(37,99,235,.2), rgba(16,185,129,.2));";
    }
    const escaped = normalized.replace(/'/g, "%27");
    return `background-image: linear-gradient(135deg, rgba(15,23,42,.08), rgba(15,23,42,.08)), url('${escaped}'); background-size: cover; background-position: center;`;
}

async function resolveNewsImage(form, editId) {
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        return await readFileAsDataUrl(imageFile);
    }

    if (imageUrl) return imageUrl;

    if (editId) {
        const oldItem = (siteData.news || []).find((item) => item.id === editId);
        return oldItem?.image || "";
    }

    return "";
}

async function resolveEventImage(form) {
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        return await readFileAsDataUrl(imageFile);
    }

    if (imageUrl) return imageUrl;

    return "";
}

async function resolveLeaderImage(form, editId) {
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        return await readFileAsDataUrl(imageFile);
    }

    if (imageUrl) return imageUrl;

    if (editId) {
        const oldItem = (siteData.rahbariyat || []).find((item) => item.id === editId);
        return oldItem?.rasm || "";
    }

    return "";
}

async function resolveTeacherInfoImage(form, editId) {
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        return await readFileAsDataUrl(imageFile);
    }

    if (imageUrl) return imageUrl;

    if (editId) {
        const oldItem = (siteData.teacherDetails || []).find((item) => item.id === editId);
        return oldItem?.image || "";
    }

    return "";
}

function parseListInput(value) {
    return String(value || "")
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function parseTeachersList(value) {
    return String(value || "")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const parts = line.split(" - ");
            const name = parts[0]?.trim() || "";
            const degree = (parts.slice(1).join(" - ") || "").trim();
            return { name, degree };
        })
        .filter((item) => item.name);
}

function assignMissingIds(items) {
    items.forEach((item, index) => {
        if (!item.id) {
            item.id = Date.now() + index;
        }
    });
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const raw = String(reader.result || "");
                if (!raw.startsWith("data:image/")) {
                    resolve(raw);
                    return;
                }

                const img = new Image();
                img.onload = () => {
                    const maxSize = 1280;
                    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                    const targetW = Math.max(1, Math.round(img.width * scale));
                    const targetH = Math.max(1, Math.round(img.height * scale));
                    const canvas = document.createElement("canvas");
                    canvas.width = targetW;
                    canvas.height = targetH;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        resolve(raw);
                        return;
                    }
                    ctx.drawImage(img, 0, 0, targetW, targetH);
                    const compressed = canvas.toDataURL("image/jpeg", 0.82);
                    resolve(compressed);
                };
                img.onerror = () => resolve(raw);
                img.src = raw;
            } catch (error) {
                resolve(String(reader.result || ""));
            }
        };
        reader.onerror = () => reject(new Error("Rasm o'qilmadi"));
        reader.readAsDataURL(file);
    });
}

function getContacts() {
    let contacts = [];
    try {
        contacts = JSON.parse(localStorage.getItem("tdu_contacts") || "[]");
    } catch (error) {
        contacts = [];
    }
    return normalizeContacts(contacts);
}

function saveContacts(contacts) {
    localStorage.setItem("tdu_contacts", JSON.stringify(contacts));
}

function normalizeContacts(contacts) {
    const now = Date.now();
    const normalized = (Array.isArray(contacts) ? contacts : []).map((item, index) => ({
        ...item,
        id: item?.id || now + index,
        reviewed: Boolean(item?.reviewed)
    }));
    saveContacts(normalized);
    return normalized;
}

function formatAdminDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString("uz-UZ");
}

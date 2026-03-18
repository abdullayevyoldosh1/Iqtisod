(function () {
    function getDepartmentId() {
        var params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'), 10);
    }

    function getInitials(name) {
        return (name || '')
            .split(' ')
            .filter(Boolean)
            .map(function (part) { return part[0]; })
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    function makeAvatarDataUrl(name) {
        var initials = getInitials(name) || 'U';
        var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>" +
            "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
            "<stop offset='0%' stop-color='#3b82f6'/><stop offset='100%' stop-color='#1d4ed8'/>" +
            "</linearGradient></defs>" +
            "<rect width='240' height='240' fill='url(#g)'/>" +
            "<text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' " +
            "font-family='Arial, sans-serif' font-size='80' fill='white' font-weight='700'>" + initials + "</text>" +
            "</svg>";
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    }

    function fallbackBio(teacher, department) {
        return tr(teacher.bio) || (teacher.name + " " + tr(department.name) + " " +
            (window.t ? t('dept_program') : "program") + " " + (window.t ? t('nav_departments').toLowerCase() : "department") + " specialist.");
    }

    function fallbackWorks(teacher) {
        if (Array.isArray(teacher.scientificWorks) && teacher.scientificWorks.length) {
            return teacher.scientificWorks;
        }
        return [
            tr((teacher.specialty || "Mutaxassislik") + " bo'yicha ilmiy maqolalar to'plami"),
            tr("Talabalar uchun o'quv-uslubiy qo'llanma"),
            tr("Respublika konferensiyalarida ma'ruza ishlari")
        ];
    }

    function fallbackAchievements(teacher) {
        if (Array.isArray(teacher.achievements) && teacher.achievements.length) {
            return teacher.achievements;
        }
        return [
            tr("Universitet miqyosida faol professor-o'qituvchi sifatida e'tirof etilgan"),
            tr("Ilmiy-amaliy konferensiyalarda muntazam ishtirok etadi"),
            tr("Talabalar ilmiy ishlariga rahbarlik qiladi")
        ];
    }

    function createNotFoundHTML() {
        return "<div class='department-detail-empty'>" +
            "<h2>" + tr("Ma'lumot topilmadi") + "</h2>" +
            "<p>" + tr("Tanlangan kafedra bo'yicha ma'lumot mavjud emas.") + "</p>" +
            "<a class='btn btn-primary' href='departments.html'><i class='fas fa-arrow-left'></i> " + tr("Kafedralarga qaytish") + "</a>" +
            "</div>";
    }

    function t(key) {
        return typeof window.t === 'function' ? window.t(key) : key;
    }

    function tr(value) {
        return typeof window.tr === 'function' ? window.tr(value) : value;
    }

    function escapeAttr(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function renderDetail(data) {
        var root = document.getElementById('department-detail-root');
        if (!root) return;

        var departmentId = getDepartmentId();
        var departments = (data && data.departments) || [];
        var department = departments.find(function (d) { return d.id === departmentId; });
        var teacherDetails = ((data && data.teacherDetails) || []).filter(function (t) {
            return Number(t.departmentId) === Number(departmentId);
        });

        if (!department) {
            root.innerHTML = createNotFoundHTML();
            return;
        }

        var allPrograms = []
            .concat((window.appData?.programs?.bachelor || []))
            .concat((window.appData?.programs?.master || []))
            .concat((window.appData?.programs?.extramural || []));
        var departmentProgramsCount = allPrograms.filter(function (p) {
            return String(p.department || '') === String(department.name || '');
        }).length;

        var departmentInfoHtml =
            "<div class='department-info-card'>" +
                "<div class='department-info-top'>" +
                    "<div class='department-info-text'>" +
                        "<p class='department-kicker'>" + t('nav_departments') + "</p>" +
                        "<h1 class='department-title'>" + tr(department.name) + "</h1>" +
                        "<p class='department-headline'><strong>" + t('dept_head') + "</strong> " + tr(department.head) + "</p>" +
                        "<div class='department-info-body'>" +
                            "<p class='department-description'>" + tr(department.description) + "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='department-stats-grid'>" +
                        "<div class='department-stat'>" +
                            "<div class='department-stat-icon'><i class='fas fa-chalkboard-teacher'></i></div>" +
                            "<div class='department-stat-text'><strong>" + (department.teachers || 0) + "</strong><span>" + t('dept_teacher') + "</span></div>" +
                        "</div>" +
                        "<div class='department-stat'>" +
                            "<div class='department-stat-icon'><i class='fas fa-user-graduate'></i></div>" +
                            "<div class='department-stat-text'><strong>" + (department.students || 0) + "</strong><span>" + t('dept_student') + "</span></div>" +
                        "</div>" +
                        "<div class='department-stat'>" +
                            "<div class='department-stat-icon'><i class='fas fa-layer-group'></i></div>" +
                            "<div class='department-stat-text'><strong>" + departmentProgramsCount + "</strong><span>" + t('dept_program') + "</span></div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";

        var teachersHtml = "";
        if (!teacherDetails.length) {
            teachersHtml = "<div class='department-detail-empty'>" +
                "<h2>" + tr("Ma'lumot kiritilmagan") + "</h2>" +
                "<p>" + tr("Bu kafedra uchun batafsil o'qituvchi ma'lumotlari hali qo'shilmagan.") + "</p>" +
                "</div>";
        } else {
            teachersHtml = "<div class='teacher-list-grid'>" +
                teacherDetails.map(function (teacher) {
                    var works = fallbackWorks(teacher);
                    var achievements = fallbackAchievements(teacher);
                    var bio = fallbackBio(teacher, department);
                    var specialty = teacher.specialty || teacher.position || teacher.lavozim || tr("Mutaxassislik ko'rsatilmagan");
                    var degree = teacher.degree || tr("Ilmiy daraja ko'rsatilmagan");
                    var highlight = teacher.highlight || teacher.tagline || (teacher.bio ? tr(teacher.bio) : tr("Kafedra bo'yicha tajribali mutaxassis."));
                    var fallbackPhoto = makeAvatarDataUrl(teacher.name);
                    var photo = teacher.image || fallbackPhoto;
                    var safePhoto = escapeAttr(photo);
                    var safeFallback = escapeAttr(fallbackPhoto);
                    var safeName = escapeAttr(teacher.name);
                    return "<div class='teacher-card'>" +
                        "<div class='teacher-card-top'>" +
                            "<div class='teacher-photo-wrap'>" +
                                "<img src=\"" + safePhoto + "\" alt=\"" + safeName + "\" class='teacher-photo' data-fallback=\"" + safeFallback + "\">" +
                            "</div>" +
                            "<div class='teacher-main-info'>" +
                                "<p class='teacher-department'>" + tr(department.name) + "</p>" +
                                "<h2>" + teacher.name + "</h2>" +
                                "<div class='teacher-meta'>" +
                                    "<div class='teacher-meta-item'>" +
                                        "<span class='teacher-meta-label'>" + tr("Ilmiy darajasi") + "</span>" +
                                        "<span class='teacher-meta-value'>" + tr(degree) + "</span>" +
                                    "</div>" +
                                    "<div class='teacher-meta-item'>" +
                                        "<span class='teacher-meta-label'>" + tr("Mutaxassislik") + "</span>" +
                                        "<span class='teacher-meta-value'>" + tr(specialty) + "</span>" +
                                    "</div>" +
                                "</div>" +
                                "<p class='teacher-highlight'>" + highlight + "</p>" +
                                "<p class='teacher-bio'>" + bio + "</p>" +
                            "</div>" +
                        "</div>" +
                        "<div class='department-detail-sections'>" +
                            "<div class='detail-block'>" +
                                "<h3><i class='fas fa-flask'></i> " + tr("Ilmiy ishlari") + "</h3>" +
                                "<ul>" + works.map(function (item) { return "<li>" + item + "</li>"; }).join('') + "</ul>" +
                            "</div>" +
                            "<div class='detail-block'>" +
                                "<h3><i class='fas fa-award'></i> " + tr("Yutuqlari") + "</h3>" +
                                "<ul>" + achievements.map(function (item) { return "<li>" + item + "</li>"; }).join('') + "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
                }).join('') +
            "</div>";
        }

        root.innerHTML = "<div class='department-detail-card'>" +
            departmentInfoHtml +
            "<div class='department-teachers-section'>" +
                "<h2 class='section-title'>" + t('dept_teachers_title') + "</h2>" +
                teachersHtml +
            "</div>" +
            "<div class='department-detail-actions'>" +
                "<a class='btn btn-outline' href='departments.html'><i class='fas fa-arrow-left'></i> " + tr("Kafedralarga qaytish") + "</a>" +
            "</div>" +
        "</div>";

        root.querySelectorAll('img.teacher-photo[data-fallback]').forEach(function (img) {
            img.addEventListener('error', function () {
                var fallback = img.getAttribute('data-fallback');
                if (fallback) {
                    img.src = fallback;
                    img.removeAttribute('data-fallback');
                }
            });
        });

        if (typeof window.autoTranslateElement === 'function') {
            window.autoTranslateElement(root);
        }
    }

    async function loadData() {
        if (window.appData) return window.appData;

        var cached = localStorage.getItem('siteData');
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch (e) {
                // ignore and fallback to fetch
            }
        }

        var response = await fetch('data.json');
        if (!response.ok) throw new Error('data.json yuklanmadi');
        return response.json();
    }

    document.addEventListener('DOMContentLoaded', async function () {
        try {
            var data = await loadData();
            renderDetail(data);
        } catch (error) {
            var root = document.getElementById('department-detail-root');
            if (root) {
                root.innerHTML = createNotFoundHTML();
            }
        }
    });
})();

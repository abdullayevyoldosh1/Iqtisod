// Asosiy ma'lumotlar obyekti
let appData = {
    loading: true,
    currentPage: 'home',
    language: 'uz',
    user: null
};

const SUPPORTED_LANGUAGES = ['uz', 'en'];

const I18N = {
    uz: {
        page_load_error: "Sahifa yuklanmadi. Iltimos, qayta urinib ko'ring.",
        nav_home: "Bosh sahifa",
        nav_about: "Fakultet haqida",
        nav_education: "Ta'lim",
        nav_departments: "Kafedralar",
        nav_student_life: "Talabalar hayoti",
        nav_contact: "Aloqa",
        footer_desc: "Zamonaviy bilim va amaliy ko'nikmalarga ega iqtisodchilarni tayyorlash markazi",
        quick_links: "Tez havolalar",
        education_programs: "Ta'lim yo'nalishlari",
        contact_info: "Aloqa ma'lumotlari",
        weekdays_hours: "Dushanba - Juma: 8:00 - 18:00",
        footer_rights: "Barcha huquqlar himoyalangan.",
        privacy_policy: "Maxfiylik siyosati",
        terms_of_use: "Foydalanish shartlari",
        news_read_more: "Batafsil",
        news_close: "Yopish",
        news_view_all: "Barchasini ko'rish",
        news_show_less: "Kamroq ko'rish",
        modal_close: "Yopish",
        dept_head: "Kafedra mudiri:",
        dept_teacher: "O'qituvchi",
        dept_student: "Talaba",
        dept_program: "Yo'nalish",
        dept_teachers_title: "O'qituvchilar",
        dept_teachers_missing: "Asosiy o'qituvchilar kiritilmagan",
        reload: "Qayta yuklash",
        calc_score_error: "Iltimos, 0 dan 189 gacha bo'lgan ball kiriting",
        calc_result: "Natijangiz:",
        calc_score_unit: "ball",
        calc_available_programs: "Quyidagi yo'nalishlarga kirish imkoniyatingiz bor:",
        calc_required_score: "Talab qilinadigan ball:",
        calc_difference: "Farqingiz:",
        calc_seats: "O'rinlar soni:",
        calc_no_programs: "Afsuski, sizning ballingiz hozircha hech qaysi yo'nalishga yetmaydi.",
        calc_try_again: "Yana bir bor tayyorlaning!",
        submitted: "Yuborildi!",
        video_title: "Universitet haqida video",
        hero_title: "Iqtisodiyot kelajagini biz bilan quring!",
        hero_subtitle: "Zamonaviy bilim, amaliy ko'nikmalar, yorqin kelajak",
        contact_now: "Hoziroq bog'laning",
        about_university: "Universitet haqida",
        why_us: "Nega aynan biz?",
        faculty_advantages: "Iqtisodiyot fakultetining afzalliklari",
        latest_news: "So'nggi yangiliklar",
        contact_admission: "Aloqa va Qabul",
        contact_subtitle: "Biz bilan bog'laning yoki ro'yxatdan o'ting",
        reception_hours: "Qabul vaqti",
        home_leadership_title: "Rahbariyat",
        home_leadership_subtitle: "Termiz davlat universiteti Iqtisodiyot fakulteti rahbariyati haqida malumot",
        home_leadership_view_all: "Batafsil",
        page_title: "Termiz Davlat Universiteti - Iqtisodiyot Fakulteti",
        admission_committee: "Qabul komissiyasi",
        phone_number: "Telefon raqam",
        email: "Elektron pochta",
        work_hours: "Ish vaqti",
        address: "Manzil",
        score_calculator: "Ballarni hisoblash",
        test_score: "Testdan to'plagan ballingiz:",
        direction_type: "Yo'nalish turi:",
        bachelor: "Bakalavriat",
        master: "Magistratura",
        extramural: "Sirtqi ta'lim",
        calculate: "Hisoblash",
        leave_message: "Murojaat qoldiring",
        your_name: "Ismingiz:",
        your_phone: "Telefon raqamingiz:",
        subject: "Murojaat mavzusi:",
        admission_about: "Qabul haqida",
        programs_about: "Ta'lim yo'nalishlari",
        other: "Boshqa",
        message: "Xabar:",
        send: "Yuborish",
        about_page_title: "Fakultet haqida",
        about_page_subtitle: "30 yildan ortiq tajriba - kelajak iqtisodchilarini tayyorlash",
        about_history: "Tarix",
        about_mission: "Missiya va Vazifa",
        about_leadership: "Rahbariyat",
        about_badges: "Fakultet nishonlari",
        about_stats: "Statistika",
        about_dates: "Muhim sanalar",
        departments_title: "Kafedralar",
        departments_subtitle: "Fakultet tarkibidagi ilmiy bo'limlar",
        campus_subtitle: "Fakultet hayotining rang-barang dunyosi",
        contact_location: "Bizning manzilimiz!",
        academic_page_title: "Ta'lim yo'nalishlari",
        academic_page_subtitle: "Bakalavriat va Magistratura dasturlari",
        academic_bachelor_forms: "Bakalavriat",
        academic_bachelor_forms_subtitle: "O'zingizga qulay ta'lim shaklini tanlang va kelajagingizni belgilang",
        academic_master_programs: "Magistratura",
        academic_master_programs_subtitle: "Ilmiy va kasbiy rivojlanish uchun eng yaxshi tanlov",
        department_detail_title: "Kafedra va O'qituvchi haqida"
    },
    en: {
        page_load_error: "Page failed to load. Please try again.",
        nav_home: "Home",
        nav_about: "About Faculty",
        nav_education: "Education",
        nav_departments: "Departments",
        nav_student_life: "Student Life",
        nav_contact: "Contact",
        footer_desc: "A center for preparing economists with modern knowledge and practical skills",
        quick_links: "Quick Links",
        education_programs: "Academic Programs",
        contact_info: "Contact Information",
        weekdays_hours: "Monday - Friday: 8:00 - 18:00",
        footer_rights: "All rights reserved.",
        privacy_policy: "Privacy Policy",
        terms_of_use: "Terms of Use",
        news_read_more: "Read more",
        news_close: "Close",
        news_view_all: "View all",
        news_show_less: "Show less",
        modal_close: "Close",
        dept_head: "Department Head:",
        dept_teacher: "Teacher",
        dept_student: "Student",
        dept_program: "Program",
        dept_teachers_title: "Teachers",
        dept_teachers_missing: "No core teachers have been added",
        reload: "Reload",
        calc_score_error: "Please enter a score between 0 and 189",
        calc_result: "Your result:",
        calc_score_unit: "points",
        calc_available_programs: "You can apply for the following programs:",
        calc_required_score: "Required score:",
        calc_difference: "Difference:",
        calc_seats: "Available seats:",
        calc_no_programs: "Unfortunately, your score is not enough for any program yet.",
        calc_try_again: "Prepare and try again!",
        submitted: "Submitted!",
        video_title: "University Video",
        hero_title: "Build the future of economics with us!",
        hero_subtitle: "Modern knowledge, practical skills, bright future",
        contact_now: "Contact Now",
        about_university: "About University",
        why_us: "Why Choose Us?",
        faculty_advantages: "Advantages of the Faculty of Economics",
        latest_news: "Latest News",
        contact_admission: "Contact and Admission",
        contact_subtitle: "Contact us or register now",
        reception_hours: "Reception hours",
        home_leadership_title: "Leadership",
        home_leadership_subtitle: "Meet the faculty leadership team",
        home_leadership_view_all: "Details",
        page_title: "Termiz State University - Faculty of Economics",
        admission_committee: "Admissions Office",
        phone_number: "Phone Number",
        email: "Email",
        work_hours: "Working Hours",
        address: "Address",
        score_calculator: "Score Calculator",
        test_score: "Your test score:",
        direction_type: "Program type:",
        bachelor: "Bachelor's",
        master: "Master's",
        extramural: "Part-time",
        calculate: "Calculate",
        leave_message: "Leave a Message",
        your_name: "Your name:",
        your_phone: "Your phone:",
        subject: "Subject:",
        admission_about: "Admission",
        programs_about: "Academic programs",
        other: "Other",
        message: "Message:",
        send: "Send",
        about_page_title: "About the Faculty",
        about_page_subtitle: "Over 30 years of experience in training future economists",
        about_history: "History",
        about_mission: "Mission and Goals",
        about_leadership: "Leadership",
        about_badges: "Faculty Badges",
        about_stats: "Statistics",
        about_dates: "Important Dates",
        departments_title: "Departments",
        departments_subtitle: "Academic units within the faculty",
        campus_subtitle: "The vibrant world of faculty life",
        contact_location: "Our Location!",
        academic_page_title: "Academic Programs",
        academic_page_subtitle: "Bachelor's and Master's programs",
        academic_bachelor_forms: "Bachelor's Study Formats",
        academic_bachelor_forms_subtitle: "Choose a format that fits you and shape your future",
        academic_master_programs: "Master's Programs",
        academic_master_programs_subtitle: "The best choice for scientific and professional growth",
        department_detail_title: "About Department and Teacher"
    }
};

const CONTENT_TRANSLATIONS = {
    "Termiz Davlat Universiteti": "Termiz State University",
    "Iqtisodiyot Fakulteti": "Faculty of Economics",
    "Talabalar": "Students",
    "Professor o'qtuvchilar": "Professors",
    "Bitiruvchilar": "Graduates",
    "Zamonaviy ta'lim": "Modern Education",
    "Eng so'nggi texnologiyalar va usullardan foydalanamiz": "We use the latest technologies and methods",
    "Amaliyot imkoniyatlari": "Internship Opportunities",
    "Yirik korxona va banklarda amaliyot": "Internships at major companies and banks",
    "Xalqaro hamkorlik": "International Cooperation",
    "Chetdagi universitetlar bilan almashuv dasturlari": "Exchange programs with foreign universities",
    "Karyera yordami": "Career Support",
    "Bitiruvchilarga ish topishda yordam": "Support for graduates in finding jobs",
    "Tadbirlar": "Events",
    "Xalqaro": "International",
    "Yutuqlar": "Achievements",
    "Xodimlar": "Staff",
    "Kafedralar": "Departments",
    "Umumiy yo'nalishlar": "Total Programs",
    "Ilmiy tadqiqotlar": "Research",
    "Ilmiy loyihalar va grantlar": "Research projects and grants",
    "Malaka oshirish": "Professional Development",
    "Doimiy kasbiy rivojlanish": "Continuous professional growth",
    "Tarix": "History",
    "Ta'lim dasturlari": "Academic Programs",
    "Tadbirlar taqvimi": "Events Calendar",
    "Yaqin keladigan tadbirlar": "Upcoming Events",
    "Ballarni hisoblash": "Score Calculator",
    "Hujjatlar": "Documents",
    "Qabul uchun kerakli hujjatlar": "Required documents for admission",
    "Ko'p so'raladigan savollar": "Frequently Asked Questions",
    "FAQ bo'limi": "FAQ section",
    "Iqtisodiyot va turizm": "Economics and Tourism",
    "Moliya va bank ishi": "Finance and Banking",
    "Buxgalteriya hisobi va audit": "Accounting and Audit",
    "Tadbirkorlik va marketing": "Entrepreneurship and Marketing",
    "Xalqaro iqtisodiy munosabatlar": "International Economic Relations",
    "Kunduzgi": "Daytime",
    "Kechki": "Evening",
    "Sirtqi": "Part-time",
    "Masofaviy": "Distance",
    "Yotoqxona": "Dormitory",
    "Kutubxona": "Library",
    "Yosh iqtisodchilar klubi": "Young Economists Club",
    "Zakovat jamoasi": "Knowledge Team",
    "Qabul komissiyasi": "Admissions Office",
    "Aloqa va Qabul": "Contact and Admission",
    "Talabalar hayoti": "Student Life"
    ,"Sentyabr": "September"
    ,"\"Yosh iqtisodchilar\" klubining ochilishi": "Opening of the \"Young Economists\" club"
    ,"Asosiy binoda, 16:00 da": "At the main building, 16:00"
    ,"Xalqaro moliya haftaligi": "International Finance Week"
    ,"4 kunlik seminar va treninglar": "4-day seminars and trainings"
    ,"Batafsil ko'rish": "View details"
    ,"Murojaat qoldiring": "Leave a message"
    ,"Bizning manzilimiz!": "Our Location!"
    ,"Fakultet hayotining rang-barang dunyosi": "The vibrant world of faculty life"
    ,"Fakultet tarkibidagi ilmiy bo'limlar": "Academic units within the faculty"
    ,"Bakalavriat va Magistratura dasturlari": "Bachelor's and Master's programs"
    ,"Bakalavriat ta'lim shakllari": "Bachelor's study formats"
    ,"O'zingizga qulay ta'lim shaklini tanlang va kelajagingizni belgilang": "Choose a study format that fits you and shape your future"
    ,"Magistratura yo'nalishlari": "Master's programs"
    ,"Ilmiy va kasbiy rivojlanish uchun eng yaxshi tanlov": "The best choice for scientific and professional growth"
    ,"30 yildan ortiq tajriba - kelajak iqtisodchilarini tayyorlash": "Over 30 years of experience in training future economists"
    ,"Yo'nalishlarni ko'rish": "View programs"
    ,"Tez orada": "Coming soon"
    ,"Hozircha magistratura yo'nalishlari mavjud emas": "No master's programs are available yet"
    ,"Tez orada yangi yo'nalishlar qo'shiladi": "New programs will be added soon"
    ,"ta'lim yo'nalishlari": "programs"
    ,"yo'nalishlari topilmadi": "programs not found"
    ,"Bu ta'lim shakli bo'yicha hozircha yo'nalishlar mavjud emas": "No programs are available for this study format yet"
    ,"Ma'lumot mavjud emas": "No information available"
    ,"Hozircha yo'nalishlar mavjud emas": "No programs available yet"
    ,"Asosiy ma'lumotlar": "Basic Information"
    ,"Kodi:": "Code:"
    ,"Ta'lim muddati:": "Duration:"
    ,"O'tish balli:": "Passing score:"
    ,"O'rinlar soni:": "Number of seats:"
    ,"Ta'lim shakli:": "Study format:"
    ,"Kafedra:": "Department:"
    ,"To'liq tavsif": "Full description"
    ,"O'qitiladigan fanlar": "Subjects taught"
    ,"Karyera imkoniyatlari": "Career opportunities"
    ,"Aloqa bo'limi": "Contact section"
    ,"Ilmiy yo'nalishlar": "Research areas"
    ,"Iqtisodiyot nazariyasi": "Economic Theory"
    ,"Ekonometrik modellashtirish": "Econometric Modeling"
    ,"Makroiqtisodiy tahlil": "Macroeconomic Analysis"
    ,"Ma'lumot topilmadi": "Information not found"
    ,"Tanlangan kafedra bo'yicha ma'lumot mavjud emas.": "No information is available for the selected department."
    ,"Kafedralarga qaytish": "Back to departments"
    ,"Ma'lumot kiritilmagan": "No data added"
    ,"Bu kafedra uchun batafsil o'qituvchi ma'lumotlari hali qo'shilmagan.": "Detailed teacher information for this department has not been added yet."
    ,"Ilmiy daraja ko'rsatilmagan": "Academic degree not specified"
    ,"Ilmiy ishlari": "Scientific works"
    ,"Yutuqlari": "Achievements"
    ,"Talabalar uchun o'quv-uslubiy qo'llanma": "Educational and methodological guide for students"
    ,"Respublika konferensiyalarida ma'ruza ishlari": "Presentations at national conferences"
    ,"Universitet miqyosida faol professor-o'qituvchi sifatida e'tirof etilgan": "Recognized as an active faculty member at the university level"
    ,"Ilmiy-amaliy konferensiyalarda muntazam ishtirok etadi": "Regularly participates in scientific-practical conferences"
    ,"Talabalar ilmiy ishlariga rahbarlik qiladi": "Supervises student research work"
    ,"Iqtisodiyot (tarmoqlar va sohalar bo'yicha)": "Economics (by sectors and industries)"
    ,"Moliya va moliyaviy texnologiyalar": "Finance and Financial Technologies"
    ,"Bank ishi va auditi": "Banking and Audit"
    ,"Tadbirkorlik (biznesni boshqarish)": "Entrepreneurship (Business Management)"
    ,"Moliya va kredit": "Finance and Credit"
    ,"Iqtisodiyot (sirtqi)": "Economics (Part-time)"
    ,"Buxgalteriya hisobi (sirtqi)": "Accounting (Part-time)"
    ,"Iqtisodiy jarayonlarni tahlil qilish, bashorat qilish va boshqarish ko'nikmalarini shakllantirish. Makro va mikroiqtisodiyot, moliya, statistika, ekonometrika fanlarini o'rganish.": "Develops skills for analyzing, forecasting, and managing economic processes. Covers macro and microeconomics, finance, statistics, and econometrics."
    ,"Zamonaviy moliyaviy tizimlarni boshqarish, moliyaviy risklarni baholash, investitsiyalarni boshqarish ko'nikmalarini o'rgatish.": "Teaches management of modern financial systems, financial risk assessment, and investment management."
    ,"Bank operatsiyalari, kreditlash, audit xizmatlari bo'yicha mutaxassislar tayyorlash. Bank tizimi va moliyaviy hisobotlar tahlili.": "Prepares specialists in banking operations, lending, and audit services. Includes banking system and financial statement analysis."
    ,"Buxgalteriya hisobi, soliq hisobi, moliyaviy hisobot tuzish va tahlil qilish ko'nikmalarini shakllantirish.": "Builds skills in accounting, tax accounting, and preparation and analysis of financial reports."
    ,"Kichik va o'rta biznesni yuritish, loyihalarni boshqarish, marketing strategiyalarini ishlab chiqish ko'nikmalari.": "Develops skills in running small and medium businesses, project management, and marketing strategy development."
    ,"Ilmiy tadqiqotlar va nazariy bilimlar chuqurlashtirilgan o'qitiladi. Magistratura darajasida ilmiy ishlar olib borish.": "Provides advanced scientific research and theoretical knowledge at the master's level."
    ,"Moliyaviy bozorlar, bank tizimi, kredit siyosati bo'yicha chuqur bilimlar. Moliyaviy tahlil va prognozlash.": "Provides in-depth knowledge of financial markets, banking systems, and credit policy, including financial analysis and forecasting."
    ,"Ishlaydigan talabalar uchun maxsus dastur. O'qish hafta oxirida va kechqurun amalga oshiriladi.": "A special program for working students. Classes are held on weekends and in the evenings."
    ,"Ishlaydiganlar uchun buxgalteriya hisobi va audit yo'nalishi. Amaliy ko'nikmalarga e'tibor qaratilgan.": "Accounting and audit program for working students, focused on practical skills."
    ,"Yangi o'quv yili boshlanishi": "Start of the New Academic Year"
    ,"2024-2025 o'quv yili tantanali ravishda boshlanmoqda. Barcha talabalar 2-sentyabr kuni 9:00 da asosiy binoda bo'lishlari so'ralmoqda.": "The 2024-2025 academic year is starting ceremonially. All students are requested to be at the main building on September 2 at 09:00."
    ,"Xalqaro hamkorlik shartnomasi": "International Partnership Agreement"
    ,"Germaniyaning Berlin Iqtisodiyot Universiteti bilan yangi hamkorlik shartnomasi imzolandi. Talabalar almashuv dasturi boshlanmoqda.": "A new partnership agreement was signed with the Berlin University of Economics in Germany. A student exchange program is being launched."
    ,"Fan olimpiadasi g'oliblari": "Winners of the Science Olympiad"
    ,"Talabalarimiz respublika iqtisodiyot olimpiadasida 3 oltin, 2 kumush medalni qo'lga kiritdilar.": "Our students won 3 gold and 2 silver medals at the national economics olympiad."
    ,"Yangi professorlar": "New Professors"
    ,"5 nafar yangi professor fakultetimizga qo'shildi. Ularning ilmiy darajalari doktorlik va nomzodlik.": "Five new professors joined our faculty. Their academic degrees include doctorates and PhD-level qualifications."
    ,"Haftada 1 marta yig'ilishlar, seminar va treninglar. Iqtisodiy masalalar muhokamasi.": "Weekly meetings, seminars, and trainings. Discussions on economic issues."
    ,"Intellektual musobaqalar, olimpiadalar. Universitet va respublika miqyosidagi tanlovlar.": "Intellectual competitions and olympiads at university and national levels."
    ,"Ijtimoiy-iqtisodiy mavzularda munozaralar. Nutq va muloqot mahoratini oshirish.": "Debates on socio-economic topics. Improves speaking and communication skills."
    ,"Voleybol, basketbol, futbol jamoalari. Universitet chempionatlari.": "Volleyball, basketball, and football teams. University championships."
    ,"350 o'rinli, zamonaviy sharoitlar. Har bir xonada internet, konditsioner, o'qish joyi.": "350-bed dormitory with modern facilities. Each room has internet, air conditioning, and a study area."
    ,"50,000 dan ortiq adabiyotlar. Elektron kutubxona, kompyuterlar, o'qish zallari.": "More than 50,000 resources. E-library, computers, and study halls."
    ,"Sport zallari, fitnes uskunalari, ochiq maydonlar. Professional murabbiylar.": "Sports halls, fitness equipment, and open grounds with professional coaches."
    ,"Zamonaviy kompyuterlar, iqtisodiyot dasturlari, ma'lumotlar bazalari.": "Modern computers, economics software, and databases."
    ,"Respublika iqtisodiyot olimpiadasi": "National Economics Olympiad"
    ,"1-o'rin": "1st place"
    ,"3 talaba g'olib bo'ldi, 5 nafar sovrindor": "3 students became winners, with 5 prize holders in total"
    ,"Xalqaro moliya konkursi": "International Finance Contest"
    ,"2-o'rin": "2nd place"
    ,"5 ishtirokchi, 3 medal (1 oltin, 2 kumush)": "5 participants, 3 medals (1 gold, 2 silver)"
    ,"Startap festivali": "Startup Festival"
    ,"Eng yaxshi loyiha": "Best Project"
    ,"Talabalar startapi 10 million so'm grant yutdi": "A student startup won a 10 million UZS grant"
    ,"Ilmiy konferensiya": "Scientific Conference"
    ,"3 ta eng yaxshi maqola": "3 best papers"
    ,"Talabalar ilmiy ishlari respublika konferensiyasida e'tirof etildi": "Student research was recognized at a national conference"
    ,"Iqtisodiy tahlil va turizm sohasidagi tadqiqotlar. Makroiqtisodiy siyosat, mehnat iqtisodiyoti, turizm iqtisodiyoti bo'yicha ilmiy ishlar olib boriladi.": "Research in economic analysis and tourism. Scientific work is carried out on macroeconomic policy, labor economics, and tourism economics."
    ,"Moliyaviy bozorlar, bank tizimi, investitsiyalar, sug'urta bo'yicha tadqiqotlar. Zamonaviy moliyaviy texnologiyalar.": "Research on financial markets, banking systems, investments, and insurance. Focus on modern financial technologies."
    ,"Buxgalteriya hisobi, soliq hisobi, moliyaviy hisobotlar, audit xizmatlari bo'yicha ilmiy ishlar. Xalqaro buxgalteriya standartlari.": "Research in accounting, tax accounting, financial reporting, and audit services, including international accounting standards."
    ,"Kichik va o'rta biznesni rivojlantirish, marketing strategiyalari, innovatsion g'oyalar bo'yicha tadqiqotlar.": "Research on SME development, marketing strategies, and innovative ideas."
    ,"Xalqaro savdo, global iqtisodiyot, xalqaro moliya bozorlari bo'yicha tadqiqotlar. Tashqi iqtisodiy siyosat.": "Research on international trade, global economy, and international financial markets. External economic policy."
    ,"Talabalar soni": "Number of students"
    ,"Professor-o'qituvchilar": "Professors and teachers"
    ,"Professor o'qituvchilar": "Professors and teachers"
    ,"Professor o‘qituvchilar": "Professors and teachers"
    ,"Ilmiy loyihalar": "Research projects"
    ,"Xalqaro hamkorlar": "International partners"
    ,"Ta'lim": "Education"
    ,"Innovatsiya": "Innovation"
    ,"Hamkorlik": "Cooperation"
    ,"Jamiyat": "Society"
    ,"Yuqori malakali iqtisodiyot mutaxassislarini tayyorlash": "Training highly qualified economics specialists"
    ,"Iqtisodiyot sohasida innovatsion yondashuvlarni rivojlantirish": "Developing innovative approaches in economics"
    ,"Tadbirkorlik va davlat organlari bilan yaqin hamkorlik": "Close cooperation with businesses and public institutions"
    ,"Iqtisodiy bilim va ko'nikmalar orqali jamiyatga xizmat qilish": "Serving society through economic knowledge and skills"
    ,"To'liq vaqtli, kunduzgi ta'lim": "Full-time daytime education"
    ,"Ishlaydiganlar uchun kechki ta'lim": "Evening education for working students"
    ,"Masofaviy va mustaqil ta'lim": "Distance and independent education"
    ,"Onlayn va masofaviy ta'lim": "Online and distance education"
    ,"Makroiqtisodiyot": "Macroeconomics"
    ,"Mikroiqtisodiyot": "Microeconomics"
    ,"Statistika": "Statistics"
    ,"Ekonometrika": "Econometrics"
    ,"Moliya": "Finance"
    ,"Iqtisodiy tahlil": "Economic Analysis"
    ,"Iqtisodchi": "Economist"
    ,"Tahlilchi": "Analyst"
    ,"Mutaxassis": "Specialist"
    ,"Menejer": "Manager"
    ,"Maslahatchi": "Consultant"
    ,"Tadqiqotchi": "Researcher"
    ,"Ilmiy xodim": "Research Fellow"
    ,"O'qituvchi": "Teacher"
    ,"Ekspert": "Expert"
    ,"Analitik": "Analyst"
    ,"Ilmiy tadqiqot metodologiyasi": "Research Methodology"
    ,"Global iqtisodiyot": "Global Economy"
    ,"2 yil": "2 years"
    ,"4 yil": "4 years"
    ,"5 yil": "5 years"
    ,"Asosiy iqtisodiyot": "Fundamentals of Economics"
    ,"Audit": "Audit"
    ,"Audit asoslari": "Fundamentals of Audit"
    ,"Auditor": "Auditor"
    ,"Bank ishi": "Banking"
    ,"Bank menejeri": "Bank Manager"
    ,"Bank menejmenti": "Bank Management"
    ,"Bank operatsiyalari": "Banking Operations"
    ,"Bank xodimi": "Bank Employee"
    ,"Biznes menejeri": "Business Manager"
    ,"Biznesni boshqarish": "Business Management"
    ,"Bozor iqtisodiyoti": "Market Economy"
    ,"Buxgalter": "Accountant"
    ,"Buxgalteriya hisobi": "Accounting"
    ,"Ekonometrik modellar": "Econometric Models"
    ,"Hisobchi": "Bookkeeper"
    ,"Ilmiy tadqiqotlar metodologiyasi": "Research Methodology"
    ,"Innovatsion iqtisodiyot": "Innovative Economy"
    ,"Investitsiya menejeri": "Investment Manager"
    ,"Investitsiyalar": "Investments"
    ,"Kompyuterda buxgalteriya": "Computerized Accounting"
    ,"Kredit eksperti": "Credit Specialist"
    ,"Kredit ishi": "Credit Operations"
    ,"Kredit mutaxassisi": "Credit Specialist"
    ,"Kredit siyosati": "Credit Policy"
    ,"Loyiha menejeri": "Project Manager"
    ,"Loyiha menejmenti": "Project Management"
    ,"Marketing": "Marketing"
    ,"Marketing mutaxassisi": "Marketing Specialist"
    ,"Moliya asoslari": "Fundamentals of Finance"
    ,"Moliyachi": "Finance Specialist"
    ,"Moliyaviy analitik": "Financial Analyst"
    ,"Moliyaviy bozorlar": "Financial Markets"
    ,"Moliyaviy hisobchi": "Financial Accountant"
    ,"Moliyaviy hisobot": "Financial Reporting"
    ,"Moliyaviy konsultant": "Financial Consultant"
    ,"Moliyaviy menejment": "Financial Management"
    ,"Moliyaviy tahlil": "Financial Analysis"
    ,"Risk menejeri": "Risk Manager"
    ,"Risk menejmenti": "Risk Management"
    ,"Soliq hisobi": "Tax Accounting"
    ,"Soliq mutaxassisi": "Tax Specialist"
    ,"Startaplar": "Startups"
    ,"Sug'urta": "Insurance"
    ,"Tadbirkor": "Entrepreneur"
    ,"Tadbirkorlik": "Entrepreneurship"
    ,"Xalqaro buxgalteriya standartlari": "International Accounting Standards"
    ,"Xalqaro moliya": "International Finance"
    ,"Iqtisodiyot fakulteti asos solindi": "The Faculty of Economics was established"
    ,"'Moliya va kredit', 'Bank ishi' yo'nalishlari ochildi": "Finance and Credit, and Banking programs were opened"
    ,"'Buxgalteriya hisobi' yo'nalishi joriy etildi": "The Accounting program was introduced"
    ,"'Turizm iqtisodiyoti' va 'Xalqaro iqtisodiy munosabatlar' yo'nalishlari qo'shildi": "Tourism Economics and International Economic Relations programs were added"
    ,"Zamonaviy kompyuter klassi va elektron kutubxona ochildi": "A modern computer lab and electronic library were launched"
    ,"Termiz Davlat Universiteti Iqtisodiyot Fakulteti 1960-yilda tashkil etilgan. Dastlabki yillarda fakultet 'Iqtisodiyot' va 'Boshqaruv' yo'nalishlari bo'yicha mutaxassislar tayyorlash bilan shug'ullangan.": "The Faculty of Economics at Termiz State University was established in 1960. In its early years, the faculty focused on training specialists in Economics and Management."
    ,"Fakultet dekani": "Dean of the Faculty"
    ,"Ilmiy ishlar bo'yicha dekan o'rinbosari": "Deputy Dean for Research"
    ,"Ma'naviy-ma'rifiy ishlar bo'yicha dekan o'rinbosari": "Deputy Dean for Spiritual and Educational Affairs"
    ,"Iqtisodiyot fanlari doktori": "Doctor of Economic Sciences"
    ,"Iqtisodiyot fanlari nomzodi": "Candidate of Economic Sciences"
    ,"Sifat sertifikati": "Quality Certificate"
    ,"Xalqaro standartlarga moslik sertifikati": "Certificate of compliance with international standards"
    ,"Eng yaxshi fakultet": "Best Faculty"
    ,"2022-yil universitet miqyosida": "University-wide in 2022"
    ,"Innovatsion loyiha": "Innovative Project"
    ,"Ta'lim sohasidagi innovatsion loyiha mukofoti": "Award for an innovative project in education"
    ,"Xalqaro universitetlar bilan faol hamkorlik": "Active cooperation with international universities"
};

const AUTO_TRANSLATION_RULES = [
    [/(\d+)\s*ta yo'nalish/g, '$1 programs'],
    [/(\d+)\s*o'rin/g, '$1 seats'],
    [/(\d+)\s*a'zo/g, '$1 members'],
    [/(\d+)\s*ball/g, '$1 points'],
    [/(\d+)\s*yil/g, '$1 years'],
    [/\bKod:\s*/g, 'Code: '],
    [/\bMuddat:\s*/g, 'Duration: '],
    [/\bBall:\s*/g, 'Score: '],
    [/\bO'rin:\s*/g, 'Seats: ']
];

const TOKEN_TRANSLATION_RULES = [
    [/\bMoliyaviy\b/g, 'Financial'],
    [/\bMoliya\b/g, 'Finance'],
    [/\bKredit\b/g, 'Credit'],
    [/\bBank\b/g, 'Bank'],
    [/\bMenejmenti\b/g, 'Management'],
    [/\bMenejeri\b/g, 'Manager'],
    [/\bMenejer\b/g, 'Manager'],
    [/\bAnalitik\b/g, 'Analyst'],
    [/\bTahlil\b/g, 'Analysis'],
    [/\bTahlilchi\b/g, 'Analyst'],
    [/\bMutaxassis\b/g, 'Specialist'],
    [/\bEkspert\b/g, 'Expert'],
    [/\bKonsultant\b/g, 'Consultant'],
    [/\bXalqaro\b/g, 'International'],
    [/\bSug'urta\b/g, 'Insurance'],
    [/\bInvestitsiyalar\b/g, 'Investments'],
    [/\bIqtisodiyot\b/g, 'Economics'],
    [/\bIqtisodiy\b/g, 'Economic'],
    [/\bBuxgalteriya\b/g, 'Accounting'],
    [/\bBuxgalter\b/g, 'Accountant'],
    [/\bStatistika\b/g, 'Statistics'],
    [/\bMakroiqtisodiyot\b/g, 'Macroeconomics'],
    [/\bMikroiqtisodiyot\b/g, 'Microeconomics']
];

function normalizeLanguage(value) {
    return SUPPORTED_LANGUAGES.includes(value) ? value : 'uz';
}

function t(key) {
    const lang = normalizeLanguage(appData.language);
    return I18N[lang]?.[key] || I18N.uz[key] || key;
}

function tr(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value[normalizeLanguage(appData.language)] || value.uz || value.en || '';
    }

    if (typeof value !== 'string') {
        return value;
    }

    if (appData.language === 'en') {
        return translateTextValue(value);
    }

    return value;
}

function translateTextValue(value) {
    if (normalizeLanguage(appData.language) !== 'en' || typeof value !== 'string') {
        return value;
    }

    let translated = CONTENT_TRANSLATIONS[value] || value;
    AUTO_TRANSLATION_RULES.forEach(([pattern, replacement]) => {
        translated = translated.replace(pattern, replacement);
    });
    TOKEN_TRANSLATION_RULES.forEach(([pattern, replacement]) => {
        translated = translated.replace(pattern, replacement);
    });
    return translated;
}

function autoTranslateElement(root = document.body) {
    if (normalizeLanguage(appData.language) !== 'en' || !root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parentTag = node.parentElement?.tagName;
            if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
        const next = translateTextValue(node.nodeValue);
        if (next !== node.nodeValue) {
            node.nodeValue = next;
        }
    });

    root.querySelectorAll('[placeholder]').forEach((el) => {
        const val = el.getAttribute('placeholder');
        const next = translateTextValue(val);
        if (next !== val) el.setAttribute('placeholder', next);
    });

    root.querySelectorAll('[aria-label]').forEach((el) => {
        const val = el.getAttribute('aria-label');
        const next = translateTextValue(val);
        if (next !== val) el.setAttribute('aria-label', next);
    });
}

function applyStaticTranslations() {
    const lang = normalizeLanguage(appData.language);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.getAttribute('data-i18n');
        if (!key) return;
        node.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
        const key = node.getAttribute('data-i18n-placeholder');
        if (!key) return;
        node.setAttribute('placeholder', t(key));
    });

    autoTranslateElement(document.body);
}

window.t = t;
window.tr = tr;
window.autoTranslateElement = autoTranslateElement;

// DOM elementlari
const elements = {
    loadingContainer: document.getElementById('loading-container'),
    headerContainer: document.getElementById('header-container'),
    footerContainer: document.getElementById('footer-container'),
    heroStats: document.getElementById('hero-stats'),
    featuresContainer: document.getElementById('features-container'),
    quickLinksContainer: document.getElementById('quick-links-container'),
    newsContainer: document.getElementById('news-container'),
    programsContainer: document.getElementById('programs-container'),
    departmentsContainer: document.getElementById('departments-container'),
    campusContainer: document.getElementById('campus-container'),
    contactContainer: document.getElementById('contact-container'),
    homeLeadershipContainer: document.getElementById('home-leadership'),
    leadershipPageContainer: document.getElementById('leadership-page-grid')
};



// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Asosiy ma'lumotlarni yuklash
        await loadAppData();
        
        // Komponentlarni yuklash
        await loadComponents();
        
        // Kontentni yuklash
        await loadPageContent();
        renderNewsDetailPage();
        
        // Event listenerlarni o'rnatish
        setupEventListeners();
        
        // Animatsiyalarni o'rnatish
        setupAnimations();
        
        // Yuklashni yakunlash
        finishLoading();
        
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        showError(t('page_load_error'));
    }
});

const DATA_KEY = 'siteData';
const PERSIST_DB_NAME = 'tdu_site_storage';
const PERSIST_STORE_NAME = 'kv';
const PERSIST_SITE_KEY = 'siteData';

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
            const tx = db.transaction(PERSIST_STORE_NAME, 'readonly');
            const req = tx.objectStore(PERSIST_STORE_NAME).get(PERSIST_SITE_KEY);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
        db.close();
        if (value && typeof value === 'object' && Object.keys(value).length) {
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
            if (parsed && typeof parsed === 'object' && Object.keys(parsed).length) return parsed;
        }
    } catch (error) {
        // ignore
    }

    return null;
}

// Asosiy ma'lumotlarni yuklash
async function loadAppData() {
    try {
        const previousData = window.appData;
        let fileData = null;
        try {
            const response = await fetch('/api/site-data');
            if (!response.ok) throw new Error('API ma\'lumot topilmadi');
            fileData = await response.json();
        } catch (error) {
            try {
                const response = await fetch('data.json');
                if (!response.ok) throw new Error('Data fayli topilmadi');
                fileData = await response.json();
            } catch (innerError) {
                fileData = null;
            }
        }
        if (fileData) {
            window.__fileData = fileData;
            window.__fileDataCache = fileData;
        } else if (window.__fileDataCache) {
            fileData = window.__fileDataCache;
            window.__fileData = fileData;
        } else {
            window.__fileData = null;
        }

        const savedData = await readPersistentSiteData();
        const hasSavedData = savedData && typeof savedData === 'object' && Object.keys(savedData).length;

        if (fileData && hasSavedData) {
            window.appData = mergeDeep(fileData, savedData);
        } else if (hasSavedData) {
            window.appData = savedData;
        } else if (fileData) {
            window.appData = fileData;
        } else if (previousData && typeof previousData === 'object') {
            window.appData = previousData;
        } else {
            window.appData = getDefaultData();
        }

        // Agar admin panelda saqlangan ma'lumot bo'lmasa yoki bo'sh bo'lsa, data.json dan to'ldiramiz
        const getByPath = (obj, path) => path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
        const setByPath = (obj, path, value) => {
            const keys = path.split('.');
            const lastKey = keys.pop();
            const target = keys.reduce((acc, key) => {
                if (!acc[key] || typeof acc[key] !== 'object') acc[key] = {};
                return acc[key];
            }, obj);
            target[lastKey] = value;
        };
        const restoreIfEmpty = (path) => {
            const savedList = getByPath(savedData, path);
            const fileList = getByPath(fileData, path);
            if (Array.isArray(savedList) && savedList.length === 0 && Array.isArray(fileList) && fileList.length) {
                setByPath(window.appData, path, fileList);
            }
        };

        const hasSavedStats = Array.isArray(savedData?.stats) && savedData.stats.length;
        if (!hasSavedStats && Array.isArray(fileData?.stats)) {
            window.appData.stats = fileData.stats;
        }

        const hasSavedLeadership = Array.isArray(savedData?.rahbariyat) && savedData.rahbariyat.length;
        if (!hasSavedLeadership && Array.isArray(fileData?.rahbariyat)) {
            window.appData.rahbariyat = fileData.rahbariyat;
        }

        const hasSavedLeadershipEn = Array.isArray(savedData?.leadership) && savedData.leadership.length;
        if (!hasSavedLeadershipEn && Array.isArray(fileData?.leadership)) {
            window.appData.leadership = fileData.leadership;
        }

        restoreIfEmpty('features');
        restoreIfEmpty('news');
        restoreIfEmpty('departments');
        restoreIfEmpty('programs.bachelor');
        restoreIfEmpty('programs.master');
        restoreIfEmpty('programs.extramural');
        restoreIfEmpty('campus.achievements');
        restoreIfEmpty('campus.upcomingEvents');
        restoreIfEmpty('campus.clubs');
        restoreIfEmpty('campus.facilities');

        // Noto'liq localStorage ma'lumotlari bo'lsa, default bilan to'ldirish
        window.appData = mergeWithDefaults(window.appData, getDefaultData());

        // Agar rahbariyat yo'qolib qolsa, oxirgi data.json dan qayta tiklaymiz
        const cachedLeaders = window.__fileDataCache?.rahbariyat || window.__fileDataCache?.leadership || [];
        if ((!Array.isArray(window.appData.rahbariyat) || !window.appData.rahbariyat.length) && Array.isArray(cachedLeaders) && cachedLeaders.length) {
            window.appData.rahbariyat = cachedLeaders;
        }
        if ((!Array.isArray(window.appData.leadership) || !window.appData.leadership.length) && Array.isArray(cachedLeaders) && cachedLeaders.length) {
            window.appData.leadership = cachedLeaders;
        }
        
        // LocalStorage dan user ma'lumotlari
        const savedUser = localStorage.getItem('tdu_user');
        if (savedUser) {
            appData.user = JSON.parse(savedUser);
        }
        
        // Til sozlamalari
        const savedLang = localStorage.getItem('tdu_language');
        if (savedLang) {
            appData.language = normalizeLanguage(savedLang);
        }
        
    } catch (error) {
        console.warn('Asosiy ma\'lumotlar yuklanmadi, default ma\'lumotlar ishlatilmoqda');
        window.appData = getDefaultData();
    }
}
window.loadAppData = loadAppData;

// Admin paneldan real vaqt yangilanishlar
const ENABLE_LIVE_SYNC = false;
const SITE_SYNC_CHANNEL = "tdu_site_sync";
let siteSyncChannel = null;
try {
    siteSyncChannel = new BroadcastChannel(SITE_SYNC_CHANNEL);
    siteSyncChannel.onmessage = (event) => {
        if (ENABLE_LIVE_SYNC && event?.data?.type === "siteDataUpdated") {
            refreshSiteData();
        }
    };
} catch (error) {
    // BroadcastChannel qo'llab-quvvatlanmasa, storage event ishlaydi
}

window.addEventListener("storage", (event) => {
    if (ENABLE_LIVE_SYNC && event.key === DATA_KEY) {
        refreshSiteData();
    }
});

let lastDataSync = 0;
async function refreshSiteData() {
    if (!ENABLE_LIVE_SYNC) return;
    const now = Date.now();
    if (now - lastDataSync < 500) return;
    lastDataSync = now;
    await loadAppData();
    if (elements.headerContainer) {
        elements.headerContainer.innerHTML = generateHeader();
    }
    if (elements.footerContainer) {
        elements.footerContainer.innerHTML = generateFooter();
    }
    applyStaticTranslations();
    await loadPageContent();
    renderNewsDetailPage();
}

// Fallback polling (har 10 soniyada)
if (ENABLE_LIVE_SYNC) {
    setInterval(() => {
        refreshSiteData();
    }, 10000);
}

function mergeDeep(base, override) {
    if (Array.isArray(override)) return override;
    if (override === null || override === undefined) return base;

    const baseIsObject = base && typeof base === 'object' && !Array.isArray(base);
    const overrideIsObject = typeof override === 'object' && !Array.isArray(override);
    if (!baseIsObject || !overrideIsObject) return override;

    const result = { ...base };
    Object.keys(override).forEach((key) => {
        result[key] = mergeDeep(base?.[key], override[key]);
    });
    return result;
}

function mergeWithDefaults(source, defaults) {
    if (Array.isArray(defaults)) {
        return Array.isArray(source) && source.length ? source : defaults;
    }

    if (defaults && typeof defaults === 'object') {
        const result = { ...defaults };
        const input = source && typeof source === 'object' ? source : {};

        Object.keys(input).forEach((key) => {
            result[key] = mergeWithDefaults(input[key], defaults[key]);
        });

        return result;
    }

    return source !== undefined && source !== null ? source : defaults;
}

// Default ma'lumotlar
function getDefaultData() {
    return {
        university: {
            name: "Termiz Davlat Universiteti",
            faculty: "Iqtisodiyot Fakulteti",
            address: "Termiz shahri, Universitet ko'chasi, 43-uy",
            phone: "+998 76 123 45 67",
            email: "info@tdu-iqtisod.uz",
            founded: 1992,
            videoEmbedUrl: "https://www.youtube.com/embed?listType=search&list=Termiz+Davlat+Universiteti"
        },
        
        stats: [
            { icon: "users", value: "2000+", label: "Talabalar" },
            { icon: "chalkboard-teacher", value: "50+", label: "Professor o'qtuvchilar" },
            { icon: "graduation-cap", value: "95%", label: "Bitiruvchilar" }
        ],
        
        features: [
            {
                icon: "laptop-code",
                title: "Zamonaviy ta'lim",
                description: "Eng so'nggi texnologiyalar va usullardan foydalanamiz"
            },
            {
                icon: "briefcase",
                title: "Amaliyot imkoniyatlari",
                description: "Yirik korxona va banklarda amaliyot"
            },
            {
                icon: "globe-asia",
                title: "Xalqaro hamkorlik",
                description: "Chetdagi universitetlar bilan almashuv dasturlari"
            },
            {
                icon: "handshake",
                title: "Karyera yordami",
                description: "Bitiruvchilarga ish topishda yordam"
            }
        ],
        
        quickLinks: [
            {
                icon: "history",
                title: "Tarix",
                description: "Fakultetimiz tarixi va rivojlanishi",
                link: "#about"
            },
            {
                icon: "book-open",
                title: "Ta'lim dasturlari",
                description: "Barcha yo'nalishlar haqida batafsil",
                link: "#academic"
            },
            {
                icon: "calendar-alt",
                title: "Tadbirlar taqvimi",
                description: "Yaqin keladigan tadbirlar",
                link: "#campus"
            },
            {
                icon: "calculator",
                title: "Ballarni hisoblash",
                description: "O'tish imkoniyatingizni bilib oling",
                link: "#calculator"
            }
        ],
        
        news: [
            {
                id: 1,
                title: "Yangi o'quv yili boshlanishi",
                date: "2024-09-01",
                description: "2024-2025 o'quv yili tantanali ravishda boshlanmoqda",
                category: "Tadbirlar"
            },
            {
                id: 2,
                title: "Xalqaro hamkorlik shartnomasi",
                date: "2024-08-20",
                description: "Germaniya universiteti bilan yangi hamkorlik",
                category: "Xalqaro"
            },
            {
                id: 3,
                title: "Fan olimpiadasi g'oliblari",
                date: "2024-08-10",
                description: "Talabalarimiz respublika olimpiadasida g'olib bo'ldi",
                category: "Yutuqlar"
            }
        ],
        
        programs: {
            bachelor: [
                {
                    id: 1,
                    name: "Iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
                    code: "60110100",
                    duration: "4 yil",
                    description: "Iqtisodiy jarayonlarni tahlil qilish va bashorat qilish ko'nikmalari",
                    score: 120,
                    seats: 10,
                    form: "Kunduzgi",
                    department: "Iqtisodiyot va turizm"
                },
                {
                    id: 2,
                    name: "Moliya va moliyaviy texnologiyalar",
                    code: "60110200",
                    duration: "4 yil",
                    description: "Zamonaviy moliyaviy tizimlarni boshqarish",
                    score: 115,
                    seats: 80,
                    form: "Kunduzgi",
                    department: "Moliya va bank ishi"
                },
                {
                    id: 1,
                    name: "Raqamli-iqtisodiyot (tarmoqlar va sohalar bo'yicha)",
                    code: "60110100",
                    duration: "4 yil",
                    description: "Iqtisodiy jarayonlarni tahlil qilish va bashorat qilish ko'nikmalari",
                    score: 130,
                    seats: 10,
                    form: "Kunduzgi",
                    department: "Iqtisodiyot va turizm"
                },
                {
                    id: 2,
                    name: "Bugalteriya",
                    code: "60110200",
                    duration: "4 yil",
                    description: "Zamonaviy moliyaviy tizimlarni boshqarish",
                    score: 115,
                    seats: 50,
                    form: "Kunduzgi",
                    department: "Bugalteriya"
                }
            ],
            master: [
                {
                    id: 1,
                    name: "Iqtisodiyot nazariyasi",
                    code: "70110101",
                    duration: "2 yil",
                    description: "Ilmiy tadqiqotlar va nazariy bilimlar",
                    score: 65,
                    seats: 30,
                    form: "Kunduzgi",
                    department: "Iqtisodiyot va turizm"
                }
            ],
            extramural: [
                {
                    id: 1,
                    name: "Iqtisodiyot (sirtqi)",
                    code: "60110101",
                    duration: "5 yil",
                    description: "Ishlaydiganlar uchun maxsus dastur",
                    score: 110,
                    seats: 150,
                    form: "Sirtqi",
                    department: "Iqtisodiyot va turizm"
                }
            ]
        },
        
        departments: [
            {
                id: 1,
                name: "Iqtisodiyot va turizm",
                head: "Prof. N. Xolmatov",
                teachers: 15,
                students: 600,
                description: "Iqtisodiy tahlil va turizm sohasidagi tadqiqotlar",
                teachersList: [
                    { name: "Prof. A. Alimov", degree: "Iqtisod fanlari doktori" },
                    { name: "DoГ§. M. Mahmudov", degree: "Iqtisod fanlari nomzodi" }
                ]
            }
        ],
        
        campus: {
            clubs: [
                {
                    name: "Yosh iqtisodchilar klubi",
                    icon: "chart-bar",
                    description: "Haftada 1 marta yig'ilishlar, seminar va treninglar",
                    members: 120
                },
                {
                    name: "Zakovat jamoasi",
                    icon: "brain",
                    description: "Intellektual musobaqalar, olimpiadalar",
                    members: 50
                }
            ],
            facilities: [
                {
                    name: "Yotoqxona",
                    icon: "home",
                    description: "350 o'rinli, zamonaviy sharoitlar"
                },
                {
                    name: "Kutubxona",
                    icon: "book",
                    description: "50,000 dan ortiq adabiyotlar"
                }
            ],
            achievements: [
                {
                    title: "Respublika iqtisodiyot olimpiadasi",
                    year: 2023,
                    result: "1-o'rin",
                    description: "3 talaba g'olib bo'ldi"
                }
            ]
        },
        
        contact: {
            admission: {
                phone: "+998 76 123 45 70",
                email: "admission@tdu-iqtisod.uz",
                hours: "9:00-18:00",
                address: "Termiz shahri, Qabul komissiyasi"
            },
            deanOffice: {
                phone: "+998 76 123 45 67",
                email: "dekan@tdu-iqtisod.uz",
                hours: "10:00-12:00 (Dushanba-Chorshanba)"
            }
        }
    };
}

// Komponentlarni yuklash
async function loadComponents() {
    // Loading komponenti
    elements.loadingContainer.innerHTML = `
        <div class="loader">
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">
                    <h3>${window.appData.university.name}</h3>
                    <p>${window.appData.university.faculty}</p>
                </div>
            </div>
        </div>
    `;
    
    // Header komponenti
    elements.headerContainer.innerHTML = generateHeader();
    elements.headerContainer.classList.add('header');
    document.body.classList.add('has-fixed-header');
    
    // Footer komponenti
    elements.footerContainer.innerHTML = generateFooter();
    applyStaticTranslations();
}

// Header generatsiya qilish (generateHeader funksiyasini yangilash)
function generateHeader() {
    const isActive = (page) => appData.currentPage === page ? 'active' : '';
    const departments = window.appData?.departments || [];
    const departmentLinks = departments.length
        ? departments.map((dept) => `
            <a href="department-detail.html?id=${encodeURIComponent(dept.id)}">
                <span>${tr(dept.name)}</span>
            </a>
        `).join('')
        : '';
    
    return `
        <div class="container">
            <!-- Logo -->
            <a href="index.html" class="logo">
                <div class="logo-icon">
                    <img src="image/photo_2026-03-06_11-08-00.jpg" alt="icon">
                </div>
                <div class="logo-text">
                    <h1>${tr(window.appData.university.name)}</h1>
                    <p>${tr(window.appData.university.faculty)}</p>
                </div>
            </a>

            <!-- Navigation -->
            <nav class="navbar">
                <ul>
                    <li>
                        <a href="index.html" class="${isActive('home')}">
                            <i class="fas fa-home"></i>
                            <span>${t('nav_home')}</span>
                        </a>
                    </li>
                    <li class="has-dropdown">
                        <a href="about.html" class="${isActive('about')}">
                            <i class="fas fa-info-circle"></i>
                            <span>${t('nav_about')}</span>
                        </a>
                        <div class="dropdown-menu">
                            <a href="about.html">
                                <span>${t('nav_about')}</span>
                            </a>
                            <a href="leadership.html">
                                <span>${t('about_leadership')}</span>
                            </a>
                        </div>
                    </li>
                    <li class="has-dropdown">
                        <a href="academic.html" class="${isActive('academic')}">
                            <i class="fas fa-graduation-cap"></i>
                            <span>${t('nav_education')}</span>
                        </a>
                        <div class="dropdown-menu">
                            <a href="academic.html#bachelor-content">
                                <span>${t('academic_bachelor_forms')}</span>
                            </a>
                            <a href="academic.html#master-content">
                                <span>${t('academic_master_programs')}</span>
                            </a>
                        </div>
                    </li>
                    <li class="has-dropdown">
                        <a href="departments.html" class="${isActive('departments')}">
                            <i class="fas fa-building"></i>
                            <span>${t('nav_departments')}</span>
                        </a>
                        <div class="dropdown-menu">
                            <a href="departments.html">
                                <span>${t('nav_departments')}</span>
                            </a>
                            ${departmentLinks}
                        </div>
                    </li>
                    <li>
                        <a href="campus.html" class="${isActive('campus')}">
                            <i class="fas fa-users"></i>
                            <span>${t('nav_student_life')}</span>
                        </a>
                    </li>
                    <li>
                        <a href="contact.html" class="${isActive('contact')}">
                            <i class="fas fa-phone-alt"></i>
                            <span>${t('nav_contact')}</span>
                        </a>
                    </li>
                </ul>
                
                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>

            <!-- Right Actions -->
            <div class="header-actions">
                <div class="language-selector">
                    <button class="lang-btn" onclick="toggleLanguage()">
                        <i class="fas fa-globe"></i>
                        <span>${normalizeLanguage(appData.language).toUpperCase()}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Footer generatsiya qilish
function generateFooter() {
    return `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <div class="logo-icon">
                            <img src="image/photo_2026-03-06_11-08-00.jpg" alt="icon">
                        </div>
                        <div class="footer-logo-text">
                            <h3>${tr(window.appData.university.name)}</h3>
                            <p>${tr(window.appData.university.faculty)}</p>
                        </div>
                    </div>
                    <p class="footer-description">
                        ${t('footer_desc')}
                    </p>
                    <div class="footer-social">
                        <a href="#" class="social-icon">
                            <i class="fab fa-telegram"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>${t('quick_links')}</h4>
                    <ul class="footer-links">
                        <li><a href="index.html"><i class="fas fa-chevron-right"></i> ${t('nav_home')}</a></li>
                        <li><a href="about.html" onclick="loadSection('about')"><i class="fas fa-chevron-right"></i> ${t('nav_about')}</a></li>
                        <li><a href="academic.html" onclick="loadSection('academic')"><i class="fas fa-chevron-right"></i> ${t('education_programs')}</a></li>
                        <li><a href="departments.html" onclick="loadSection('departments')"><i class="fas fa-chevron-right"></i> ${t('nav_departments')}</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>${t('contact_info')}</h4>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${window.appData.university.address}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${window.appData.university.phone}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${window.appData.university.email}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <span>${t('weekdays_hours')}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; ${new Date().getFullYear()} ${window.appData.university.name} ${tr(window.appData.university.faculty)}. ${t('footer_rights')}</p>
                    <div class="footer-bottom-links">
                        <a href="#privacy" onclick="showPrivacy()">${t('privacy_policy')}</a>
                        <a href="#terms" onclick="showTerms()">${t('terms_of_use')}</a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Back to top button -->
        <button id="backToTop" class="back-to-top">
            <i class="fas fa-arrow-up"></i>
        </button>
    `;
}

// Sahifa kontentini yuklash
async function loadPageContent() {
    // Hero stats yuklash
    if (elements.heroStats) {
        elements.heroStats.innerHTML = window.appData.stats.map(stat => `
            <div class="stat-card glass animate-on-scroll">
                <div class="stat-icon">
                    <i class="fas fa-${stat.icon}"></i>
                </div>
                <h3 class="counter-value" data-target="${stat.value}">0</h3>
                <p>${tr(stat.label)}</p>
            </div>
        `).join('');
        animateHeroCounters();
    }
    
    // Features yuklash
    if (elements.featuresContainer) {
        elements.featuresContainer.innerHTML = window.appData.features.map(feature => `
            <div class="feature-card glass animate-on-scroll">
                <div class="feature-icon">
                    <i class="fas fa-${feature.icon}"></i>
                </div>
                <h3>${tr(feature.title)}</h3>
                <p>${tr(feature.description)}</p>
            </div>
        `).join('');
    }

    // Rahbariyat (bosh sahifa)
    if (elements.homeLeadershipContainer) {
        let leaders = (window.appData.rahbariyat || window.appData.leadership || []);
        if (!Array.isArray(leaders) || !leaders.length) {
            const fallbackLeaders = (window.__fileData?.rahbariyat || window.__fileData?.leadership || []);
            leaders = Array.isArray(fallbackLeaders) ? fallbackLeaders : [];
        }
        elements.homeLeadershipContainer.innerHTML = renderHomeLeadershipCards(leaders.slice(0, 3));
    }

    // Rahbariyat (alohida sahifa)
    if (elements.leadershipPageContainer) {
        let leaders = (window.appData.rahbariyat || window.appData.leadership || []);
        if (!Array.isArray(leaders) || !leaders.length) {
            const fallbackLeaders = (window.__fileData?.rahbariyat || window.__fileData?.leadership || []);
            leaders = Array.isArray(fallbackLeaders) ? fallbackLeaders : [];
        }
        elements.leadershipPageContainer.innerHTML = renderHomeLeadershipCards(leaders);
    }
    
    // Quick links yuklash
    if (elements.quickLinksContainer) {
        elements.quickLinksContainer.innerHTML = window.appData.quickLinks.map(link => `
            <a href="${link.link}" class="quick-link-card animate-on-scroll" onclick="loadSection('${link.link.replace('#', '')}')">
                <div class="quick-link-icon">
                    <i class="fas fa-${link.icon}"></i>
                </div>
                <h3>${tr(link.title)}</h3>
                <p>${tr(link.description)}</p>
                <span class="quick-link-arrow">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </a>
        `).join('');
    }
    
    // News yuklash
    if (elements.newsContainer) {
        const allNews = window.appData.news || [];
        const initialNews = allNews.slice(0, 3);
        const extraNews = allNews.slice(3);

        elements.newsContainer.innerHTML = `
            <div class="news-layout">
                <div class="news-primary-grid">
                    ${renderNewsCards(initialNews)}
                </div>
            ${extraNews.length ? `
                <aside id="news-extra-wrap" class="news-extra-wrap">
                    <div class="news-side-list">
                        ${renderNewsCards(extraNews)}
                    </div>
                </aside>
            ` : ''}
            </div>
        `;
    }
    
    // Programs yuklash
    if (elements.programsContainer) {
        loadPrograms('bachelor');
    }
    
    // Departments yuklash
    if (elements.departmentsContainer) {
        loadDepartments();
    }
    
    // Campus yuklash
    if (elements.campusContainer) {
        loadCampusLife();
    }
    
    // Contact yuklash
    if (elements.contactContainer) {
        loadContactSection();
    }

    autoTranslateElement(document.body);
}

function renderHomeLeadershipCards(leaders) {
    if (!Array.isArray(leaders) || !leaders.length) {
        return '';
    }

    return leaders.map((leader) => {
        const name = leader.ism || leader.name || '';
        const position = leader.lavozim || leader.position || '';
        const degree = leader.mutaxassislik || leader.degree || leader.ilmiyDarajasi || '';
        const phone = leader.telefon || leader.phone || '';
        const email = leader.email || '';
        const address = leader.manzil || leader.address || '';
        const reception = leader.qabulVaqti || leader.workHours || leader.reception || '';
        const telegram = leader.telegram || '';
        const avatar = leader.rasm || leader.image || '';
        const initials = (String(name).trim().split(/\s+/).map((s) => s[0]).join('').slice(0, 2) || 'AD').toUpperCase();
        const media = avatar
            ? `<img src="${avatar}" alt="${name}" onerror="this.remove(); this.parentElement.insertAdjacentHTML('beforeend','<span class=&quot;home-leader-initials&quot; aria-hidden=&quot;true&quot;>${initials}</span>')">`
            : `<span class="home-leader-initials" aria-hidden="true">${initials}</span>`;

        const contactRows = [
            reception ? `<li><i class="far fa-clock"></i><strong>${t('reception_hours')}:</strong> <span>${tr(reception)}</span></li>` : '',
            phone ? `<li><i class="fas fa-phone"></i><strong>${t('phone_number')}:</strong> <span>${phone}</span></li>` : '',
            email ? `<li><i class="far fa-envelope"></i><strong>${t('email')}:</strong> <span>${email}</span></li>` : '',
            telegram ? `<li><i class="fab fa-telegram"></i><strong>Telegram:</strong> <span>${telegram}</span></li>` : '',
            address ? `<li><i class="fas fa-location-dot"></i><strong>${t('address')}:</strong> <span>${tr(address)}</span></li>` : ''
        ].filter(Boolean).join('');

        return `
            <article class="home-leader-card animate-on-scroll">
                <div class="home-leader-media">${media}</div>
                <div class="home-leader-body">
                    <div class="home-leader-kicker">${tr(position)}</div>
                    <h3 class="home-leader-name">${name}</h3>
                    ${degree ? `<div class="home-leader-degree">${tr(degree)}</div>` : ''}
                    ${contactRows ? `<ul class="home-leader-contacts">${contactRows}</ul>` : ''}
                </div>
            </article>
        `;
    }).join('');
}

// Programs yuklash
function loadPrograms(type = 'bachelor') {
    if (!elements.programsContainer) return;
    
    const programs = window.appData.programs[type];
    if (!programs) return;
    
    elements.programsContainer.innerHTML = `
        <div class="programs-container">
            ${programs.map(program => `
                <div class="program-card animate-on-scroll">
                    <div class="program-header">
                        <div>
                            <h3 class="program-title">${tr(program.name)}</h3>
                            <div class="program-code">${program.code}</div>
                        </div>
                        <span class="program-duration">${tr(program.duration)}</span>
                    </div>
                    <p class="program-description">${tr(program.description)}</p>
                    
                    <div class="program-details">
                        <div class="detail-item">
                            <span class="detail-label">${tr("O'tish balli:")}</span>
                            <span class="detail-value ${getScoreClass(program.score)}">${program.score}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${tr("O'rinlar soni:")}</span>
                            <span class="detail-value">${program.seats}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${tr("Ta'lim shakli:")}</span>
                            <span class="detail-value">${tr(program.form)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${tr("Kafedra:")}</span>
                            <span class="detail-value">${tr(program.department)}</span>
                        </div>
                    </div>
                    
                    <div class="program-actions">
                        <button class="btn btn-primary" onclick="showProgramDetail(${program.id}, '${type}')">
                            <i class="fas fa-info-circle"></i>
                            ${t('news_read_more')}
                        </button>
                         <a href="contact.html"><button class="btn btn-outline" onclick="calculateForProgram(${program.score}, '${program.name}')">
            <i class="fas fa-calculator"></i>
            Ballarni hisoblash
        </button></a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Tab butonlarini yangilash
    document.querySelectorAll('.baka.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === type) {
            btn.classList.add('active');
        }
    });
}

// Departments yuklash
function loadDepartments() {
    if (!elements.departmentsContainer) return;
    
    elements.departmentsContainer.innerHTML = window.appData.departments.map(dept => `
        <div class="department-card animate-on-scroll">
            <div class="department-header">
                <h3 class="department-name">${tr(dept.name)}</h3>
                <div class="department-head">${tr(dept.head)}</div>
            </div>
            
            <div class="department-stats">
                <div class="stat-badge">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span>${dept.teachers}</span>
                    <small>${t('dept_teacher')}</small>
                </div>
                <div class="stat-badge">
                    <i class="fas fa-user-graduate"></i>
                    <span>${dept.students}</span>
                    <small>${t('dept_student')}</small>
                </div>
            </div>
            
            <p class="department-description">${tr(dept.description)}</p>
            
            <div class="department-teachers">
                <h4 class="teachers-title">
                    <i class="fas fa-users"></i>
                    ${t('dept_teachers_title')}
                </h4>
                <div class="teachers-list">
                    ${(dept.teachersList || []).map(teacher => `
                        <div class="teacher-item">
                            <div class="teacher-avatar">
                                ${getInitials(teacher.name)}
                            </div>
                            <div class="teacher-info">
                                <h5>${teacher.name}</h5>
                                <p>${tr(teacher.degree)}</p>
                            </div>
                        </div>
                    `).join('') || `<p>${t('dept_teachers_missing')}</p>`}
                </div>
            </div>
            
            <div class="department-actions">
                <a class="btn btn-primary" href="department-detail.html?id=${dept.id}">
                    <i class="fas fa-eye"></i>
                    ${t('news_read_more')}
                </a>
            </div>
        </div>
    `).join('');
}

// Campus life yuklash
function loadCampusLife() {
    if (!elements.campusContainer) return;
    
    const campus = window.appData.campus || {};
    const clubs = campus.clubs || [];
    const facilities = campus.facilities || [];
    const achievements = campus.achievements || [];
    const upcomingEvents = campus.upcomingEvents || [
        {
            day: "15",
            month: "Sentyabr",
            title: "\"Yosh iqtisodchilar\" klubining ochilishi",
            description: "Asosiy binoda, 16:00 da",
            image: "univer.jpg"
        },
        {
            day: "25",
            month: "Sentyabr",
            title: "Xalqaro moliya haftaligi",
            description: "4 kunlik seminar va treninglar",
            image: "img.png"
        }
    ];
    
    elements.campusContainer.innerHTML = `
        <div class="campus-grid">
            <div class="campus-card animate-on-scroll">
                <div class="campus-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>${normalizeLanguage(appData.language) === 'en' ? 'Clubs and Communities' : "Klublar va to'garaklar"}</h3>
                <div class="campus-list">
                    ${clubs.map(club => `
                        <div class="campus-item">
                            <i class="fas fa-${club.icon}"></i>
                            <div>
                                <strong>${tr(club.name)}</strong>
                                <p>${tr(club.description)} (${club.members} ${normalizeLanguage(appData.language) === 'en' ? 'members' : "a'zo"})</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="campus-card animate-on-scroll">
                <div class="campus-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h3>${normalizeLanguage(appData.language) === 'en' ? 'Infrastructure' : 'Infratuzilma'}</h3>
                <div class="campus-list">
                    ${facilities.map(facility => `
                        <div class="campus-item">
                            <i class="fas fa-${facility.icon}"></i>
                            <div>
                                <strong>${tr(facility.name)}</strong>
                                <p>${tr(facility.description)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="campus-card animate-on-scroll">
                <div class="campus-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>${tr('Yutuqlar')}</h3>
                <div class="campus-list">
                    ${achievements.map(achievement => `
                        <div class="campus-item">
                            <i class="fas fa-award"></i>
                            <div>
                                <strong>${tr(achievement.title)}</strong>
                                <p>${achievement.year} - ${tr(achievement.result)}</p>
                                <small>${tr(achievement.description)}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="campus-events animate-on-scroll" style="margin-top: 50px;">
            <h3 style="text-align: center; margin-bottom: 30px;">${tr("Yaqin keladigan tadbirlar")}</h3>
            <div class="events-timeline">
                ${upcomingEvents.map(event => `
                    <div class="event-item">
                        <div class="event-date">
                            <span class="event-day">${event.day || ""}</span>
                            <span class="event-month">${event.month || ""}</span>
                        </div>
                        <div class="event-media" style="${getEventImageStyle(event.image)}"></div>
                        <div class="event-content">
                            <h4>${event.title || ""}</h4>
                            <p>${event.description || ""}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Contact section yuklash
function loadContactSection() {
    if (!elements.contactContainer) return;
    
    const admission = window.appData?.contact?.admission || {};
    
    elements.contactContainer.innerHTML = `
        <div class="contact-grid">
            <div class="contact-info-card animate-on-scroll">
                <h3>${t('admission_committee')}</h3>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-details">
                        <h4>${t('phone_number')}</h4>
                        <p>${admission.phone || ''}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-details">
                        <h4>${t('email')}</h4>
                        <p>${admission.email || ''}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="contact-details">
                        <h4>${t('work_hours')}</h4>
                        <p>${admission.hours || ''}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-details">
                        <h4>${t('address')}</h4>
                        <p>${admission.address || ''}</p>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-card animate-on-scroll">
                <h3>${t('score_calculator')}</h3>
                <form id="calculator-form">
                    <div class="form-group">
                        <label class="form-label">${t('test_score')}</label>
                        <input type="number" id="test-score" class="form-input" 
                               min="0" max="189" placeholder="${normalizeLanguage(appData.language) === 'en' ? 'Example: 145' : 'Masalan: 145'}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">${t('direction_type')}</label>
                        <select id="program-type" class="form-select">
                            <option value="Kunduzgi">Kunduzgi</option>
                            <option value="Kechki">Kechki</option>
                            <option value="Masofaviy">Masofaviy</option>
                            <option value="Sirtqi">Sirtqi</option>
                            <option value="Magistr">Magistr</option>
                        </select>
                    </div>
                    
                    <button type="button" class="btn btn-primary" onclick="calculateAdmissionScore()">
                        <i class="fas fa-calculator"></i>
                        ${t('calculate')}
                    </button>
                </form>
                
                <div id="calculator-result" class="calculator-result"></div>
            </div>
            
            <div class="contact-form-card animate-on-scroll" style="grid-column: span 2;">
                <h3>${t('leave_message')}</h3>
                <form id="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">${t('your_name')}</label>
                            <input type="text" id="contact-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">${t('your_phone')}</label>
                            <input type="tel" id="contact-phone" class="form-input" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">${t('email')}</label>
                        <input type="email" id="contact-email" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">${t('subject')}</label>
                        <select id="contact-subject" class="form-select">
                            <option value="admission">${t('admission_about')}</option>
                            <option value="programs">${t('programs_about')}</option>
                            <option value="other">${t('other')}</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">${t('message')}</label>
                        <textarea id="contact-message" class="form-textarea" rows="4"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i>
                        ${t('send')}
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Helper functions
function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return String(dateString || '');
    }

    const isEn = normalizeLanguage(appData.language) === 'en';
    if (isEn) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const uzMonths = [
        'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
        'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
    ];
    const day = date.getDate();
    const month = uzMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month} ${year}`;
}

function getScoreClass(score) {
    if (score >= 140) return 'high';
    if (score >= 120) return 'medium';
    return 'low';
}

function getInitials(name) {
    return name.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

function animateHeroCounters() {
    const counters = document.querySelectorAll('.counter-value[data-target]');
    counters.forEach((counter) => {
        const raw = String(counter.dataset.target || '').trim();
        const match = raw.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
        if (!match) {
            counter.textContent = raw;
            return;
        }

        const numberPart = match[1].replace(',', '.');
        const suffix = match[2] || '';
        const target = Number(numberPart);
        if (!Number.isFinite(target)) {
            counter.textContent = raw;
            return;
        }

        const hasDecimal = numberPart.includes('.');
        const decimalPlaces = hasDecimal ? (numberPart.split('.')[1]?.length || 0) : 0;
        const duration = 1400;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            const value = hasDecimal ? current.toFixed(decimalPlaces) : Math.floor(current).toString();
            counter.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${hasDecimal ? target.toFixed(decimalPlaces) : Math.round(target)}${suffix}`;
            }
        }

        requestAnimationFrame(update);
    });
}

function renderNewsCards(newsList) {
    return newsList.map(news => `
        <div class="news-card animate-on-scroll">
            <div class="news-image" style="${getNewsImageStyle(news.image)}">
                <div class="news-category">${tr(news.category)}</div>
            </div>
            <div class="news-content">
                <span class="news-date">${formatDate(news.date)}</span>
                <h3>${tr(news.title)}</h3>
                <p class="news-excerpt">${getExcerpt(tr(news.description), 120)}</p>
                <a href="news-detail.html?id=${news.id}" class="news-read-more">
                    ${t('news_read_more')}
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function getNewsImageStyle(image) {
    const safe = String(image || "").trim();
    if (!safe) {
        return "background: linear-gradient(135deg, var(--primary), var(--secondary));";
    }

    const isAbsolute = /^(https?:|data:|\/)/i.test(safe);
    const hasPath = /[\\/]/.test(safe);
    const normalized = isAbsolute || hasPath ? safe : `image/${safe}`;
    const escaped = normalized.replace(/'/g, "%27");
    return `background-image: linear-gradient(135deg, rgba(37,99,235,.28), rgba(16,185,129,.28)), url('${escaped}'); background-size: cover; background-position: center;`;
}

function getEventImageStyle(image) {
    const safe = String(image || "").trim();
    if (!safe) {
        return "background: linear-gradient(135deg, rgba(37,99,235,.22), rgba(16,185,129,.22));";
    }

    const isAbsolute = /^(https?:|data:|\/)/i.test(safe);
    const hasPath = /[\\/]/.test(safe);
    const normalized = isAbsolute || hasPath ? safe : `image/${safe}`;
    const escaped = normalized.replace(/'/g, "%27");
    return `background-image: linear-gradient(135deg, rgba(15,23,42,.08), rgba(15,23,42,.08)), url('${escaped}'); background-size: cover; background-position: center;`;
}

function getExcerpt(text, max = 120) {
    const value = String(text || '');
    if (value.length <= max) return value;
    return `${value.slice(0, max).trim()}...`;
}

function closeDepartmentDetailModal() {
    const modal = document.getElementById('department-detail-modal');
    if (!modal) return;
    modal.remove();
    document.body.classList.remove('modal-open');
}

function showNewsDetail(newsId, event) {
    if (event) event.preventDefault();
    if (!newsId) return false;
    window.location.href = `news-detail.html?id=${encodeURIComponent(newsId)}`;
    return false;
}

function getNewsById(newsId) {
    const list = window.appData?.news || [];
    return list.find(item => String(item.id) === String(newsId));
}

function renderNewsDetailPage() {
    const container = document.getElementById('news-detail');
    const relatedContainer = document.getElementById('news-related');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const news = getNewsById(id);

    if (!news) {
        container.innerHTML = `
            <div class="news-detail-card">
                <h2>${t('news_close')}</h2>
                <p>${t('page_load_error')}</p>
                <a class="btn-link" href="index.html#news">${t('news_view_all')}</a>
            </div>
        `;
        if (relatedContainer) relatedContainer.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <article class="news-detail-card">
            <div class="news-detail-hero" style="${getNewsImageStyle(news.image)}"></div>
            <div class="news-detail-body">
                <span class="news-detail-date">${formatDate(news.date)}</span>
                <h1 class="news-detail-title">${tr(news.title)}</h1>
                <p class="news-detail-category">${tr(news.category || '')}</p>
                <div class="news-detail-text">
                    ${tr(news.description || '')}
                </div>
                <button class="news-detail-close" type="button" onclick="location.href='index.html#news'">
                    <i class="fas fa-times"></i>
                    ${t('news_close')}
                </button>
            </div>
        </article>
    `;

    if (relatedContainer) {
        const others = (window.appData?.news || []).filter(item => String(item.id) !== String(news.id));
        relatedContainer.innerHTML = others.length ? `
            <div class="news-related">
                <h2 class="news-related-title">${t('latest_news')}</h2>
                <div class="news-related-grid">
                    ${renderNewsCards(others)}
                </div>
            </div>
        ` : '';
    }
}

function showDepartmentDetail(departmentId) {
    const departments = window.appData?.departments || [];
    const dept = departments.find(item => item.id === departmentId);
    if (!dept) return;
    closeDepartmentDetailModal();
    const teacherDetails = (window.appData?.teacherDetails || []).filter((t) => Number(t.departmentId) === Number(departmentId));

    const programs = [
        ...(window.appData?.programs?.bachelor || []),
        ...(window.appData?.programs?.master || []),
        ...(window.appData?.programs?.extramural || [])
    ].filter(program => program.department === dept.name);

    const modalHTML = `
        <div id="department-detail-modal" class="department-modal-overlay">
            <div class="department-modal-content">
                <button class="department-modal-close" type="button" aria-label="${t('modal_close')}">
                    <i class="fas fa-times"></i>
                </button>
                <h3>${tr(dept.name)}</h3>
                <p class="department-modal-head"><strong>${t('dept_head')}</strong> ${tr(dept.head)}</p>
                <p class="department-modal-description">${tr(dept.description)}</p>
                <div class="department-modal-stats">
                    <div><strong>${dept.teachers}</strong><span>${t('dept_teacher')}</span></div>
                    <div><strong>${dept.students}</strong><span>${t('dept_student')}</span></div>
                    <div><strong>${programs.length}</strong><span>${t('dept_program')}</span></div>
                </div>
                <h4>${t('dept_teachers_title')}</h4>
                <ul class="department-modal-list">
                    ${(teacherDetails.length ? teacherDetails : (dept.teachersList || [])).map(teacher => `
                        <li>
                            <span>${teacher.name || teacher.ism || ""}</span>
                            <small>${teacher.degree || teacher.mutaxassislik || ""}</small>
                        </li>
                    `).join('') || `<li><span>${t('dept_teachers_missing')}</span></li>`}
                </ul>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.classList.add('modal-open');

    const modal = document.getElementById('department-detail-modal');
    const closeBtn = modal.querySelector('.department-modal-close');
    closeBtn.addEventListener('click', closeDepartmentDetailModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeDepartmentDetailModal();
        }
    });
}

// Event listenerlarni o'rnatish
function setupEventListeners() {
    // Tab butonlari
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabType = btn.dataset.tab;
            loadPrograms(tabType);
        });
    });
    
    // Mobile menu
    document.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu-btn')) {
            const navbar = document.querySelector('.navbar ul');
            navbar.classList.toggle('active');
        }else{
        }
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Watch video button
    const watchVideoBtn = document.getElementById('watch-video');
    if (watchVideoBtn) {
        watchVideoBtn.addEventListener('click', showVideoModal);
    }

    const allNewsBtn = document.querySelector('a[href="#all-news"]');
    if (allNewsBtn) {
        allNewsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const wrap = document.getElementById('news-extra-wrap');
            const layout = document.querySelector('.news-layout');
            if (!wrap) return;

            const isOpen = wrap.classList.toggle('open');
            if (layout) layout.classList.toggle('with-sidebar', isOpen);
            allNewsBtn.innerHTML = isOpen
                ? `${t('news_show_less')} <i class="fas fa-arrow-up"></i>`
                : `${t('news_view_all')} <i class="fas fa-arrow-right"></i>`;
        });
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
}

// Animatsiyalarni o'rnatish
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Yuklashni yakunlash
function finishLoading() {
    appData.loading = false;
    elements.loadingContainer.style.opacity = '0';
    elements.loadingContainer.style.visibility = 'hidden';
    
    setTimeout(() => {
        elements.loadingContainer.remove();
    }, 500);
}

// Error ko'rsatish
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button onclick="location.reload()">${t('reload')}</button>
        </div>
    `;
    document.body.appendChild(errorDiv);
}

// Global funksiyalar
window.loadSection = function(section) {
    appData.currentPage = section;
    
    // Smooth scroll to section
    const targetElement = document.getElementById(section);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Header yangilash
    elements.headerContainer.innerHTML = generateHeader();
    applyStaticTranslations();
};

window.showDepartmentDetail = showDepartmentDetail;


// Ballarni hisoblash funksiyasi
function calculateAdmissionScore() {
    const scoreInput = document.getElementById('test-score');
    const resultDiv = document.getElementById('calculator-result');
    const programSelect = document.getElementById('program-type');

    if (!scoreInput || !resultDiv || !programSelect) {
        return;
    }

    const programType = programSelect.value;
    
    const score = parseInt(scoreInput.value);
    
    if (!score || score < 0 || score > 189) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${t('calc_score_error')}</p>
            </div>
        `;
        resultDiv.classList.add('show');
        return;
    }
    
    let programs = [];
    if (programType === 'Magistr') {
        programs = window.appData.programs?.master || [];
    } else {
        const bachelor = window.appData.programs?.bachelor || [];
        const extramural = window.appData.programs?.extramural || [];
        const normalizedType = programType === 'Kechki' ? 'Kechgi' : programType;
        programs = [...bachelor, ...extramural].filter((p) => (p.form || '') === normalizedType);
    }

    const availablePrograms = programs.filter(p => score >= p.score);
    
    let resultHTML = `
        <h4>${t('calc_result')} <strong>${score} ${t('calc_score_unit')}</strong></h4>
    `;
    
    if (availablePrograms.length > 0) {
        resultHTML += `
            <p><strong>${t('calc_available_programs')}</strong></p>
            ${availablePrograms.map(program => `
                <div class="program-suggestion">
                    <h5>${tr(program.name)}</h5>
                    <p>${t('calc_required_score')} ${program.score}</p>
                    <p>${t('calc_difference')} <strong style="color: var(--secondary)">+${score - program.score}</strong></p>
                    <p>${t('calc_seats')} ${program.seats}</p>
                </div>
            `).join('')}
        `;
    } else {
        resultHTML += `
            <div class="error-message">
                <i class="fas fa-info-circle"></i>
                <p>${t('calc_no_programs')}</p>
                <p>${t('calc_try_again')}</p>
            </div>
        `;
    }
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();

    if (!document.getElementById('contact-name')) {
        return;
    }

    const formData = {
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    let contacts = JSON.parse(localStorage.getItem('tdu_contacts') || '[]');
    contacts.push(formData);
    localStorage.setItem('tdu_contacts', JSON.stringify(contacts));
    
    // Show success message
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <i class="fas fa-check"></i>
        ${t('submitted')}
    `;
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
    }, 2000);
}

// Video modal
function showVideoModal() {
    const embedUrl = getVideoEmbedUrl(window.appData?.university?.videoEmbedUrl);
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <h3>${t('video_title')}</h3>
                <div class="video-container">
                    <iframe src="${embedUrl}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            modal.remove();
        }
    });
}

// Language toggle
function toggleLanguage() {
    appData.language = normalizeLanguage(appData.language) === 'uz' ? 'en' : 'uz';
    localStorage.setItem('tdu_language', appData.language);
    location.reload();
}

function getVideoEmbedUrl(url) {
    const fallback = 'https://www.youtube.com/embed?listType=search&list=Termiz+Davlat+Universiteti';
    if (!url || typeof url !== 'string') return fallback;

    if (url.includes('youtube.com/watch?v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return id ? `https://www.youtube.com/embed/${id}` : fallback;
    }

    if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}` : fallback;
    }

    return url;
}

// Add modal styles
const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: var(--radius);
        padding: 30px;
        max-width: 800px;
        width: 90%;
        position: relative;
        animation: slideUp 0.3s ease;
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        color: var(--primary);
    }
    
    .modal-content h3 {
        margin-bottom: 20px;
        color: var(--dark);
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--radius);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Termiz Davlat Universiteti - Iqtisodiyot Fakulteti
// 100% ISHLAYDIGAN VERSION

// DOM yuklanganda ishga tushadi
document.addEventListener('DOMContentLoaded', async function() {
    "use strict";    
    // Bu blok faqat about sahifasi uchun
    if (!document.getElementById('history-content')) {
        return;
    }

    // About sahifasi ma'lumotlari endi umumiy appData/siteData dan olinadi
    if (!window.appData) {
        await loadAppData();
    }

    renderAboutFromAppData();
    
    // LOADING SCREENNI YO'QOTISH
    hideLoadingScreen();
    
});

function renderAboutFromAppData() {
    const data = window.appData || {};
    const isEn = normalizeLanguage(appData.language) === 'en';

    const historyEl = document.getElementById('history-content');
    const missionEl = document.getElementById('mission-grid');
    const leadershipEl = document.getElementById('leadership-grid');
    const badgesEl = document.getElementById('badges-grid');
    const statsEl = document.getElementById('sidebar-stats');
    const datesEl = document.getElementById('important-dates');

    if (historyEl) {
        const defaultHistory = isEn
            ? "The Faculty of Economics at Termiz State University has developed steadily since 1992, expanding its programs, strengthening research capacity, and preparing qualified specialists for the modern economy."
            : "Ma'lumot topilmadi.";
        const historyContent = tr(data.tarix?.tarixiyMaqola) || defaultHistory;
        const hasHtml = typeof historyContent === 'string' && /<\w+/.test(historyContent);
        historyEl.innerHTML = hasHtml ? historyContent : `<p>${historyContent}</p>`;
    }

    if (missionEl) {
        const missions = data.mission?.length
            ? data.mission.map(item => ({
                icon: (item.icon || 'fas fa-bullseye').replace('fas ', ''),
                title: tr(item.title) || (isEn ? "Mission" : "Missiya"),
                desc: tr(item.description) || ""
            }))
            : (data.missiya?.asosiyMagoratlar || []).map(text => ({
                icon: 'fa-check-circle',
                title: tr(text),
                desc: ''
            }));

        missionEl.innerHTML = missions.map(item => `
            <div class="mission-item">
                <i class="fas ${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    }

    if (leadershipEl) {
        const leaders = data.rahbariyat || data.leadership || [];
        leadershipEl.innerHTML = leaders.map(leader => {
            const name = leader.ism || leader.name || '';
            const position = leader.lavozim || leader.position || '';
            const degree = leader.mutaxassislik || leader.degree || leader.ilmiyDarajasi || '';
            const phone = leader.telefon || leader.phone || '';
            const email = leader.email || '';
            const reception = leader.qabulVaqti || leader.workHours || leader.reception || '';
            const telegram = leader.telegram || '';
            const initials = (name.split(' ').map(s => s[0]).join('').slice(0, 2) || 'AD').toUpperCase();
            const avatar = leader.rasm || leader.image || '';
            const avatarContent = avatar
                ? `<img src="${avatar}" alt="${name}" onerror="this.replaceWith(document.createTextNode('${initials}'))">`
                : initials;

            const contactRows = [
                reception ? `<li><i class="far fa-clock"></i><strong>${t('reception_hours')}:</strong> <span>${tr(reception)}</span></li>` : '',
                phone ? `<li><i class="fas fa-phone"></i><strong>${t('phone_number')}:</strong> <span>${phone}</span></li>` : '',
                email ? `<li><i class="far fa-envelope"></i><strong>${t('email')}:</strong> <span>${email}</span></li>` : '',
                telegram ? `<li><i class="fab fa-telegram"></i><strong>Telegram:</strong> <span>${telegram}</span></li>` : ''
            ].filter(Boolean).join('');
            return `
                <div class="leader-card">
                    <div class="leader-avatar">${avatarContent}</div>
                    <h3>${name}</h3>
                    <span class="leader-position">${tr(position)}</span>
                    <span class="leader-degree">${tr(degree)}</span>
                    ${contactRows ? `<ul class="leader-contacts">${contactRows}</ul>` : ''}
                </div>
            `;
        }).join('');
    }

    if (badgesEl) {
        const badges = data.badges || [];
        badgesEl.innerHTML = badges.map(badge => `
            <div class="badge-item">
                <i class="${badge.icon || 'fas fa-award'}"></i>
                <span>${tr(badge.title || badge.name || '')}</span>
            </div>
        `).join('');
    }

    if (statsEl) {
        const stats = data.stats?.length
            ? data.stats.map(s => ({ icon: `fa-${s.icon}`, label: s.label, value: s.value }))
            : [
                { icon: 'fa-users', label: 'Talabalar soni', value: data.statistika?.talabalarSoni || 0 },
                { icon: 'fa-chalkboard-user', label: "Professor-o'qituvchilar", value: data.statistika?.professorlarSoni || 0 },
                { icon: 'fa-flask', label: 'Ilmiy loyihalar', value: data.statistika?.ilmiyLoyihalar || 0 },
                { icon: 'fa-globe', label: 'Xalqaro hamkorlar', value: data.statistika?.xalqaroHamkorlar || 0 }
            ];

        statsEl.innerHTML = stats.map(stat => `
            <div class="stat-item">
                <span class="stat-label">
                    <i class="fas ${stat.icon}"></i> ${tr(stat.label)}
                </span>
                <span class="stat-value">${stat.value}</span>
            </div>
        `).join('');
    }

    if (datesEl) {
        const dates = data.tarix?.muhimVoqealar || [];
        datesEl.innerHTML = dates.map(item => `
            <div class="date-item">
                <div class="date-icon">
                    <i class="fas fa-calendar-day"></i>
                </div>
                <div class="date-content">
                    <strong>${item.yil}</strong>
                    <span>${tr(item.voqea)}</span>
                </div>
            </div>
        `).join('');
    }

    autoTranslateElement(document.body);
}

// LOADING SCREENNI YO'QOTISH
function hideLoadingScreen() {
    const loadingEl = document.getElementById('loading-container');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

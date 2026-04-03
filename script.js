/* ─── BCG PATHWAY CARE — plain JS + localStorage ─── */

// ── TRANSLATIONS ──────────────────────────────────────────
const T = {
  th: {
    appSub: "ระบบติดตามการรักษาด้วยยา BCG",
    login: "เข้าสู่ระบบ", register: "สมัครสมาชิก",
    name: "ชื่อ-นามสกุล", hn: "เลขโรงพยาบาล (HN)",
    loginTitle: "เข้าสู่ระบบ",
    loginSub: "กรอกชื่อ-นามสกุล และเลขโรงพยาบาลของท่าน",
    loginBtn: "เข้าสู่ระบบ", registerBtn: "สมัครสมาชิก",
    errNameRequired: "กรุณากรอกชื่อ-นามสกุล",
    errHnRequired: "กรุณากรอกเลขโรงพยาบาล",
    errHnExists: "เลขโรงพยาบาลนี้ถูกลงทะเบียนแล้ว",
    errInvalidCredentials: "ไม่พบข้อมูลผู้ป่วย กรุณาตรวจสอบชื่อ-นามสกุล และเลขโรงพยาบาล",
    navDashboard: "หน้าหลัก", navEducation: "ความรู้ BCG",
    navAppointments: "นัดหมาย", navHistory: "ประวัติอาการ",
    navRecord: "บันทึกอาการ",
    logout: "ออกจากระบบ",
    welcomeBack: "ยินดีต้อนรับ", dashSub: "ภาพรวมการรักษาของท่าน",
    nextAppt: "นัดหมายถัดไป", noAppt: "ยังไม่มีนัดหมาย",
    latestStatus: "สถานะล่าสุด", noSymptom: "ยังไม่มีบันทึก",
    totalAppts: "นัดหมายทั้งหมด", totalSymptoms: "บันทึกอาการทั้งหมด",
    quickActions: "เมนู",
    qaRecord: "บันทึกอาการ", qaAppt: "เพิ่มนัดหมาย",
    qaHistory: "ดูประวัติ", qaEducation: "อ่านข้อมูล BCG",
    alertGreen: "อาการของท่านอยู่ในระดับปกติ ดูแลตัวเองต่อไปนะครับ",
    alertYellow: "อาการของท่านอยู่ในระดับที่ต้องติดตาม โปรดแจ้งแพทย์ในนัดหมายถัดไป",
    alertRed: "อาการของท่านต้องได้รับการดูแลด่วน! โปรดติดต่อโรงพยาบาลทันที",
    educationTitle: "ความรู้เรื่อง BCG", educationSub: "ข้อมูลสำหรับผู้ป่วยที่รับการรักษาด้วยยา BCG Intravesical",
    apptTitle: "นัดหมาย", apptSub: "จัดการวันนัดหมายของท่าน",
    addAppt: "เพิ่มนัดหมาย", editAppt: "แก้ไขนัดหมาย",
    apptDate: "วันที่นัดหมาย", apptNote: "บันทึก (ไม่บังคับ)",
    apptNotePlaceholder: "เช่น แผนกศัลยกรรมระบบทางเดินปัสสาวะ ห้องตรวจพิเศษศัลยกรรม 2",
    save: "บันทึก", cancel: "ยกเลิก", delete: "ลบ",
    confirmDelete: "ยืนยันการลบ?",
    noAppts: "ยังไม่มีนัดหมาย",
    historyTitle: "ประวัติอาการ", historySub: "บันทึกอาการและแนวโน้มของท่าน",
    trendChart: "แนวโน้มคะแนนอาการ",
    noHistory: "ยังไม่มีบันทึกอาการ",
    viewResult: "ดูรายละเอียด",
    formTitle: "บันทึกอาการ", formSub: "เลือกอาการที่ท่านมีในปัจจุบัน",
    formDate: "วันที่", scorePreview: "คะแนนปัจจุบัน",
    submitRecord: "บันทึกอาการ",
    symptomDysuria: "ปัสสาวะแสบ/ขัด/บ่อย",
    symptomHematuria: "ปัสสาวะมีเลือดปนเล็กน้อย",
    symptomLowerPain: "ปวดท้องน้อย",
    symptomFever: "ไข้ ≥ 38°C",
    symptomChills: "หนาวสั่น",
    symptomPersistentSymptoms: "อาการต่อเนื่อง > 48 ชั่วโมง",
    symptomRetention: "ปัสสาวะไม่ออก (ฉุกเฉิน)",
    symptomGrossHematuria: "ปัสสาวะมีเลือดมาก (Gross hematuria)",
    symptomFeverSystemic: "ไข้ > 38.5°C + อาการทั่วกาย",
    symptomDescDysuria: "แสบขัดขณะปัสสาวะ ถ่ายบ่อย",
    symptomDescHematuria: "สังเกตเห็นเลือดในปัสสาวะเล็กน้อย",
    symptomDescLowerPain: "ปวดหรือไม่สบายบริเวณท้องน้อย",
    symptomDescFever: "อุณหภูมิ ≥ 38°C อาการไข้สูง",
    symptomDescChills: "หนาวสั่น รู้สึกเย็น",
    symptomDescGrossHematuria: "เลือดออกปัสสาวะมาก เห็นชัดเจน",
    symptomDescFeverSystemic: "ไข้สูงพร้อมอาการทั่วกาย ปวดเมื่อย",
    symptomDescPersistentSymptoms: "อาการไม่ดีขึ้นเกิน 48 ชั่วโมง",
    symptomDescRetention: "ปัสสาวะไม่ออก ปวดท้องมาก ฉุกเฉิน",
    ctcaeGrade1: "Grade 1 — อาการเล็กน้อย",
    ctcaeGrade2: "Grade 2 — อาการปานกลาง",
    ctcaeGrade3: "Grade 3 — อาการรุนแรง (พบแพทย์ทันที)",
    scoreDescNone: "ไม่มีอาการ ดูแลตัวเองต่อไป",
    scoreDescGreen: "อาการระดับ Grade 1 สามารถดูแลตัวเองที่บ้านได้",
    scoreDescYellow: "อาการระดับ Grade 2 ควรแจ้งแพทย์ในนัดหมายถัดไป",
    scoreDescRed: "อาการระดับ Grade 3 ต้องติดต่อโรงพยาบาลทันที",
    resultTitle: "ผลการประเมินอาการ", resultDate: "วันที่บันทึก",
    resultScore: "คะแนน", resultLevel: "ระดับ",
    resultSymptoms: "อาการที่พบ", noSymptomsSelected: "ไม่มีอาการ",
    resultRecs: "คำแนะนำ",
    recsGreen: [
      "ดื่มน้ำมากๆ อย่างน้อย 2 ลิตรต่อวัน",
      "พักผ่อนให้เพียงพอ",
      "ติดตามอาการอย่างต่อเนื่อง",
      "รักษาตามนัดหมายแพทย์",
    ],
    recsYellow: [
      "แจ้งแพทย์ในนัดหมายถัดไปเกี่ยวกับอาการเหล่านี้",
      "จดบันทึกอาการทุกวัน",
      "ดื่มน้ำมากๆ อย่างน้อย 2 ลิตรต่อวัน",
      "หลีกเลี่ยงการออกกำลังกายหนัก",
      "วัดอุณหภูมิร่างกายทุกวัน",
    ],
    recsRed: [
      "ติดต่อโรงพยาบาลหรือแพทย์ทันที",
      "ไปห้องฉุกเฉินหากอาการรุนแรง",
      "อย่ารอจนถึงนัดหมายถัดไป",
      "แจ้งยาที่รับประทานอยู่แก่แพทย์",
    ],
    levelGreen: "ปกติ", levelYellow: "ต้องติดตาม", levelRed: "พบแพทย์ด่วน",
    disclaimer: "แอปพลิเคชันนี้ไม่สามารถทดแทนการวินิจฉัยของแพทย์ได้ หากท่านมีอาการรุนแรง กรุณาติดต่อโรงพยาบาลทันที",
    back: "← กลับ",
    editBtn: "✏️", deleteBtn: "🗑️",
    patientHn: "เลขโรงพยาบาล",
  },
  en: {
    appSub: "BCG Intravesical Therapy Tracker",
    login: "Sign In", register: "Register",
    name: "Full Name", hn: "Hospital Number (HN)",
    loginTitle: "Sign In",
    loginSub: "Enter your full name and hospital number",
    loginBtn: "Sign In", registerBtn: "Register",
    errNameRequired: "Please enter your full name",
    errHnRequired: "Please enter your hospital number",
    errHnExists: "This hospital number is already registered",
    errInvalidCredentials: "Patient not found. Please check your name and hospital number.",
    navDashboard: "Dashboard", navEducation: "BCG Education",
    navAppointments: "Appointments", navHistory: "Symptom History",
    navRecord: "Record Symptoms",
    logout: "Logout",
    welcomeBack: "Welcome", dashSub: "Your treatment overview",
    nextAppt: "Next Appointment", noAppt: "No upcoming appointments",
    latestStatus: "Latest Status", noSymptom: "No records yet",
    totalAppts: "Total Appointments", totalSymptoms: "Total Records",
    quickActions: "Quick Actions",
    qaRecord: "Record Symptoms", qaAppt: "Add Appointment",
    qaHistory: "View History", qaEducation: "BCG Information",
    alertGreen: "Your symptoms are at a normal level. Keep taking care of yourself!",
    alertYellow: "Your symptoms need monitoring. Please inform your doctor at the next visit.",
    alertRed: "Your symptoms require urgent attention! Please contact the hospital immediately.",
    educationTitle: "BCG Education", educationSub: "Information for patients receiving intravesical BCG therapy",
    apptTitle: "Appointments", apptSub: "Manage your scheduled appointments",
    addAppt: "Add Appointment", editAppt: "Edit Appointment",
    apptDate: "Appointment Date", apptNote: "Note (optional)",
    apptNotePlaceholder: "e.g. Urology Special Clinic, Floor 1",
    save: "Save", cancel: "Cancel", delete: "Delete",
    confirmDelete: "Confirm delete?",
    noAppts: "No appointments yet",
    historyTitle: "Symptom History", historySub: "Your symptom records and trends",
    trendChart: "Symptom Score Trend",
    noHistory: "No symptom records yet",
    viewResult: "View Details",
    formTitle: "Record Symptoms", formSub: "Select your current symptoms",
    formDate: "Date", scorePreview: "Current Score",
    submitRecord: "Save Record",
    symptomDysuria: "Painful/frequent urination",
    symptomHematuria: "Mild blood in urine",
    symptomLowerPain: "Lower abdominal pain",
    symptomFever: "Fever ≥ 38°C",
    symptomChills: "Chills",
    symptomGrossHematuria: "Gross hematuria",
    symptomFeverSystemic: "Fever > 38.5°C + systemic symptoms",
    symptomPersistentSymptoms: "Symptoms persisting > 48 hours",
    symptomRetention: "Urinary retention (Emergency)",
    symptomDescDysuria: "Burning, difficulty or frequent urination",
    symptomDescHematuria: "Slight blood visible in urine",
    symptomDescLowerPain: "Discomfort or pain in lower abdomen",
    symptomDescFever: "Temperature ≥ 38°C",
    symptomDescChills: "Shivering, feeling cold",
    symptomDescGrossHematuria: "Heavy visible blood in urine",
    symptomDescFeverSystemic: "High fever with body aches, malaise",
    symptomDescPersistentSymptoms: "Symptoms not improving after 48h",
    symptomDescRetention: "Cannot urinate, severe pain — emergency",
    resultTitle: "Symptom Assessment", resultDate: "Date recorded",
    resultScore: "Score", resultLevel: "Level",
    resultSymptoms: "Symptoms reported", noSymptomsSelected: "No symptoms",
    resultRecs: "Recommendations",
    recsGreen: [
      "Drink plenty of water — at least 2 litres per day",
      "Rest adequately",
      "Continue monitoring your symptoms",
      "Attend all scheduled appointments",
    ],
    recsYellow: [
      "Inform your doctor about these symptoms at your next visit",
      "Keep a daily symptom log",
      "Drink plenty of water — at least 2 litres per day",
      "Avoid strenuous exercise",
      "Check your temperature daily",
    ],
    recsRed: [
      "Contact the hospital or your doctor immediately",
      "Go to the emergency department if symptoms are severe",
      "Do not wait until your next appointment",
      "Inform the doctor of all medications you are taking",
    ],
    levelGreen: "Normal", levelYellow: "Monitor", levelRed: "See doctor urgently",
    disclaimer: "This application cannot replace medical diagnosis. If you have severe symptoms, please contact your hospital immediately.",
    back: "← Back",
    editBtn: "✏️", deleteBtn: "🗑️",
    patientHn: "Hospital Number",
  },
};

// ── EDUCATION CONTENT ──────────────────────────────────────
const EDU = {
  th: [
    {
      icon: "💊",
      title: "BCG คืออะไร",
      body: `BCG (Bacillus Calmette-Guérin) เป็นเชื้อแบคทีเรียที่ถูกทำให้อ่อนฤทธิ์ ใช้เป็นยากระตุ้นภูมิคุ้มกัน โดยให้เข้าสู่กระเพาะปัสสาวะโดยตรง (intravesical therapy)

<strong>กลไกการออกฤทธิ์</strong>
ยา BCG กระตุ้นระบบภูมิคุ้มกันของร่างกายในบริเวณเยื่อบุกระเพาะปัสสาวะ เพื่อช่วยทำลายเซลล์มะเร็ง ซึ่งแตกต่างจากเคมีบำบัดที่ออกฤทธิ์โดยตรงต่อเซลล์`
    },
    {
      icon: "🎯",
      title: "เหตุผลที่ต้องให้ยา BCG",
      body: `BCG เป็นการรักษามาตรฐานในผู้ป่วย <strong>มะเร็งกระเพาะปัสสาวะระยะไม่ลุกลามเข้าชั้นกล้ามเนื้อ</strong> (Non-muscle-invasive bladder cancer, NMIBC)

<strong>วัตถุประสงค์ของการรักษา</strong>
• ลดโอกาสการกลับเป็นซ้ำของโรค
• ลดความเสี่ยงของการลุกลามของมะเร็ง
• เพิ่มประสิทธิภาพในการควบคุมโรคในระยะยาว
• ใช้โดยเฉพาะในผู้ป่วยกลุ่มความเสี่ยงปานกลางถึงสูง`
    },
    {
      icon: "📅",
      title: "ตารางการรักษา",
      body: `<strong>ระยะเหนี่ยวนำ (Induction)</strong>
ให้ยา BCG สัปดาห์ละครั้ง เป็นเวลา 6 สัปดาห์ติดต่อกัน

<strong>ระยะบำรุงรักษา (Maintenance)</strong>
หลังสิ้นสุดระยะเหนี่ยวนำ แพทย์อาจพิจารณาให้การรักษาต่อเนื่อง (ขึ้นอยู่กับดุลพินิจของแพทย์):
• ทุก 3 เดือน
• ทุก 6 เดือน  
• ทุก 12 เดือน

<strong>สิ่งที่ต้องเตรียมก่อนรับยา</strong>
• งดดื่มน้ำหรือของเหลว 4 ชั่วโมงก่อนรับยา (เพื่อให้ยาเข้มข้นในกระเพาะ)
• แจ้งแพทย์หากมีไข้หรืออาการติดเชื้อทางเดินปัสสาวะ`
    },
    {
      icon: "🏠",
      title: "การปฏิบัติตัวหลังได้รับยา BCG",
      body: `<strong>ระยะหลังใส่ยา (2 ชั่วโมงแรก)</strong>
• กลั้นปัสสาวะเพื่อให้ยาคงอยู่ในกระเพาะปัสสาวะประมาณ 2 ชั่วโมง
• เปลี่ยนท่าทางเป็นระยะๆ เพื่อให้ยาสัมผัสผนังกระเพาะปัสสาวะอย่างทั่วถึง

<strong>การขับถ่าย</strong>
• ปัสสาวะในท่านั่ง เพื่อลดการกระเด็นของปัสสาวะ
• ทำความสะอาดโถส้วมด้วยน้ำยาฆ่าเชื้อ (เช่น น้ำยาฟอกขาว) หลังการใช้งาน
• ล้างมือให้สะอาดทุกครั้งหลังเข้าห้องน้ำ

<strong>การใช้ชีวิตประจำวัน</strong>
• ดื่มน้ำมากขึ้นภายหลังครบระยะเวลากลั้นยา (อย่างน้อย 2 ลิตร/วัน)
• หลีกเลี่ยงการมีเพศสัมพันธ์ภายใน 48 ชั่วโมงหลังได้รับยา
• ใช้ถุงยางอนามัยในช่วงที่อยู่ระหว่างการรักษา`
    },
    {
      icon: "⚠️",
      title: "ผลข้างเคียงที่อาจพบ",
      body: `<strong>อาการที่พบได้บ่อย (มักไม่รุนแรง)</strong>
• ปัสสาวะแสบหรือขัด
• ปัสสาวะบ่อยกว่าปกติ
• ปวดหน่วงบริเวณท้องน้อย
• มีเลือดปนในปัสสาวะเล็กน้อย
• มีไข้ต่ำหรืออาการคล้ายไข้หวัด
อาการเหล่านี้มักเกิดขึ้นชั่วคราว ดีขึ้นภายใน 1–2 วัน

<strong>อาการระดับปานกลาง</strong>
• ไข้สูงมากกว่า 38 องศาเซลเซียส
• อาการระคายเคืองทางระบบทางเดินปัสสาวะที่รุนแรงขึ้น

<strong>อาการรุนแรง (พบได้น้อย — ต้องพบแพทย์ทันที)</strong>
• การติดเชื้อ BCG ที่แพร่กระจายไปทั่วร่างกาย (BCG sepsis)
• การอักเสบของอวัยวะต่างๆ เช่น ปอด ตับ หรืออวัยวะสืบพันธุ์`
    },
    {
      icon: "🚨",
      title: "อาการที่ควรมาพบแพทย์ก่อนนัด",
      body: `<strong>โปรดติดต่อโรงพยาบาลทันทีหากมีอาการดังต่อไปนี้</strong>

• ไข้สูงมากกว่า 38–38.5 องศาเซลเซียส นานเกิน 48–72 ชั่วโมง
• มีอาการคล้ายไข้หวัดที่ไม่ดีขึ้นภายใน 2–3 วัน
• ปัสสาวะแสบ ขัด หรือปวดมากผิดปกติ หรือเป็นนานเกิน 2–3 วัน
• มีเลือดปนในปัสสาวะมาก หรือเป็นก้อนเลือด
• ปัสสาวะไม่ออกเลย
• ปวดท้องรุนแรง หรือปวดหลัง/บั้นเอว
• หนาวสั่น อาการแย่ลงอย่างรวดเร็ว

<strong>โรงพยาบาลมหาราชนครเชียงใหม่</strong>
ห้องตรวจพิเศษศัลยกรรม 2 ชั้น 1 อาคารบุญสมมาร์ติน
โทรศัพท์ 053-935736, 053-935738`
    },
    {
      icon: "❓",
      title: "คำถามที่พบบ่อย",
      body: `<strong>Q: BCG จะแพร่ไปสู่คนอืื่นได้ไหม?</strong>
ยา BCG มีชีวิตและอาจแพร่ผ่านทางปัสสาวะได้ในช่วง 6 ชั่วโมงแรก ควรหลีกเลี่ยงการมีเพศสัมพันธ์ภายใน 48 ชั่วโมง และใช้ถุงยางอนามัยระหว่างการรักษา

<strong>Q: ต้องนอนโรงพยาบาลไหม?</strong>
ส่วนใหญ่เป็นการรักษาแบบผู้ป่วยนอก สามารถกลับบ้านได้เองหลังรับยา

<strong>Q: ต้องหยุดยาอะไรบ้าง?</strong>
ควรปรึกษาแพทย์ก่อนหยุดยาใดๆ โดยเฉพาะยาที่กดภูมิคุ้มกัน ยาต้านการอักเสบ และยาปฏิชีวนะ

<strong>Q: หากลืมมารับยาในนัด ทำอย่างไร?</strong>
ติดต่อทีมแพทย์เพื่อนัดหมายใหม่โดยเร็วที่สุด ไม่ควรให้การรักษาขาดตอน`
    },
    {
      icon: "📚",
      title: "แหล่งอ้างอิงทางวิชาการ",
      body: `การรักษาด้วยยา BCG intravesical เป็นการรักษาที่ได้รับการรับรองโดยองค์กรแพทย์ชั้นนำระดับโลก ดังนี้

<strong>American Urological Association (AUA)</strong>
ก่อตั้งปี ค.ศ. 1902 สหรัฐอเมริกา | สมาชิกมากกว่า 23,000 คนทั่วโลก
AUA Guidelines แนะนำให้ BCG intravesical therapy เป็น standard of care สำหรับผู้ป่วย intermediate และ high-risk NMIBC

<strong>European Association of Urology (EAU)</strong>
ก่อตั้งปี ค.ศ. 1972 ประเทศเนเธอร์แลนด์ | สมาชิกมากกว่า 19,000 คน (ปี 2025)
EAU Guidelines เป็น clinical guidelines ที่ถูกอ้างอิงมากที่สุดในสาขาวิทยาระบบทางเดินปัสสาวะ ครอบคลุมการวินิจฉัยและการรักษาโรคมะเร็งกระเพาะปัสสาวะ

<strong>National Cancer Institute (NCI) — USA</strong>
หน่วยงานรัฐบาลสหรัฐอเมริกา ภายใต้ National Institutes of Health (NIH)
NCI พัฒนาและดูแล Common Terminology Criteria for Adverse Events (CTCAE) ซึ่งเป็นระบบมาตรฐานสากลสำหรับการจำแนกและรายงานผลข้างเคียงจากการรักษามะเร็ง (ระดับ 1–5)

<em>อ้างอิง: AUA Guidelines (auanet.org) | EAU Guidelines (uroweb.org) | NCI CTCAE (ctep.cancer.gov)</em>`
    },
  ],
  en: [
    {
      icon: "💊",
      title: "What is BCG?",
      body: `BCG (Bacillus Calmette-Guérin) is a weakened bacterium used as an immunotherapy agent, administered directly into the bladder (intravesical therapy).

<strong>Mechanism of action</strong>
BCG stimulates the immune system in the bladder lining to destroy cancer cells — different from chemotherapy which acts directly on cells.`
    },
    {
      icon: "🎯",
      title: "Why BCG therapy?",
      body: `BCG is the standard treatment for <strong>non-muscle-invasive bladder cancer (NMIBC)</strong>, particularly for intermediate and high-risk patients.

<strong>Treatment goals</strong>
• Reduce recurrence risk
• Reduce progression risk
• Improve long-term disease control`
    },
    {
      icon: "📅",
      title: "Treatment Schedule",
      body: `<strong>Induction phase</strong>
BCG is given once weekly for 6 consecutive weeks.

<strong>Maintenance phase</strong>
After induction, maintenance may be given every 3, 6, or 12 months depending on your doctor's assessment.

<strong>Before treatment</strong>
• Avoid fluids for 4 hours before treatment
• Inform your doctor if you have fever or urinary infection`
    },
    {
      icon: "🏠",
      title: "Home Care After BCG",
      body: `<strong>First 2 hours after treatment</strong>
• Retain urine for 2 hours to keep BCG in contact with bladder wall
• Change positions periodically to ensure full bladder wall contact

<strong>Elimination</strong>
• Urinate in a seated position to reduce splashing
• Disinfect the toilet bowl with bleach after use
• Wash hands thoroughly after each bathroom visit

<strong>Daily life</strong>
• Drink at least 2 litres of water per day
• Avoid sexual contact for 48 hours after treatment
• Use condoms throughout the treatment course`
    },
    {
      icon: "⚠️",
      title: "Common Side Effects",
      body: `<strong>Mild (common — usually resolve in 1–2 days)</strong>
• Painful or difficult urination
• Urinary frequency
• Lower abdominal discomfort
• Mild blood in urine
• Low-grade fever or flu-like symptoms

<strong>Moderate</strong>
• Fever above 38°C
• Increasing urinary irritation

<strong>Severe (rare — seek immediate care)</strong>
• Systemic BCG infection (BCG sepsis)
• Inflammation of organs (lung, liver, reproductive organs)`
    },
    {
      icon: "🚨",
      title: "When to See Your Doctor Urgently",
      body: `<strong>Contact the hospital immediately if you experience</strong>

• Fever above 38–38.5°C lasting more than 48–72 hours
• Flu-like symptoms that do not improve within 2–3 days
• Severe or prolonged urinary pain or difficulty
• Significant blood in urine or blood clots
• Inability to urinate
• Severe abdominal or back pain
• Chills or rapidly worsening symptoms`
    },
    {
      icon: "❓",
      title: "Frequently Asked Questions",
      body: `<strong>Can BCG spread to others?</strong>
BCG is live and may be present in urine for the first 6 hours. Avoid sexual contact for 48 hours and use condoms throughout treatment.

<strong>Do I need to be hospitalized?</strong>
No — BCG therapy is generally outpatient. You can return home after treatment.

<strong>Should I stop any medications?</strong>
Consult your doctor before stopping any medication, especially immunosuppressants, anti-inflammatories, or antibiotics.

<strong>What if I miss an appointment?</strong>
Contact the medical team as soon as possible to reschedule. Interrupting therapy may reduce its effectiveness.`
    },
    {
      icon: "📚",
      title: "Academic References",
      body: `BCG intravesical therapy is endorsed by the world's leading urology organizations:

<strong>American Urological Association (AUA)</strong>
Founded 1902 | 23,000+ members worldwide
AUA Guidelines recommend BCG intravesical therapy as the standard of care for intermediate and high-risk NMIBC.

<strong>European Association of Urology (EAU)</strong>
Founded 1972 | 19,000+ members (2025)
EAU Guidelines are the most widely read in urology, covering bladder cancer diagnosis and treatment.

<strong>National Cancer Institute (NCI) — USA</strong>
Part of the U.S. National Institutes of Health (NIH)
Maintains the CTCAE (Common Terminology Criteria for Adverse Events), the international standard for grading cancer treatment side effects (Grades 1–5).

<em>References: AUA Guidelines (auanet.org) | EAU Guidelines (uroweb.org) | NCI CTCAE (ctep.cancer.gov)</em>`
    },
  ],
};

// ── STATE ─────────────────────────────────────────────────
let lang = localStorage.getItem("bcg_lang") || "th";
let currentUser = null;
let currentPage = "dashboard";
let editingApptId = null;
let viewingResultId = null;
let symptomToggles = { dysuria: false, hematuria: false, chills: false, fever: false, retention: false, lowerPain: false, grossHematuria: false, feverSystemic: false, persistentSymptoms: false };
let chart = null;

// ── STORAGE HELPERS ───────────────────────────────────────
const USERS_KEY = "bcg_users";
const SESSIONS_KEY = "bcg_session";

function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getSession() { return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "null"); }
function saveSession(u) { localStorage.setItem(SESSIONS_KEY, JSON.stringify(u)); }
function clearSession() { localStorage.removeItem(SESSIONS_KEY); }

function getAppts() {
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem("bcg_appts_" + currentUser.id) || "[]");
}
function saveAppts(a) {
  if (!currentUser) return;
  localStorage.setItem("bcg_appts_" + currentUser.id, JSON.stringify(a));
}
function getSymptoms() {
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem("bcg_symptoms_" + currentUser.id) || "[]");
}
function saveSymptoms(s) {
  if (!currentUser) return;
  localStorage.setItem("bcg_symptoms_" + currentUser.id, JSON.stringify(s));
}
function newId() { return Date.now() + "_" + Math.random().toString(36).slice(2, 7); }

// ── SCORING ───────────────────────────────────────────────
function calcScore(d) {
  if (d.retention || d.grossHematuria || d.feverSystemic || d.persistentSymptoms) {
    let s = 3 + (d.retention ? 1 : 0) + (d.grossHematuria ? 1 : 0)
              + (d.feverSystemic ? 1 : 0) + (d.persistentSymptoms ? 1 : 0)
              + (d.dysuria ? 1 : 0) + (d.hematuria ? 1 : 0) + (d.lowerPain ? 1 : 0)
              + (d.fever ? 2 : 0) + (d.chills ? 2 : 0);
    return { score: Math.min(s, 12), level: "red" };
  }
  let s = (d.dysuria ? 1 : 0) + (d.hematuria ? 1 : 0) + (d.lowerPain ? 1 : 0)
        + (d.fever ? 2 : 0) + (d.chills ? 2 : 0);
  return { score: s, level: s <= 2 ? "green" : s <= 5 ? "yellow" : "red" };
}

function t(key) { return T[lang][key] || key; }

function today() { return new Date().toISOString().split("T")[0]; }
function fmtDate(d) {
  if (!d) return "";
  const dt = new Date(d + "T00:00:00");
  if (lang === "th") {
    const thMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
    return `${dt.getDate()} ${thMonths[dt.getMonth()]} ${dt.getFullYear() + 543}`;
  }
  const enMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${dt.getDate()} ${enMonths[dt.getMonth()]} ${dt.getFullYear()}`;
}

const $ = id => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

function levelBadge(level) {
  const cls = { green: "badge-green", yellow: "badge-yellow", red: "badge-red" }[level] || "badge-green";
  const lbl = t("level" + level.charAt(0).toUpperCase() + level.slice(1));
  return `<span class="badge ${cls}">${lbl}</span>`;
}

// ══════════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════════
function showAuth() {
  $("auth-section").style.display = "";
  $("app-shell").style.display = "none";
}
function showApp() {
  $("auth-section").style.display = "none";
  $("app-shell").style.display = "flex";
  // Show user block in header
  const userBlock = $("header-user-block");
  if (userBlock) userBlock.style.display = "";
  const userEl = $("user-name-display");
  if (userEl && currentUser) userEl.textContent = currentUser.name;
  const avatarEl = $("header-user-avatar");
  if (avatarEl && currentUser) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
  renderNav();
  navigateTo("dashboard");
}

function handleLogin(e) {
  e.preventDefault();
  const name = $("login-name").value.trim();
  const hn = $("login-hn").value.trim();
  const errEl = $("login-error");
  errEl.classList.remove("show");

  if (!name) { errEl.textContent = t("errNameRequired"); errEl.classList.add("show"); return; }
  if (!hn)   { errEl.textContent = t("errHnRequired");   errEl.classList.add("show"); return; }

  const users = getUsers();
  const user = users.find(u => u.name.trim().toLowerCase() === name.toLowerCase() && u.hn === hn);
  if (!user) { errEl.textContent = t("errInvalidCredentials"); errEl.classList.add("show"); return; }

  currentUser = user;
  saveSession(user);
  showApp();
}

function handleRegister(e) {
  e.preventDefault();
  const name = $("reg-name").value.trim();
  const hn   = $("reg-hn").value.trim();
  const errEl = $("reg-error");
  errEl.classList.remove("show");

  if (!name) { errEl.textContent = t("errNameRequired"); errEl.classList.add("show"); return; }
  if (!hn)   { errEl.textContent = t("errHnRequired");   errEl.classList.add("show"); return; }

  const users = getUsers();
  if (users.find(u => u.hn === hn)) { errEl.textContent = t("errHnExists"); errEl.classList.add("show"); return; }

  const user = { id: newId(), name, hn, createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  currentUser = user;
  saveSession(user);
  showApp();
}

function handleLogout() {
  currentUser = null;
  clearSession();
  symptomToggles = { dysuria: false, hematuria: false, chills: false, fever: false, retention: false, lowerPain: false, grossHematuria: false, feverSystemic: false, persistentSymptoms: false };
  showAuth();
  updateAllText();
}

// ══════════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════════
function navigateTo(page, param) {
  currentPage = page;
  if (param !== undefined) viewingResultId = param;

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const pageEl = $(page + "-page");
  if (pageEl) pageEl.classList.add("active");

  $("sidebar").classList.remove("open");
  $("sidebar-overlay").classList.remove("open");

  renderNav();

  if (page === "dashboard") renderDashboard();
  else if (page === "education") renderEducation();
  else if (page === "appointments") renderAppointments();
  else if (page === "history") renderHistory();
  else if (page === "form") renderForm();
  else if (page === "result") renderResult();
}

function renderNav() {
  const navPages = ["dashboard","education","appointments","history"];
  const navIcons = { dashboard: "🏠", education: "📚", appointments: "📅", history: "📊" };
  const label = p => t("nav" + p.charAt(0).toUpperCase() + p.slice(1));

  // Desktop horizontal nav
  const desktopNav = $("desktop-nav");
  if (desktopNav) {
    desktopNav.innerHTML = navPages.map(p =>
      `<button class="nav-link${currentPage === p ? " active" : ""}" onclick="navigateTo('${p}')">
        <span class="nav-icon">${navIcons[p]}</span>${label(p)}
      </button>`
    ).join("");
  }

  // Mobile drawer nav
  const sidebarNav = $("sidebar-nav");
  if (sidebarNav) {
    sidebarNav.innerHTML = navPages.map(p =>
      `<button class="nav-item${currentPage === p ? " active" : ""}" onclick="navigateTo('${p}')">
        <span class="nav-icon">${navIcons[p]}</span>${label(p)}
      </button>`
    ).join("") +
    `<div class="mobile-nav-bottom">
      <button class="nav-record-btn" onclick="resetForm();navigateTo('form')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        ${t("navRecord")}
      </button>
    </div>`;
  }
}

// ══════════════════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════════════════
function renderDashboard() {
  const appts = getAppts().sort((a,b) => a.date.localeCompare(b.date));
  const symptoms = getSymptoms().sort((a,b) => a.date.localeCompare(b.date));
  const tod = today();
  const nextAppt = appts.find(a => a.date >= tod) || null;
  const latest = symptoms.length ? symptoms[symptoms.length - 1] : null;

  let alertHtml = "";
  if (latest) {
    const alertCfg = {
      green:  { cls: "alert-green",  icon: "✅", msg: t("alertGreen") },
      yellow: { cls: "alert-yellow", icon: "⚠️", msg: t("alertYellow") },
      red:    { cls: "alert-red",    icon: "🚨", msg: t("alertRed") },
    };
    const cfg = alertCfg[latest.level];
    alertHtml = `<div class="alert-banner ${cfg.cls}"><span class="alert-icon">${cfg.icon}</span><span>${cfg.msg}</span></div>`;
  }

  const firstName = currentUser.name.split(" ")[0];

  $("dashboard-page").innerHTML = `
    <div class="page-header">
      <h1>${t("welcomeBack")}, <span class="text-primary">${firstName}</span></h1>
      <p>${t("dashSub")}</p>
    </div>
    ${alertHtml}
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">${t("nextAppt")}</div>
        <div class="stat-value-text">${nextAppt ? fmtDate(nextAppt.date) : `<span class="stat-empty">${t("noAppt")}</span>`}</div>
        ${nextAppt?.note ? `<div class="stat-note">${nextAppt.note}</div>` : ""}
      </div>
      <div class="stat-card">
        <div class="stat-label">${t("latestStatus")}</div>
        <div class="stat-badge-wrap">${latest ? levelBadge(latest.level) : `<span class="stat-empty">${t("noSymptom")}</span>`}</div>
        ${latest ? `<div class="stat-note">${fmtDate(latest.date)}</div>` : ""}
      </div>
      <div class="stat-card stat-card-num">
        <div class="stat-label">${t("totalAppts")}</div>
        <div class="stat-num">${appts.length}</div>
      </div>
      <div class="stat-card stat-card-num">
        <div class="stat-label">${t("totalSymptoms")}</div>
        <div class="stat-num">${symptoms.length}</div>
      </div>
    </div>
    <div class="section-label">${t("quickActions")}</div>
    <div class="quick-grid">
      <button class="quick-card" onclick="resetForm();navigateTo('form')">
        <span class="quick-icon">📝</span>
        <span class="quick-label">${t("qaRecord")}</span>
      </button>
      <button class="quick-card" onclick="openApptModal()">
        <span class="quick-icon">📅</span>
        <span class="quick-label">${t("qaAppt")}</span>
      </button>
      <button class="quick-card" onclick="navigateTo('history')">
        <span class="quick-icon">📊</span>
        <span class="quick-label">${t("qaHistory")}</span>
      </button>
      <button class="quick-card" onclick="navigateTo('education')">
        <span class="quick-icon">📚</span>
        <span class="quick-label">${t("qaEducation")}</span>
      </button>
    </div>
    <div class="hospital-info-card">
      <div class="hospital-info-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        ห้องตรวจพิเศษศัลยกรรม 2
      </div>
      <div class="hospital-info-body">
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          แผนกศัลยกรรมระบบทางเดินปัสสาวะ ชั้น 1 อาคารบุญสมมาร์ติน
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          โรงพยาบาลมหาราชนครเชียงใหม่
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.39 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          053-935736, 053-935738
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ทุกวันพุธและพฤหัสบดี 08.00–16.00 น.
        </div>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
//  EDUCATION
// ══════════════════════════════════════════════════════════
function renderEducation() {
  const items = EDU[lang];
  $("education-page").innerHTML = `
    <div class="page-header">
      <h1>${t("educationTitle")}</h1>
      <p>${t("educationSub")}</p>
    </div>
    <div class="hospital-info-card" style="margin-bottom:20px">
      <div class="hospital-info-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        ข้อมูลคลินิก
      </div>
      <div class="hospital-info-body">
        <div class="hospital-info-row"><strong>ห้องตรวจพิเศษศัลยกรรม 2</strong></div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          แผนกศัลยกรรมระบบทางเดินปัสสาวะ ชั้น 1 อาคารบุญสมมาร์ติน
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          โรงพยาบาลมหาราชนครเชียงใหม่
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.39 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          053-935736, 053-935738
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          บริการทุกวันพุธและพฤหัสบดี 08.00–16.00 น.
        </div>
        <div class="hospital-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/><path d="M2 6.5A10 10 0 0 1 12 2"/></svg>
          บริการตรวจรักษาเกี่ยวกับโรคศัลยกรรมระบบทางเดินปัสสาวะ
        </div>
      </div>
    </div>
    ${items.map((item, i) => `
      <div class="accordion-item" id="acc-${i}">
        <div class="accordion-header" onclick="toggleAccordion(${i})">
          <span class="accordion-title"><span class="accordion-icon">${item.icon}</span>${item.title}</span>
          <svg class="accordion-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion-body" id="acc-body-${i}">
          <div class="accordion-body-inner">${item.body.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
    `).join("")}
  `;
}

function toggleAccordion(i) {
  const item = $("acc-" + i);
  item.classList.toggle("open");
}

// ══════════════════════════════════════════════════════════
//  APPOINTMENTS
// ══════════════════════════════════════════════════════════
function renderAppointments() {
  const appts = getAppts().sort((a,b) => a.date.localeCompare(b.date));
  const tod = today();
  $("appointments-page").innerHTML = `
    <div class="page-header-row">
      <div>
        <h1>${t("apptTitle")}</h1>
        <p>${t("apptSub")}</p>
      </div>
      <button class="btn btn-primary btn-auto" onclick="openApptModal()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        ${t("addAppt")}
      </button>
    </div>
    <div id="appt-list">
      ${appts.length === 0
        ? `<div class="empty-state"><div class="empty-icon">📅</div><div class="empty-title">${t("noAppts")}</div></div>`
        : appts.map(a => {
            const isPast = a.date < tod;
            return `
            <div class="list-card${isPast ? " list-card-past" : ""}">
              <div class="list-card-left">
                <div class="list-date-badge${isPast ? " past" : ""}">${fmtDate(a.date)}</div>
                ${a.note ? `<div class="list-note">${a.note}</div>` : ""}
              </div>
              <div class="list-actions">
                <button class="icon-btn" onclick="openApptModal('${a.id}')" title="${t("editBtn")}">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="icon-btn icon-btn-danger" onclick="deleteAppt('${a.id}')" title="${t("deleteBtn")}">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>`;
          }).join("")}
    </div>
  `;
}

function openApptModal(id) {
  editingApptId = id || null;
  let appt = null;
  if (id) appt = getAppts().find(a => a.id === id);
  $("appt-modal-title").textContent = id ? t("editAppt") : t("addAppt");
  $("appt-date-input").value = appt ? appt.date : today();
  $("appt-note-input").value = appt ? (appt.note || "") : "";
  $("appt-error").classList.remove("show");
  $("appt-modal").classList.add("open");
}
function closeApptModal() { $("appt-modal").classList.remove("open"); editingApptId = null; }
function saveApptModal() {
  const date = $("appt-date-input").value;
  const note = $("appt-note-input").value.trim();
  if (!date) { $("appt-error").textContent = t("apptDate"); $("appt-error").classList.add("show"); return; }
  const appts = getAppts();
  if (editingApptId) {
    const idx = appts.findIndex(a => a.id === editingApptId);
    if (idx !== -1) { appts[idx].date = date; appts[idx].note = note; }
  } else {
    appts.push({ id: newId(), date, note, createdAt: new Date().toISOString() });
  }
  saveAppts(appts);
  closeApptModal();
  renderAppointments();
  if (currentPage === "dashboard") renderDashboard();
}
function deleteAppt(id) {
  if (!confirm(t("confirmDelete"))) return;
  saveAppts(getAppts().filter(a => a.id !== id));
  renderAppointments();
  if (currentPage === "dashboard") renderDashboard();
}

// ══════════════════════════════════════════════════════════
//  SYMPTOM HISTORY
// ══════════════════════════════════════════════════════════
function renderHistory() {
  const symptoms = getSymptoms().sort((a,b) => b.date.localeCompare(a.date));
  $("history-page").innerHTML = `
    <div class="page-header">
      <h1>${t("historyTitle")}</h1>
      <p>${t("historySub")}</p>
    </div>
    ${symptoms.length > 1 ? `
      <div class="chart-card">
        <div class="chart-title">${t("trendChart")}</div>
        <canvas id="trend-chart"></canvas>
      </div>
    ` : ""}
    ${symptoms.length === 0
      ? `<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-title">${t("noHistory")}</div></div>`
      : symptoms.map(s => `
        <div class="list-card">
          <div class="list-card-left">
            <div class="list-date-badge">${fmtDate(s.date)}</div>
            <div class="list-meta">
              ${levelBadge(s.level)}
              <span class="list-score">${t("resultScore")}: <strong>${s.score}</strong></span>
            </div>
          </div>
          <div class="list-actions">
            <button class="btn btn-sm btn-outline" onclick="navigateTo('result','${s.id}')">${t("viewResult")}</button>
            <button class="icon-btn icon-btn-danger" onclick="deleteSymptom('${s.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
      `).join("")}
  `;
  if (symptoms.length > 1) renderChart(symptoms);
}

function renderChart(symptoms) {
  const sorted = [...symptoms].sort((a,b) => a.date.localeCompare(b.date));
  const labels = sorted.map(s => fmtDate(s.date));
  const data = sorted.map(s => s.score);
  const colors = sorted.map(s => ({ green: "#16a34a", yellow: "#d97706", red: "#dc2626" }[s.level]));
  const ctx = $("trend-chart");
  if (!ctx) return;
  if (chart) { chart.destroy(); chart = null; }
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: t("trendChart"),
        data,
        borderColor: "#0d9488",
        backgroundColor: "rgba(13,148,136,0.06)",
        pointBackgroundColor: colors,
        pointRadius: 6, pointHoverRadius: 8,
        tension: 0.3, fill: true,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 8, ticks: { stepSize: 1 }, grid: { color: "#e2e8f0" } },
        x: { grid: { display: false } },
      },
    },
  });
}

function deleteSymptom(id) {
  if (!confirm(t("confirmDelete"))) return;
  saveSymptoms(getSymptoms().filter(s => s.id !== id));
  renderHistory();
  if (currentPage === "dashboard") renderDashboard();
}

// ══════════════════════════════════════════════════════════
//  SYMPTOM FORM
// ══════════════════════════════════════════════════════════
const SYMPTOM_KEYS = ["dysuria","hematuria","lowerPain","chills","fever","grossHematuria","feverSystemic","persistentSymptoms","retention"];

const SYMPTOM_CTCAE = {
  dysuria:          { grade: 1, gradeLbl: "Grade 1", gradeColor: "grade-1" },
  hematuria:        { grade: 1, gradeLbl: "Grade 1", gradeColor: "grade-1" },
  lowerPain:        { grade: 1, gradeLbl: "Grade 1", gradeColor: "grade-1" },
  chills:           { grade: 2, gradeLbl: "Grade 2", gradeColor: "grade-2" },
  fever:            { grade: 2, gradeLbl: "Grade 2", gradeColor: "grade-2" },
  grossHematuria:   { grade: 3, gradeLbl: "Grade 3", gradeColor: "grade-3" },
  feverSystemic:    { grade: 3, gradeLbl: "Grade 3", gradeColor: "grade-3" },
  persistentSymptoms:{ grade: 3, gradeLbl: "Grade 3", gradeColor: "grade-3" },
  retention:        { grade: 3, gradeLbl: "Grade 3", gradeColor: "grade-3" },
};

function resetForm() {
  symptomToggles = { dysuria: false, hematuria: false, chills: false, fever: false, retention: false, lowerPain: false, grossHematuria: false, feverSystemic: false, persistentSymptoms: false };
}

function renderForm() {
  $("form-page").innerHTML = `
    <div class="page-header">
      <h1>${t("formTitle")}</h1>
      <p>${t("formSub")}</p>
    </div>
    <div class="field">
      <label>${t("formDate")}</label>
      <input type="date" id="symptom-date" value="${today()}" max="${today()}">
    </div>
    <div class="ctcae-legend">
      <span class="ctcae-legend-item"><span class="ctcae-dot grade-1"></span>${lang === "th" ? "Grade 1 — อาการเล็กน้อย" : "Grade 1 — Mild"}</span>
      <span class="ctcae-legend-item"><span class="ctcae-dot grade-2"></span>${lang === "th" ? "Grade 2 — ปานกลาง" : "Grade 2 — Moderate"}</span>
      <span class="ctcae-legend-item"><span class="ctcae-dot grade-3"></span>${lang === "th" ? "Grade 3 — รุนแรง" : "Grade 3 — Severe"}</span>
    </div>
    <div class="symptom-list" id="symptom-grid"></div>
    <div id="score-preview"></div>
    <button class="btn btn-primary btn-submit-symptom" onclick="submitSymptoms()">${t("submitRecord")}</button>
  `;
  renderSymptomGrid();
  renderScorePreview();
}

function renderSymptomGrid() {
  const grid = $("symptom-grid");
  if (!grid) return;
  grid.innerHTML = SYMPTOM_KEYS.map(k => {
    const selected = symptomToggles[k];
    const ctcae = SYMPTOM_CTCAE[k];
    const isGrade3 = ctcae.grade === 3;
    const baseCls = isGrade3 ? "symptom-row grade3-symptom" : "symptom-row";
    const selCls = selected ? (isGrade3 ? " selected-red" : " selected") : "";
    return `<button class="${baseCls}${selCls}" onclick="toggleSymptom('${k}')">
      <span class="symptom-row-icon">${symptomIcon(k)}</span>
      <span class="symptom-row-info">
        <span class="symptom-row-name">${t("symptom" + k.charAt(0).toUpperCase() + k.slice(1))}</span>
        <span class="symptom-row-sub">${t("symptomDesc" + k.charAt(0).toUpperCase() + k.slice(1))}</span>
      </span>
      <span class="ctcae-badge ${ctcae.gradeColor}">${ctcae.gradeLbl}</span>
      <span class="symptom-check ${selected ? "checked" : ""}">
        ${selected ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
      </span>
    </button>`;
  }).join("");
}

function symptomIcon(k) {
  return {
    dysuria: "🔥", hematuria: "🩸", chills: "🥶", fever: "🌡️",
    retention: "🚨", lowerPain: "😣", grossHematuria: "🩸", feverSystemic: "☣️", persistentSymptoms: "⚠️"
  }[k] || "❓";
}

function toggleSymptom(k) {
  symptomToggles[k] = !symptomToggles[k];
  renderSymptomGrid();
  renderScorePreview();
}

function renderScorePreview() {
  const preview = $("score-preview");
  if (!preview) return;
  const { score, level } = calcScore(symptomToggles);
  const cls = { green: "score-preview-green", yellow: "score-preview-yellow", red: "score-preview-red" }[level];
  const descMap = {
    green:  lang === "th" ? "อาการอยู่ในเกณฑ์ปกติ สามารถดูแลตัวเองได้ที่บ้าน" : "Mild symptoms — self-care at home",
    yellow: lang === "th" ? "อาการปานกลาง ควรติดตามอาการอย่างใกล้ชิด" : "Moderate symptoms — monitor closely",
    red:    lang === "th" ? "อาการรุนแรง กรุณาติดต่อทีมแพทย์โดยด่วน" : "Severe symptoms — contact medical team immediately",
  };
  const clinicInfo = level === "red"
    ? `<div class="score-clinic-alert"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13"/><path d="M1.61 4.39 2 3.6h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7 10"/><line x1="1" y1="1" x2="23" y2="23"/></svg> ${lang === "th" ? "053-935736, 053-935738" : "053-935736, 053-935738"}</div>`
    : "";
  preview.innerHTML = `
    <div class="score-preview ${cls}">
      <div class="score-circle result-${level}">${score}</div>
      <div class="score-preview-text">
        <div class="score-label">${t("scorePreview")}</div>
        ${levelBadge(level)}
        <div class="score-desc">${descMap[level]}</div>
        ${clinicInfo}
      </div>
    </div>
  `;
}

function submitSymptoms() {
  const date = $("symptom-date").value;
  if (!date) return;
  const { score, level } = calcScore(symptomToggles);
  const record = { id: newId(), date, ...symptomToggles, score, level, createdAt: new Date().toISOString() };
  const symptoms = getSymptoms();
  symptoms.push(record);
  saveSymptoms(symptoms);
  viewingResultId = record.id;
  navigateTo("result");
}

// ══════════════════════════════════════════════════════════
//  RESULT
// ══════════════════════════════════════════════════════════
function renderResult() {
  const record = getSymptoms().find(s => s.id === viewingResultId);
  if (!record) { navigateTo("history"); return; }
  const { level, score } = record;
  const recs = t("recs" + level.charAt(0).toUpperCase() + level.slice(1));
  const selectedSymptoms = SYMPTOM_KEYS.filter(k => record[k]);

  $("result-page").innerHTML = `
    <button class="btn-back" onclick="navigateTo('history')">${t("back")}</button>
    <div class="result-header-card">
      <div class="result-score-circle result-${level}">${score}</div>
      <h2>${t("resultTitle")}</h2>
      <div class="result-meta">${levelBadge(level)}<span class="result-date">${fmtDate(record.date)}</span></div>
    </div>
    <div class="info-card">
      <div class="info-card-title">${t("resultSymptoms")}</div>
      <div class="symptom-tags">
        ${selectedSymptoms.length === 0
          ? `<span class="tag-empty">${t("noSymptomsSelected")}</span>`
          : selectedSymptoms.map(k => `<span class="tag">${symptomIcon(k)} ${t("symptom" + k.charAt(0).toUpperCase() + k.slice(1))}</span>`).join("")}
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-title">${t("resultRecs")}</div>
      <ul class="rec-list">
        ${recs.map(r => `<li class="rec-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;color:var(--primary)"><polyline points="20 6 9 17 4 12"/></svg>
          ${r}
        </li>`).join("")}
      </ul>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
//  LANGUAGE
// ══════════════════════════════════════════════════════════
function setLang(l) {
  lang = l;
  localStorage.setItem("bcg_lang", l);
  updateAllText();
}

function updateAllText() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const loginTab = $("tab-login");
  const regTab = $("tab-register");
  if (loginTab) loginTab.textContent = t("login");
  if (regTab) regTab.textContent = t("register");

  const loginTitle = $("login-title");
  if (loginTitle) loginTitle.textContent = t("loginTitle");
  const loginSub = $("login-sub");
  if (loginSub) loginSub.textContent = t("loginSub");

  const authSub = $("auth-subtitle");
  if (authSub) authSub.textContent = t("appSub");

  document.querySelectorAll("[data-tkey]").forEach(el => {
    el.textContent = t(el.dataset.tkey);
  });

  const dis = $("footer-disclaimer");
  if (dis) dis.textContent = t("disclaimer");
  const appDis = $("app-footer-disclaimer");
  if (appDis) appDis.textContent = t("disclaimer");

  if (!currentUser) return;

  renderNav();
  if (currentPage === "dashboard") renderDashboard();
  else if (currentPage === "education") renderEducation();
  else if (currentPage === "appointments") renderAppointments();
  else if (currentPage === "history") renderHistory();
  else if (currentPage === "form") renderForm();
  else if (currentPage === "result") renderResult();
}

// ══════════════════════════════════════════════════════════
//  MOBILE NAV
// ══════════════════════════════════════════════════════════
function toggleMobileNav() {
  $("sidebar").classList.toggle("open");
  $("sidebar-overlay").classList.toggle("open");
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
    if (btn.dataset.lang === lang) btn.classList.add("active");
  });

  $("login-form").addEventListener("submit", handleLogin);
  $("register-form").addEventListener("submit", handleRegister);

  $("tab-login").addEventListener("click", () => {
    $("tab-login").classList.add("active");
    $("tab-register").classList.remove("active");
    $("login-panel").style.display = "";
    $("register-panel").style.display = "none";
    $("login-title").textContent = t("loginTitle");
    $("login-sub").textContent = t("loginSub");
  });
  $("tab-register").addEventListener("click", () => {
    $("tab-register").classList.add("active");
    $("tab-login").classList.remove("active");
    $("register-panel").style.display = "";
    $("login-panel").style.display = "none";
    $("login-title").textContent = t("register");
    $("login-sub").textContent = lang === "th" ? "กรอกชื่อ-นามสกุล และเลขโรงพยาบาลเพื่อสมัครสมาชิก" : "Enter your name and hospital number to register";
  });

  $("logout-btn").addEventListener("click", handleLogout);
  $("hamburger").addEventListener("click", toggleMobileNav);
  $("sidebar-overlay").addEventListener("click", toggleMobileNav);

  $("appt-save-btn").addEventListener("click", saveApptModal);
  $("appt-cancel-btn").addEventListener("click", closeApptModal);
  $("appt-modal").addEventListener("click", e => { if (e.target === $("appt-modal")) closeApptModal(); });

  updateAllText();

  const session = getSession();
  if (session) {
    const user = getUsers().find(u => u.id === session.id);
    if (user) { currentUser = user; showApp(); return; }
  }
  showAuth();
});

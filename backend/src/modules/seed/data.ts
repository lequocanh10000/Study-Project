export const documents = [
  { link: "https://example.com/teacher-guide.pdf", type: "Teacher" },
  { link: "https://example.com/student-handbook.pdf", type: "Student" },
  { link: "https://example.com/test-math.pdf", type: "Test" },
  { link: "https://example.com/test-physics.pdf", type: "Test" },
];

export const courses = [
  { name: "Mathematics", numberSessions: 30 },
  { name: "Physics", numberSessions: 25 },
  { name: "Literature", numberSessions: 20 },
];

export const classes = [
  { courseId: 1, maxNumber: 25, openingDate: "2025-09-01", learningForm: "Offline", learningDays: ['T2', 'T3'], classRoom: "A101", isOpened: true },
  { courseId: 2, maxNumber: 20, openingDate: "2025-09-05", learningForm: "Online", learningDays: ['T2', 'T4'], classRoom: "Virtual01", isOpened: true },
  { courseId: 3, maxNumber: 30, openingDate: "2025-09-10", learningForm: "Offline", learningDays: ['T3', 'T4'], classRoom: "B202", isOpened: true },
  { courseId: 1, maxNumber: 18, openingDate: "2025-09-15", learningForm: "Online", learningDays: ['T3', 'T5'], classRoom: "Virtual02", isOpened: true },
  { courseId: 2, maxNumber: 22, openingDate: "2025-09-20", learningForm: "Offline", learningDays: ['T2', 'T6'], classRoom: "C303", isOpened: true },
  { courseId: 3, maxNumber: 25, openingDate: "2025-09-25", learningForm: "Online", learningDays: ['T3', 'T6'], classRoom: "Virtual03", isOpened: true },
  { courseId: 1, maxNumber: 20, openingDate: "2025-10-01", learningForm: "Offline", learningDays: ['T5', 'T7'], classRoom: "D404", isOpened: false },
  { courseId: 2, maxNumber: 15, openingDate: "2025-10-05", learningForm: "Online", learningDays: ['T4', 'T6'],classRoom: "Virtual04", isOpened: true },
  { courseId: 3, maxNumber: 28, openingDate: "2025-10-10", learningForm: "Offline", learningDays: ['T2', 'T5'], classRoom: "E505", isOpened: true },
  { courseId: 1, maxNumber: 24, openingDate: "2025-10-15", learningForm: "Online", learningDays: ['T4', 'T7'], classRoom: "Virtual05", isOpened: false },
];

export const document_classes = [
  { documentId: 1, classId: 1 },
  { documentId: 2, classId: 2 },
  { documentId: 3, classId: 1 },
  { documentId: 4, classId: 2 },
];

export const admin = [
  {email: "admin@example.com", password: "admin123" },
];

export const teachers = [
  {
    fullName: "Nguyen Van A",
    dob: "1980-05-10",
    address: "123 Le Loi, Hanoi",
    email: "teacherA@example.com",
    password: "teachA123",
    phone: "0912345678",
    graduationPlace: "Hanoi University",
    expYear: 10,
  },
  {
    fullName: "Le Thi B",
    dob: "1985-08-15",
    address: "456 Tran Hung Dao, Hanoi",
    email: "teacherB@example.com",
    password: "teachB456",
    phone: "0923456789",
    graduationPlace: "VNU University",
    expYear: 8,
  },
];

export const students = [
  { fullName: "Nguyen Van An", dob: "2004-01-15", address: "12 Tran Phu, Hanoi", email: "an.nguyen@example.com", phone: "0912340001" },
  { fullName: "Tran Thi Bich", dob: "2003-03-22", address: "45 Le Loi, Hue", email: "bich.tran@example.com", phone: "0912340002" },
  { fullName: "Pham Van Cuong", dob: "2005-07-09", address: "78 Nguyen Trai, Da Nang", email: "cuong.pham@example.com", phone: "0912340003" },
  { fullName: "Le Thi Dao", dob: "2002-11-30", address: "23 Bach Mai, Hanoi", email: "dao.le@example.com", phone: "0912340004" },
  { fullName: "Hoang Van Em", dob: "2004-05-18", address: "56 Ton Duc Thang, HCM", email: "em.hoang@example.com", phone: "0912340005" },
  { fullName: "Nguyen Thi Phuong", dob: "2003-08-25", address: "89 Phan Dinh Phung, Hanoi", email: "phuong.nguyen@example.com", phone: "0912340006" },
  { fullName: "Tran Van Giang", dob: "2005-02-14", address: "34 Kim Ma, Hanoi", email: "giang.tran@example.com", phone: "0912340007" },
  { fullName: "Le Thi Hoa", dob: "2002-06-10", address: "67 Lang Ha, Hanoi", email: "hoa.le@example.com", phone: "0912340008" },
  { fullName: "Pham Van Hung", dob: "2004-09-05", address: "90 Nguyen Chi Thanh, Hanoi", email: "hung.pham@example.com", phone: "0912340009" },
  { fullName: "Nguyen Thi Huyen", dob: "2003-12-01", address: "11 Tran Quoc Hoan, Hanoi", email: "huyen.nguyen@example.com", phone: "0912340010" },
  { fullName: "Tran Van Khoa", dob: "2005-04-20", address: "22 Le Van Luong, Hanoi", email: "khoa.tran@example.com", phone: "0912340011" },
  { fullName: "Le Thi Lan", dob: "2002-07-17", address: "33 Hoang Hoa Tham, Hanoi", email: "lan.le@example.com", phone: "0912340012" },
  { fullName: "Pham Van Minh", dob: "2004-10-30", address: "44 Doi Can, Hanoi", email: "minh.pham@example.com", phone: "0912340013" },
  { fullName: "Nguyen Thi Nga", dob: "2003-01-09", address: "55 Cau Giay, Hanoi", email: "nga.nguyen@example.com", phone: "0912340014" },
  { fullName: "Tran Van Nam", dob: "2005-03-27", address: "66 Xuan Thuy, Hanoi", email: "nam.tran@example.com", phone: "0912340015" },
  { fullName: "Le Thi Oanh", dob: "2002-09-12", address: "77 Trung Kinh, Hanoi", email: "oanh.le@example.com", phone: "0912340016" },
  { fullName: "Pham Van Phuc", dob: "2004-06-03", address: "88 Nguyen Phong Sac, Hanoi", email: "phuc.pham@example.com", phone: "0912340017" },
  { fullName: "Nguyen Thi Quyen", dob: "2003-11-19", address: "99 Ho Tung Mau, Hanoi", email: "quyen.nguyen@example.com", phone: "0912340018" },
  { fullName: "Tran Van Quang", dob: "2005-08-07", address: "100 Me Tri, Hanoi", email: "quang.tran@example.com", phone: "0912340019" },
  { fullName: "Le Thi Sen", dob: "2002-02-28", address: "101 Pham Hung, Hanoi", email: "sen.le@example.com", phone: "0912340020" },
  { fullName: "Pham Van Tam", dob: "2004-12-15", address: "102 Tran Duy Hung, Hanoi", email: "tam.pham@example.com", phone: "0912340021" },
  { fullName: "Nguyen Thi Uyen", dob: "2003-05-06", address: "103 Nguyen Hoang, Hanoi", email: "uyen.nguyen@example.com", phone: "0912340022" },
  { fullName: "Tran Van Vu", dob: "2005-10-23", address: "104 My Dinh, Hanoi", email: "vu.tran@example.com", phone: "0912340023" },
  { fullName: "Le Thi Xuan", dob: "2002-03-11", address: "105 Ha Dong, Hanoi", email: "xuan.le@example.com", phone: "0912340024" },
  { fullName: "Pham Van Yen", dob: "2004-07-30", address: "106 Dong Da, Hanoi", email: "yen.pham@example.com", phone: "0912340025" },
];

export const teachers_classes = [
  { classId: 1, teacherId: 1, teachingDate: "2025-09-02" },
  { classId: 2, teacherId: 2, teachingDate: "2025-09-16" },
];

export const students_classes = [
  {
    classId: 1,
    studentId: 1,
    isAbsent: false,
    finalMark: 8.5,
  },
  {
    classId: 1,
    studentId: 2,
    isAbsent: false,
    finalMark: 8.5,
  },
  {
    classId: 1,
    studentId: 3,
    isAbsent: false,
    finalMark: 8.5,
  },
  {
    classId: 1,
    studentId: 4,
    isAbsent: false,
    finalMark: 8.5,
  },
  {
    classId: 2,
    studentId: 1,
    isAbsent: false,
    finalMark: 7.0,
  },
  {
    classId: 2,
    studentId: 2,
    isAbsent: false,
    finalMark: 7.0,
  },
  {
    classId: 2,
    studentId: 3,
    isAbsent: false,
    finalMark: 7.0,
  },
  {
    classId: 2,
    studentId: 4,
    isAbsent: false,
    finalMark: 7.0,
  },
];
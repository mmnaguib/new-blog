export const baseURL = "http://localhost:5000";

export const postTypes = [
  { ID: 1, type: "شخصي" },
  { ID: 2, type: "عام" },
  { ID: 3, type: "رياضي" },
];

export const sortPosts = [
  { ID: 1, type: "من الاقدم" },
  { ID: 2, type: "من الاحدث" },
];

export const gridTabs = [
  { id: 0, tabName: "المستخدمين" },
  { id: 1, tabName: "البوستات" },
  { id: 2, tabName: "Clients" },
];

export const profileMenuItems = [
  { id: 1, name: "ملفك الشخصي", link: "/profile" },
  { id: 2, name: "الإعدادات", link: "/settings" },
  { id: 3, name: "تسجيل الخروج", action: "logout" },
];

export const availableTags = ["تقنية", "رياضة", "فن", "تعليم", "ترفيه"];

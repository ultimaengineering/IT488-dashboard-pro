import ReactTables from "views/tables/ReactTables.js";
import RegularTables from "views/tables/RegularTables.js";
import ExtendedTables from "views/tables/ExtendedTables.js";
import ValidationForms from "views/forms/ValidationForms.js";
import ExtendedForms from "views/forms/ExtendedForms.js";
import RegularForms from "views/forms/RegularForms.js";
import Dashboard from "views/Dashboard.js";
import Register from "views/pages/Register.js";
import User from "views/pages/User.js";
import Login from "views/pages/Login.js";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: Register,
        layout: "/auth"
      },
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: User,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  }
];

export default routes;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface Resources {
  [key: string]: {
    translation: {
      title: string;
      addbtn: string;
      cart: string;
      paragraph: string;
      OrderTotal: String;
      orderbtn: string;
      neworder: string;
      ordertitle: string;
      orderparagraph: string;
    };
  };
}

const resources: Resources = {
  en: {
    translation: {
      title: "Dessert",
      addbtn: "  Add to cart",
      cart: " Your cart",
      paragraph: "Your added items will appear here",
      OrderTotal: "Order Total",
      orderbtn: "  Confirm Order",
      neworder: "Start New order",
      ordertitle: "Order confirmed",
      orderparagraph: "We hope you enjoy your food!",
    },
  },
  fa: {
    translation: {
      title: "دسر",
      addbtn: "اضافه کردن به سبد خرید",
      cart: " سبد خرید شما",
      paragraph: "موارد اضافه شده شما در اینجا ظاهر می شود",
      OrderTotal: "مجموع سفارش",
      orderbtn: "تایید سفارش",
      neworder: "شروع سفارش جدید",
      ordertitle: "سفارش تایید شد",
      orderparagraph: "امیدواریم از غذایتان لذت ببرید!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

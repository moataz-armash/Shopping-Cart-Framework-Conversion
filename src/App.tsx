import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import * as Pages from "./pages/_index";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { AuthProvider } from "./hooks/authContext";
import { CartProvider } from "./hooks/cartContext";

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    let lang;

    if (localStorage.i18nextLng !== undefined) {
      lang = localStorage.i18nextLng;
      console.log(`Sprache '${lang}' von localStorage`);
    } else if (document.location.host.endsWith(".com")) {
      lang = "en";
      console.log(`Sprache '${lang}' von document.location.host`);
    } else if (navigator.language !== undefined) {
      lang = navigator.language.substring(0, 2);
      console.log(`Sprache '${lang}' von navigator.language`);
    } else {
      i18n.changeLanguage("de");
      console.log(`Default Sprache '${lang}'`);
    }

    localStorage.i18nextLng = lang;
    i18n.changeLanguage(lang);
  }, []);

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="login" element={<Pages.Login />} />
            <Route path="register" element={<Pages.Register />} />
            <Route path="products" element={<Pages.Products />} />
            <Route path="about" element={<Pages.About />} />
            <Route path="contact" element={<Pages.Contact />} />
            <Route path="policy" element={<Pages.Policy />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
        </CartProvider>
        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./css/App.css";
import Landing from "./Landing";
import SurahPage from "./components/SurahPage";
import QuranCart from "./components/QuranCart";
import ScrollToBottomButton from "./components/ScrollToBottomButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Pagejuz from "./components/Pagejuz";
import JuzCart from "./components/JuzCart";
import DataOfAyah from "./components/DataOfAyah";
import PageCard from "./components/PageCard";
import PageOfQuran from "./components/PageOfQuran";
import Audios from "./components/Audios";
import PageAudio from "./components/PageAudios";
import Tv from "./components/Tv"
import Radio from "./components/Radio"
import ButtonRadio from "./components/ButtonRadio";
import Footer from "./components/Footer";
import EndQuran from "./components/EndQuran";
import Azkar from "./components/Azkar";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <QuranCart />
            </>
          }
        />
        <Route path="/quran" element={<QuranCart />} />
        <Route path="/surah/:id" element={<SurahPage />} />
        <Route path="/juz/:id" element={<Pagejuz />} />
        <Route path="/juz" element={<JuzCart />} />
        <Route path="/page" element={<PageCard/>} />
        <Route path="/page/:id" element={<PageOfQuran/>} />
        <Route path="/audios" element={<Audios/>} />
        <Route path="/audios/:id" element={<PageAudio/>} />
        <Route path="/tv" element={<Tv/>} />
        <Route path="/radio" element={<Radio/>} />
        <Route path="/azkar" element={<Azkar/>} />
        <Route path="/ayah/:verseId" element={<DataOfAyah />} />
        <Route path="/دعاء-ختم-القران" element={<EndQuran />} />
      </Routes>
      <ScrollToBottomButton/>
      <ScrollToTopButton/>
      <ButtonRadio/>
      <Footer/>
<Contact/>
    </div>
  );
}

export default App;

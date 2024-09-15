// AyahDetailPage.jsx
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function DataOfAyah() {
  const { verseId } = useParams();
  const [ayahData, setAyahData] = useState(null);
  const [tafseer, setTafseer] = useState(null);
  const [tafseerAk, setTafseerAk] = useState(null);
  const firstNumber = verseId.split(":")[0];
  const secondNumber = verseId.split(":")[1];
  const numberOfAyah = `${firstNumber}/${secondNumber}`;

  useEffect(() => {
    const fetchAyahData = async () => {
      try {
        const res = await fetch(
          `https://quranapi.pages.dev/api/${numberOfAyah}.json`
        );
        const data = await res.json();
        setAyahData(data);
      } catch (error) {
        console.error("Error fetching ayah data:", error);
      }
    };
    const fetchTafseer = async () => {
      try {
        const res = await fetch(
          `http://api.quran-tafseer.com/tafseer/8/${numberOfAyah}`
        );
        const data = await res.json();
        setTafseer(data);
      } catch (error) {
        console.error("Error fetching tafseer:", error);
      }
    };
    const fetchTafseerAk = async () => {
      try {
        const res = await fetch(
          `http://api.quran-tafseer.com/tafseer/4/${numberOfAyah}`
        );
        const data = await res.json();
        setTafseerAk(data);
      } catch (error) {
        console.error("Error fetching tafseer:", error);
      }
    };
    window.scrollTo(0, 0);
    fetchAyahData();
    fetchTafseer();
    fetchTafseerAk();
  }, [verseId]);

  if (!ayahData || !tafseer || !tafseerAk) {
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="page-data-ayah">
      <div className="container">
        <div className="data-ayah">
          <h3 className="title-ayah">تفاصيل الآية :</h3>
          <h4>
            أسم السورة: {ayahData.surahNameArabicLong} - {ayahData.surahName}
          </h4>
          <h5 style={{marginBottom:"30px"}} className="descriptionChange">تفاصيل الاية من ترجمة وتفسير لأشهر تفاسير القرآن الكريم</h5>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item ">
              <h2 className="accordion-header ">
                <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <span className="titleName"> <FontAwesomeIcon icon={faChevronDown}  /> نص الآية</span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body desc">{ayahData.arabic1}</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <span className="titleName"> <FontAwesomeIcon icon={faChevronDown}/> ترجمة الآية</span>
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body desc">ْ{ayahData.english}</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  <span className="titleName"> <FontAwesomeIcon icon={faChevronDown}/> تفسير الآية "تفسير الطبري"</span>
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body desc">{tafseer.text}</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  <span className="titleName"> <FontAwesomeIcon icon={faChevronDown}/> تفسير الآية "تفسير ابن كثير"</span>
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body desc">{tafseerAk.text}</div>
              </div>
            </div>
          </div>
          <div className="audio">
            <h3 className="title-ayah">سماع تلاوة الآية: </h3>
            {ayahData.audio && ayahData.audio[1] && (
              <>
              <h5 className="descriptionChange">سماع تلاوة الاية بالتجويد المحكم : </h5>
                <h4>
                بصوت القارئ : 
                  {ayahData.audio[1].reciter === "Mishary Rashid Al-Afasy"
                    ? "مشاري راشد العفاسي"
                    : "أبو بكر الشاطري"}
                </h4>
                <ReactAudioPlayer
                  src={ayahData.audio[1].url}
                  controls
                  className="rhap_container"
                />
              </>
            )}
            {ayahData.audio && ayahData.audio[2] && (
              <>
                <h4>
                بصوت القارئ : 
                  {ayahData.audio[2].reciter === "Mishary Rashid Al-Afasy"
                    ? "مشاري راشد العفاسي"
                    : "أبو بكر الشاطري"}
                </h4>
                <ReactAudioPlayer
                  src={ayahData.audio[2].url}
                  controls
                  className="rhap_container"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// AyahDetailPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

export default function DataOfAyah() {
  const { verseId } = useParams();
  const [ayahData, setAyahData] = useState(null);
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
window.scrollTo(0,0)
    fetchAyahData();
  }, [verseId]);
  

  // if (!ayahData) return <p>Loading...</p>;
  if (!ayahData)
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  return (
    <div className="page-data-ayah">
      <div className="container">
        <div className="data-ayah">
          <h4 className="title-ayah">تفاصيل الآية :</h4>
          <h4>أسم السورة: {ayahData.surahNameArabicLong} - {ayahData.surahName}</h4>
          <h4 className="textOfAyah" >  نص الآية :   {ayahData.arabic1}</h4>
          <h4 className="textOfAyah">ترجمة الآية : {ayahData.english}</h4>
          <div className="audio">
            <h4 className="title-ayah">سماع تلاوة الآية: </h4>
            <h4>
              القارئ:{" "}
              {ayahData.audio[1].reciter === "Mishary Rashid Al-Afasy"
                ? "مشاري راشد العفاسي"
                : "أبو بكر الشاطري"}
            </h4>
            <ReactAudioPlayer
              src={ayahData.audio[1].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
            <h4>
              القارئ:
              {ayahData.audio[2].reciter === "Mishary Rashid Al-Afasy"
                ? "مشاري راشد العفاسي"
                : "أبو بكر الشاطري"}
            </h4>
            <ReactAudioPlayer
              src={ayahData.audio[2].url}
              controls
              className="rhap_container"
            ></ReactAudioPlayer>
          </div>
        </div>
      </div>
    </div>
  );
}

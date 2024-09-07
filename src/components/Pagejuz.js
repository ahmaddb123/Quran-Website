import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJuzLabel } from "./juz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function JuzCart() {
  const { id } = useParams();
  const [dataJuz, setDataJuz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataJuz = async () => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/juz/${id}`);
        const data = await res.json();
        setDataJuz(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataJuz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataJuz();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  // alert
  const sweetAlertJuz1 = () => {
    Swal.fire({
      title: "أنت في الجزء الأول",
      text: "لا يوجد جزء قبله",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  const sweetAlertJuz30 = () => {
    Swal.fire({
      title: "أنت في الجزء الثلاثون",
      text: "لا يوجد جزء بعده",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  // alert

  if (!dataJuz) {
    return <p>No data available for this Juz.</p>;
  }

  const nextToPage = () => {
    const numberOfId = parseInt(id, 10) + 1;
    if (numberOfId > 30) {
      sweetAlertJuz30();
    } else {
      navigate(`/juz/${numberOfId}`);
    }
  };
  const PreviousToPage = () => {
    const numberOfId = parseInt(id, 10) - 1;
    if (numberOfId < 1) {
      sweetAlertJuz1();
      return;
    } else {
      navigate(`/juz/${numberOfId}`);
    }
  };

  const handleClick = async (verseNumber) => {
    navigate(`/ayah/${verseNumber}`);
  };

  let currentSurah = null;

  
  return (
    <div className="surah-container">
      <div className="container">
        <div className="container-info">
          {dataJuz.ayahs.map((ayah) => {
            const surahChanged = ayah.surah.number !== currentSurah;
            currentSurah = ayah.surah.number;

            return (
              <div className="info-ayah " key={ayah.number}>
                {surahChanged && (
                  <>
                    <h3 className="title-ayah">
                      {getJuzLabel(ayah.juz)} - {ayah.surah.name} -{" "}
                      {ayah.surah.englishName}
                    </h3>
                    {ayah.surah.name === "سُورَةُ التَّوۡبَةِ" ? (
                      <h1 className="basmala">أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</h1>
                    ) : ayah.surah.name === "سُورَةُ ٱلْفَاتِحَةِ" ? (
                      ""
                    ) : (
                      <h1 className="basmala">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                      </h1>
                    )}
                  </>
                )}

                <span className="number"> ﴿{ayah.numberInSurah}﴾ </span>
                <span title="أضغط على الاية لرؤية ترجمتها وسماع تلاوتها" className="span-text" onClick={() => handleClick(`${ayah.surah.number}:${ayah.numberInSurah}`)}>
                  {ayah.surah.name === "سُورَةُ ٱلْفَاتِحَةِ" ||
                  ayah.numberInSurah === 30
                    ? ayah.text
                    : ayah.text.split(
                        "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ"
                      )}
                      
                </span>
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button className="btnTo" onClick={PreviousToPage}>
            <FontAwesomeIcon
              className="icon-btnR"
              icon={faCircleChevronRight}
            />
            قراءة الجزء السابق{" "}
          </button>
          <button className="btnTo" onClick={nextToPage}>
            قراءة الجزء التالي{" "}
            <FontAwesomeIcon className="icon-btnL" icon={faCircleChevronLeft} />
          </button>
        </div>
      </div>
    </div>
  );
}

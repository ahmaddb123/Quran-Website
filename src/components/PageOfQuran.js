import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getJuzLabel } from "./juz";

export default function PageOfQuran() {
  const { id } = useParams();
  const [page, setPage] = useState(null); // تعيين القيمة الأولية null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/page/${id}/quran-uthmani`
        );
        if (!res.ok) throw new Error(`Error fetching page ${id}`);
        const data = await res.json();
        setPage(data.data); 
      } catch (error) {
        console.error(`Failed to fetch page ${id}:`, error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };
    fetchPage();
    window.scrollTo(0, 0);
  }, [id]);

  const handleClick = (verseNumber) => {
    const url = `/ayah/${verseNumber}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  if (error) return <p>Error: {error}</p>; // عرض رسالة خطأ إذا حدث خطأ

  if (!page || !page.ayahs) return <p>No data available</p>; // عرض رسالة إذا لم تكن هناك بيانات
  // alert
  const sweetAlertJuz1 = () => {
    Swal.fire({
      title: "أنت في الصفحة الأولى",
      text: "لا يوجد صفحة قبلها",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  const sweetAlertJuz30 = () => {
    Swal.fire({
      title: "انت في الصفحة الأخيرة",
      text: "لا يوجد صفحة بعدها",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  // alert
  // buttons
  const nextToPage = () => {
    const numberOfId = parseInt(id, 10) + 1;
    if (numberOfId > 604) {
      sweetAlertJuz30();
    } else {
      navigate(`/page/${numberOfId}`);
    }
  };
  const PreviousToPage = () => {
    const numberOfId = parseInt(id, 10) - 1;
    if (numberOfId < 1) {
      sweetAlertJuz1();
      return;
    } else {
      navigate(`/page/${numberOfId}`);
    }
  };
  // buttons
  let currentSurah = null;
  return (
    <div className="surah-container">
      <div className="container">
        <div className="container-info">
          {page.ayahs.map((ayah) => {
            const surahChanged = ayah.surah.number !== currentSurah;
            currentSurah = ayah.surah.number;

            return (
              <div className="info-ayah" key={ayah.number}>
                {surahChanged && (
                  <>
                    <h3 className="title-ayah">
                      {getJuzLabel(ayah.juz)} - {ayah.surah.name} -{" "}
                      {ayah.surah.englishName}
                    </h3>
                    {ayah.surah.name === "سُورَةُ التَّوۡبَةِ" ? (
                      <h1 className="basmala">
                        أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
                      </h1>
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
                <span
                title="أضغط على الاية لرؤية ترجمتها وتفسيرها وسماع تلاوتها"
                  className="span-text"
                  onClick={() =>
                    handleClick(`${ayah.surah.number}:${ayah.numberInSurah}`)
                  }
                >
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
            قراءة الصفحة السابقة
          </button>
          <button className="btnTo" onClick={nextToPage}>
            قراءة الصفحة التالية
            <FontAwesomeIcon className="icon-btnL" icon={faCircleChevronLeft} />
          </button>
        </div>
      </div>
    </div>
  );
}

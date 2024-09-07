import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSurahs } from "../Redux/Slices/quranSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ScrollToTopButton from "./ScrollToTopButton";
import ScrollToBottomButton from "./ScrollToBottomButton";
import Swal from "sweetalert2";

export default function SurahPage() {
  // the Constants
  const { id } = useParams();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ayahData, setAyahData] = useState(null);
  const quran = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get Data form API
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const res = await fetch(
          `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`
        );
        const data = await res.json();
        setVerses(data.verses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surah data:", error);
        setLoading(false);
      }
    };
    dispatch(fetchSurahs());
    fetchSurahData();
    window.scrollTo(0, 0);
  }, [id, dispatch]);
  const sweetAlertsurah1 = () => {
    Swal.fire({
      title: "أنت في السورة الأولى",
      text: "لا يوجد سورة قبلها",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  const sweetAlertsurah114 = () => {
    Swal.fire({
      title: "أنت في السورة الأخيرة",
      text: "لا يوجد سورة بعدها",
      icon: "error",
      confirmButtonText: "حسنا",
      confirmButtonColor: "#27374d",
    });
    return;
  };
  // alert

  // Conditions in my Page
  // handel Click
  const handleClick = async (verseNumber) => {
    navigate(`/ayah/${verseNumber}`);
  };
  // handel Click
  const chapters = quran.chapters || [];
  if (loading)
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  if (!chapters) return <p>يوجد خطأ</p>;
  const nextToPage = () => {
    const numberOfId = parseInt(id, 10) + 1;
    if (numberOfId > 114) {
      sweetAlertsurah114();
    } else {
      navigate(`/surah/${numberOfId}`);
    }
  };
  const PreviousToPage = () => {
    const numberOfId = parseInt(id, 10) - 1;
    if (numberOfId < 1) {
      sweetAlertsurah1();
    } else {
      navigate(`/surah/${numberOfId}`);
    }
  };

  // Page content
  return (
    <div className="surah-container">
      <div className="container">
        <ul>
          <li> سورة : {chapters[id - 1].name_arabic}</li>
          <li> عدد الآيات : "{chapters[id - 1].verses_count}"</li>
          <li>
            مكان نزول السورة : "
            {chapters[id - 1].revelation_place === "madinah"
              ? "المدينة"
              : "مكة المكرمة"}
            "
          </li>
          <li> رقم السورة : "{chapters[id - 1].id}"</li>
          <li> تبدأ من صفحة : "{chapters[id - 1].pages[0]}"</li>
          <li> تنتهي عند الصفحة : "{chapters[id - 1].pages[1]}"</li>
        </ul>
        {chapters[id - 1].name_arabic === "التوبة" ? (
          <h1>أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</h1>
        ) : (
          <h1>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h1>
        )}
        <div className="container-info">
          {verses.map((ayah) => {
            return (
              <div className="info-ayah" key={ayah.id}>
                <span
                  title="أضغط على الاية لرؤية ترجمتها وسماع تلاوتها"
                  className="span-text"
                  onClick={() => handleClick(ayah.verse_key)}
                >
                  {ayah.text_uthmani}
                </span>
                <span className="number"> ﴿{ayah.verse_key.split(":")[1]}﴾ </span>
              </div>
            );
          })}
        </div>
        <h1 className="end">صَدَقَ ٱللَّهُ ٱلْعَظِيمُ</h1>
        <div className="buttons">
          <button className="btnTo" onClick={PreviousToPage}>
            <FontAwesomeIcon
              className="icon-btnR"
              icon={faCircleChevronRight}
            />
            قراءة السورة السابقة{" "}
          </button>
          <button className="btnTo" onClick={nextToPage}>
            قراءة السورة التالية{" "}
            <FontAwesomeIcon className="icon-btnL" icon={faCircleChevronLeft} />
          </button>
        </div>
        <ScrollToTopButton />
        <ScrollToBottomButton />
      </div>
    </div>
  );
}

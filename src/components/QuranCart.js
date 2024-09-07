import { useDispatch, useSelector } from "react-redux";
import { fetchSurahs } from "../Redux/Slices/quranSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";
import ScrollToBottomButton from "./ScrollToBottomButton";

export default function QuranCart() {
  const quran = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSurahs()); // تنفيذ الـ thunk لجلب البيانات
  }, []);

  const chapters = quran.chapters || [];

  return (
    <div className="card-surah">
      <div className="container">
        <h1>سور "القرآن الكريم"</h1>
        <div className="allCard">
          {Array.isArray(chapters) && chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <Link to={`/surah/${chapter.id}`} key={chapter.id} className="myCard">
                <h3>سورة : {chapter.name_arabic}</h3>
              </Link>
            ))
          ) : (
            <p>No chapters available</p>
          )}
        </div>
      <ScrollToTopButton/>
      <ScrollToBottomButton/>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { fetchSurahs } from "../Redux/Slices/quranSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";
import ScrollToBottomButton from "./ScrollToBottomButton";

export default function QuranCart() {
  const quran = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchSurahs());
    window.scrollTo(0, 0);
  }, []);

  const chapters = quran.chapters || [];

  const filtered = chapters.filter((reciter) =>
    reciter.name_arabic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-surah">
      <div className="container">
        <h1>سور "القرآن الكريم"</h1>
        <h5 className="description">موقع القرآن الكريم والمصحف الشريف</h5>
        <h5 className="description">
          لقراءة القرآن الكريم بالرسم العثماني مع التفسير وسماع تلاوة القرآن
          الكريم لأشهر القراء
        </h5>
        <input
          className="input-search"
          type="text"
          placeholder="أكتب أسم السورة التي تريد قرائتها ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="allCard">
          {filtered.length > 0 ? (
            filtered.map((chapter) => (
              <Link
                className="myCard"
                key={chapter.id}
                to={`/surah/${chapter.id}`}
              >
                <h3>سورة: {chapter.name_arabic}</h3>
              </Link>
            ))
          ) : (
            <h1 className="error">يوجد خطأ في الأسم المدخل</h1>
          )}
        </div>
        <div className="info">
          <h6 style={{color:"#f7631b", fontWeight:"bold"}}>
            كتاب أنزلناه إليك مبارك ليدبروا آياته وليتذكر أولوا الألباب (ص:29)
          </h6>
          <p className="description">
            عن أبي أمامة الباهلي رضي الله عنه قال : سمعت رسول الله صلى الله عليه
            وسلم يقول : اقرءوا القرآن فإنه يأتي يوم القيامة شفيعا لأصحابه ,
            اقرءوا الزهراوين البقرة وسورة آل عمران فإنهما تأتيان يوم القيامة
            كأنهما غمامتان أو كأنهما غيايتان أو كأنهما فرقان من طير صواف تحاجان
            عن أصحابهما اقرءوا سورة البقرة فإن أخذها بركة وتركها حسرة ولا
            تستطيعها البطلة .... رواه مسلم
          </p>
        </div>
      </div>
    </div>
  );
}

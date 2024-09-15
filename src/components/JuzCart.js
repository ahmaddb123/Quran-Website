import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJuz } from "../Redux/Slices/juzquran";
import { getJuzLabel } from "./juz";
import { Link } from "react-router-dom";

export default function JuzCart() {
  const juzs = useSelector((state) => state.juz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJuz());
    window.scrollTo(0, 0);
  }, []);
  const juz = juzs.juzs || [];
  const uniqueJuzs = Array.from(new Set(juz.map((juz) => juz.juz_number)))
    .map((juz_number) => {
      return juz.find((juz) => juz.juz_number === juz_number);
    })
    .sort((a, b) => a.juz_number - b.juz_number);

  return (
    <div className="card-juz">
      <div className="container">
        <h1>أجزاء "القرآن الكريم"</h1>
        <div className="description-info">
          <h5 className="description">موقع القرآن الكريم والمصحف الشريف</h5>
          <h5 className="description">
            {" "}
            أجزاء القرآن الكريم كاملة بالرسم العثماني يمكنك من هنا اختيار الجزء
            المراد قرائته
          </h5>
        </div>
        <div className="allCard">
          {uniqueJuzs.map((juz) => (
            <Link
              to={`/juz/${juz.juz_number}`}
              key={juz.juz_number}
              className="myCard"
            >
              <h4> "{getJuzLabel(juz.juz_number)}"</h4>
              <p>عدد الآيات داخل الجزء : {juz.verses_count}</p>
            </Link>
          ))}
        </div>
        <div className="info">
          <h6 style={{ color: "#f7631b", fontWeight: "bold" }}>
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

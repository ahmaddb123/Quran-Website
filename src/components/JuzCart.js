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
        <div className="allCard">
          {uniqueJuzs.map((juz) => (
            <Link
              to={`/juz/${juz.juz_number}`}
              key={juz.juz_number}
              className="myCard"
            >
              <h4> "{(getJuzLabel(juz.juz_number))}"</h4>
              <p>عدد الآيات داخل الجزء : {juz.verses_count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

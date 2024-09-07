import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRiwayat } from "../Redux/Slices/riwayatSlice";
import { fetchReciters } from "../Redux/Slices/recitersSlice";

export default function Audios() {
  const dispatch = useDispatch();

  const riwayat = useSelector((state) => state.riwayat.riwayat);
  const reciters = useSelector((state) => state.reciters.riwayat.reciters);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء الأكشن لجلب البيانات
    const fetchData = async () => {
      try {
        await dispatch(fetchRiwayat());
        await dispatch(fetchReciters());
        setLoading(false);
      } catch (error) {
        console.log("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  }

  if (!reciters || reciters.length === 0) {
    return <p>No reciters available.</p>;
  }
  console.log(reciters[1].moshaf[0].name);

  return (
    <div className="container-audios">
      <div className="container">
        <ul>
          <li><select>
              {/* <option disabled selected hidden>أختر الرواية / نوع المصحف</option> */}
            {riwayat.riwayat.map(riwaha => {
            return (
                <option key={riwaha.id}>{riwaha.name}</option>
            )
          })}</select></li>
        </ul>
        <div className="allCard">
          {reciters.map((reciter) => (
            <Link key={reciter.id} to={`/reciter/${reciter.id}`}>
              <h1>{reciter.name}</h1>
              <h4>{reciter.moshaf.map(name => name.name)}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

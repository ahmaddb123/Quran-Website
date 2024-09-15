import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRiwayat } from "../Redux/Slices/riwayatSlice";
import { fetchReciters } from "../Redux/Slices/recitersSlice";

export default function Audios() {
  const dispatch = useDispatch();

  const riwayat = useSelector((state) => state.riwayat.riwayat);
  const reciters = useSelector((state) => state.reciters.riwayat.reciters);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    window.scrollTo(0, 0);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container-Loader">
        <p className="loader"></p>
      </div>
    );
  }

  const filteredReciters = reciters.filter((reciter) =>
    reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-audios">
      <div className="container">
        <h1>سماع تلاوة "القرأن الكريم" </h1>
        <h5 className="description">يمكنك سماع تلاوة القرآن الكريم لمختلف القرائ وأشهرهم أكتب أسم القارئ وحدد التلاوة والسورة المطلوب سماعها </h5>
        <h5 className="description">كما يمكنك بعد تحديد السورة تحمليها بصيغة mp3</h5>
        <input
          className="input-search"
          type="text"
          placeholder="أكتب أسم القارئ الذي تبحث عنه ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="allCard">
          {filteredReciters.length > 0 ? (
            filteredReciters.map((reciter) => (
              <Link
                className="myCard"
                key={reciter.id}
                to={`/audios/${reciter.id}`}
              >
                <h4>{reciter.name}</h4>
              </Link>
            ))
          ) : (
            <h3 className="error">للأسف لايوجد هذا القارئ 😥</h3>
          )}
        </div>
      </div>
    </div>
  );
}

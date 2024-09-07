import video from "./images/background-animation.mp4";
export default function Landing() {
  return (
    <div className="landing">
      {/* <video src={video} autoPlay loop muted playsInline /> */}
      <div className="info">
        <h1>الْقُرْآنُ الْكَرِيمُ</h1>
        <h1>
          وَأَنزَلْنَا إِلَيْكَ الْكِتَـٰبَ تِبْيَانًا لِّكُلِّ شَيْءٍ وَهُدًۭى
          وَرَحْمَةً وَبُشْرَىٰ لِلْمُسْلِمِينَ
        </h1>
        <h1>صَدَقَ ٱللَّهُ ٱلْعَظِيمُ</h1>
      </div>
    </div>
  );
}

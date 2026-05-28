/**
 * 3D flip badge — front shows icon, back shows description.
 * Pass badge images later via frontImage/backImage props.
 */
function FlipBadge({
  title,
  description,
  icon = "BADGE",
  frontImage,
  backImage,
  type = "first_solve"
}) {
  const gradients = {
    first_solve: "from-amber-400 to-orange-500",
    contest_top: "from-yellow-400 to-amber-600",
    leaderboard_top: "from-purple-400 to-indigo-500",
    sharp_mind: "from-violet-400 to-purple-600",
    streak: "from-orange-400 to-red-500"
  };

  return (
    <div className="group w-44 h-52 perspective-[1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br ${
            gradients[type] || gradients.first_solve
          } flex flex-col items-center justify-center text-white shadow-xl p-4`}
        >
          {frontImage ? (
            <img src={frontImage} alt={title} className="w-16 h-16 object-contain mb-2" />
          ) : (
            <span className="text-lg mb-2 font-bold">{icon}</span>
          )}
          <span className="font-bold text-center">{title}</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-white dark:bg-[#2a211c] border-2 border-[#8b5e3c] flex flex-col items-center justify-center p-4 shadow-xl text-center">
          {backImage ? (
            <img src={backImage} alt="" className="w-12 h-12 object-contain mb-2 opacity-80" />
          ) : null}
          <p className="text-sm text-[#5a4030] dark:text-[#e8d5c4] font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipBadge;

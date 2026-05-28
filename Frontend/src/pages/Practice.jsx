import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import courses from "../data/courses";
import api from "../services/api";

/** Practice hub — shows per-user progress on each course */
function Practice() {
  const [progress, setProgress] = useState({});
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const loadProgress = () => {
    if (!user?._id) return;
    api
      .get(`/question-api/progress-summary/${user._id}`)
      .then((r) => setProgress(r.data || {}))
      .catch(() => {});
  };

  useEffect(() => {
    loadProgress();
    window.addEventListener("progress-updated", loadProgress);
    window.addEventListener("focus", loadProgress);
    return () => {
      window.removeEventListener("progress-updated", loadProgress);
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  return (
    <PageShell>
      <AppNavbar />
      <div className="p-8 lg:p-10 max-w-[1700px] mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4] mb-2">
          Practice Courses
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Pick a language and solve problems — progress updates after each solve
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progressData={progress[course.slug] || { solved: 0, total: 0, progress: 0 }}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default Practice;

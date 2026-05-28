import React, { useEffect, useMemo, useState } from "react";
import { MonitorPlay } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import type { RootState } from "../../redux/store";

const formatDuration = (publishedAt?: string) => {
  if (!publishedAt) {
    return "Tutorial";
  }

  return new Date(publishedAt).toLocaleDateString();
};

export const Tutorials: React.FC = () => {
  const { tutorials, tutorialsLoading } = useSelector(
    (state: RootState) => state.knowledge,
  );
  const [activeVideoId, setActiveVideoId] = useState("");

  useEffect(() => {
    if (!activeVideoId && tutorials.length > 0) {
      setActiveVideoId(tutorials[0].snippet.resourceId.videoId);
    }
  }, [activeVideoId, tutorials]);

  const activeTutorial = useMemo(
    () =>
      tutorials.find(
        (tutorial) => tutorial.snippet.resourceId.videoId === activeVideoId,
      ) || tutorials[0],
    [activeVideoId, tutorials],
  );

  if (tutorialsLoading && tutorials.length === 0) {
    return (
      <div className="flex h-full min-h-[600px] items-center justify-center rounded-2xl bg-white border border-slate-100">
        <p className="text-sm font-semibold text-slate-600">
          Loading tutorials...
        </p>
      </div>
    );
  }

  if (!activeTutorial) {
    return (
      <div className="flex h-full min-h-[600px] items-center justify-center rounded-2xl bg-white border border-slate-100">
        <p className="text-sm font-semibold text-slate-600">
          Tutorial videos are not available right now.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
        <iframe
          key={activeTutorial.snippet.resourceId.videoId}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${activeTutorial.snippet.resourceId.videoId}?autoplay=0&rel=0`}
          title={activeTutorial.snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {activeTutorial.snippet.title}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {activeTutorial.snippet.description || "Tutorial video"}
        </p>
        <span className="inline-block mt-2 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {formatDuration(activeTutorial.snippet.publishedAt)}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase  mb-3">
          All Tutorials
        </p>
        {tutorials.map((tutorial, index) => {
          const videoId = tutorial.snippet.resourceId.videoId;
          const isActive =
            videoId === activeTutorial.snippet.resourceId.videoId;

          return (
            <button
              key={videoId}
              onClick={() => setActiveVideoId(videoId)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-white border-slate-100 hover:border-primary/20 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-semibold text-sm ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isActive ? <MonitorPlay size={16} /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    isActive ? "text-primary" : "text-slate-800"
                  }`}
                >
                  {tutorial.snippet.title}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDuration(tutorial.snippet.publishedAt)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

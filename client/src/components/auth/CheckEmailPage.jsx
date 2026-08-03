import { MailCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MessagePage from "../ui/MessagePage";

const MeditationPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
      } catch {
        // Autoplay blocked — user will tap play manually
      }
    };

    tryAutoplay();

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const elapsed = audioRef.current ? audioRef.current.currentTime : 0;

  return (
    <div className="mt-6 w-full rounded-2xl border border-greenbase/20 bg-greenbase/5 px-4 py-4">
      <audio ref={audioRef} src="/meditation-intro.mp3" preload="metadata" />

      <p className="mb-3 text-center font-dm text-xs font-semibold uppercase tracking-widest text-greenbase">
        Begin your first meditation
      </p>

      {!hasInteracted && (
        <p className="mb-2 text-center font-dm text-xs text-gray">
          Tap play to start a calming intro meditation while you wait.
        </p>
      )}

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-greenbase text-white shadow-sm transition hover:opacity-90 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* Progress bar + time */}
        <div className="flex flex-1 flex-col gap-1">
          <div
            className="relative h-1.5 w-full cursor-pointer rounded-full bg-greenbase/20"
            onClick={seek}
          >
            <div
              className="h-full rounded-full bg-greenbase transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-dm text-[10px] text-gray">
            <span>{fmt(elapsed)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleOpenGmail = () => {
    window.open(
      "https://mail.google.com/mail/u/0/#inbox",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <MessagePage
      icon={MailCheck}
      title="Check your email"
      description="We sent a verification link to your email address. Please verify your account to continue."
      email={email}
      primaryButtonText="Open Gmail"
      onPrimaryClick={handleOpenGmail}
      secondaryButtonText="Back to login"
      onSecondaryClick={() => navigate("/auth/login", { replace: true })}
      extraContent={<MeditationPlayer />}
    />
  );
};

export default CheckEmailPage;

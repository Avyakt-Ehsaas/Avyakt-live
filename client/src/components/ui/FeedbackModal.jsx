import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Sparkles, Send, ThumbsUp, ThumbsDown } from "lucide-react";

const chipOptions = [
  "Calming",
  "Easy to follow",
  "Loved guidance",
  "Audio issues",
  "Video issues",
  "Too long",
  "Too short",
  "Would join again",
];

const moods = [
  { value: "relaxed", label: "Relaxed" },
  { value: "focused", label: "Focused" },
  { value: "energized", label: "Energized" },
  { value: "neutral", label: "Neutral" },
];

const emotions = [
  { value: "stressed", label: "Stressed", color: "red" },
  { value: "anxious", label: "Anxious", color: "orange" },
  { value: "sad", label: "Sad", color: "blue" },
  { value: "angry", label: "Angry", color: "red" },
  { value: "neutral", label: "Neutral", color: "gray" },
  { value: "calm", label: "Calm", color: "green" },
  { value: "happy", label: "Happy", color: "yellow" },
  { value: "energized", label: "Energized", color: "purple" },
];

const dayMoods = [
  { value: "very-bad", label: "Very Bad", emoji: "😔" },
  { value: "bad", label: "Bad", emoji: "😕" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "very-good", label: "Very Good", emoji: "😊" },
];

const stressLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const energyLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const focusLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheet = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 520, damping: 38 },
  },
  exit: { opacity: 0, y: 18, scale: 0.985, transition: { duration: 0.16 } },
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const FeedbackModal = ({
  isOpen,
  onClose,
  onSubmit,
  heading = "How was today’s session?",
  subheading = "Your feedback helps us improve your meditation experience.",
  defaultValues,
}) => {
  const initial = useMemo(
    () => ({
      rating: clamp(Number(defaultValues?.rating || 0), 0, 5),
      mood: defaultValues?.mood || "relaxed",
      recommend: Boolean(defaultValues?.recommend ?? true),
      message: defaultValues?.message || "",
      chips: Array.isArray(defaultValues?.chips) ? defaultValues.chips : [],
      // Emotion tracking fields
      preMeditationEmotion: defaultValues?.preMeditationEmotion || "neutral",
      postMeditationEmotion: defaultValues?.postMeditationEmotion || "neutral",
      dayMood: defaultValues?.dayMood || "neutral",
      stressLevel: defaultValues?.stressLevel || 5,
      energyLevel: defaultValues?.energyLevel || 5,
      focusLevel: defaultValues?.focusLevel || 5,
      sleepQuality: defaultValues?.sleepQuality || 5,
      emotionalContext: defaultValues?.emotionalContext || {
        workStress: 0,
        personalStress: 0,
        physicalWellbeing: 0,
        mentalClarity: 0
      }
    }),
    [defaultValues]
  );

  const [rating, setRating] = useState(initial.rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [mood, setMood] = useState(initial.mood);
  const [recommend, setRecommend] = useState(initial.recommend);
  const [message, setMessage] = useState(initial.message);
  const [chips, setChips] = useState(initial.chips);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Emotion tracking states
  const [preMeditationEmotion, setPreMeditationEmotion] = useState(initial.preMeditationEmotion);
  const [postMeditationEmotion, setPostMeditationEmotion] = useState(initial.postMeditationEmotion);
  const [dayMood, setDayMood] = useState(initial.dayMood);
  const [stressLevel, setStressLevel] = useState(initial.stressLevel);
  const [energyLevel, setEnergyLevel] = useState(initial.energyLevel);
  const [focusLevel, setFocusLevel] = useState(initial.focusLevel);
  const [sleepQuality, setSleepQuality] = useState(initial.sleepQuality);
  const [emotionalContext, setEmotionalContext] = useState(initial.emotionalContext);

  const visibleRating = hoverRating || rating;

  const toggleChip = (chip) => {
    setChips((prev) => {
      if (prev.includes(chip)) return prev.filter((c) => c !== chip);
      return [...prev, chip].slice(0, 6);
    });
  };

  const reset = () => {
    setRating(initial.rating);
    setHoverRating(0);
    setMood(initial.mood);
    setRecommend(initial.recommend);
    setMessage(initial.message);
    setChips(initial.chips);
    setSubmitting(false);
    setError("");
    // Reset emotion tracking fields
    setPreMeditationEmotion(initial.preMeditationEmotion);
    setPostMeditationEmotion(initial.postMeditationEmotion);
    setDayMood(initial.dayMood);
    setStressLevel(initial.stressLevel);
    setEnergyLevel(initial.energyLevel);
    setFocusLevel(initial.focusLevel);
    setSleepQuality(initial.sleepQuality);
    setEmotionalContext(initial.emotionalContext);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if ((message || "").trim().length < 6) {
      setError("Please add a short message (min 6 characters).");
      return;
    }

    const payload = {
      rating,
      mood,
      recommend,
      message: message.trim(),
      chips,
      // Emotion tracking data
      preMeditationEmotion,
      postMeditationEmotion,
      dayMood,
      stressLevel,
      energyLevel,
      focusLevel,
      sleepQuality,
      emotionalContext,
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      await onSubmit?.(payload);
      handleClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="min-h-screen fixed inset-0 z-[60] flex items-start justify-center p-4 sm:items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
        >
          <motion.button
            type="button"
            aria-label="Close feedback"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl h-[90vh] sm:h-[min(90vh,760px)] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/90 via-white/80 to-white/70 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            variants={sheet}
          >
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-purple-400/35 to-pink-400/35 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-400/25 to-sky-400/25 blur-2xl" />

            <div className="relative flex h-full min-h-0 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-purple-50/60 px-3 py-1 text-xs font-semibold text-purple-700">
                    <Sparkles className="h-4 w-4" />
                    Feedback
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">{heading}</h2>
                  <p className="mt-1 text-sm text-gray-600">{subheading}</p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 shadow-sm transition hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-1">
                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Rate the session</p>
                    <p className="text-xs text-gray-500">{rating ? `${rating}/5` : ""}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      const active = value <= visibleRating;
                      return (
                        <button
                          key={value}
                          type="button"
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(value)}
                          className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white/70 transition hover:scale-[1.02] hover:bg-white"
                          aria-label={`Rate ${value} star`}
                        >
                          <Star
                            className={`h-5 w-5 transition ${
                              active ? "fill-amber-400 text-amber-500" : "text-gray-400"
                            } group-hover:fill-amber-300 group-hover:text-amber-500`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                    <label className="text-sm font-semibold text-gray-800">Mood after session</label>
                    <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                      {moods.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-gray-800">Would you recommend?</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRecommend(true)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                          recommend
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecommend(false)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                          !recommend
                            ? "border-rose-200 bg-rose-50 text-rose-700"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        No
                      </button>
                    </div>
                  </div>
                </div>

                {/* Emotion Tracking Section */}
                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Emotional Check-in</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">How did you feel BEFORE meditation?</label>
                      <select
                        value={preMeditationEmotion}
                        onChange={(e) => setPreMeditationEmotion(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                      >
                        {emotions.map((emotion) => (
                          <option key={emotion.value} value={emotion.value}>
                            {emotion.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">How did you feel AFTER meditation?</label>
                      <select
                        value={postMeditationEmotion}
                        onChange={(e) => setPostMeditationEmotion(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                      >
                        {emotions.map((emotion) => (
                          <option key={emotion.value} value={emotion.value}>
                            {emotion.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">Overall day mood</label>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {dayMoods.map((mood) => (
                        <button
                          key={mood.value}
                          type="button"
                          onClick={() => setDayMood(mood.value)}
                          className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-xs transition ${
                            dayMood === mood.value
                              ? "border-purple-200 bg-purple-50 text-purple-700"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-lg">{mood.emoji}</span>
                          <span>{mood.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Level Tracking Section */}
                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Personal Assessment (1-10)</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Stress Level</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={stressLevel}
                          onChange={(e) => setStressLevel(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{stressLevel}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Energy Level</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={energyLevel}
                          onChange={(e) => setEnergyLevel(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{energyLevel}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Focus Level</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={focusLevel}
                          onChange={(e) => setFocusLevel(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{focusLevel}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Sleep Quality</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={sleepQuality}
                          onChange={(e) => setSleepQuality(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{sleepQuality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotional Context Section */}
                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Additional Emotional Context (0-10)</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Work Stress</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={emotionalContext.workStress}
                          onChange={(e) => setEmotionalContext(prev => ({ ...prev, workStress: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{emotionalContext.workStress}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Personal Stress</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={emotionalContext.personalStress}
                          onChange={(e) => setEmotionalContext(prev => ({ ...prev, personalStress: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{emotionalContext.personalStress}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Physical Wellbeing</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={emotionalContext.physicalWellbeing}
                          onChange={(e) => setEmotionalContext(prev => ({ ...prev, physicalWellbeing: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{emotionalContext.physicalWellbeing}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Mental Clarity</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={emotionalContext.mentalClarity}
                          onChange={(e) => setEmotionalContext(prev => ({ ...prev, mentalClarity: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-800 w-8 text-center">{emotionalContext.mentalClarity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Quick highlights</p>
                    <p className="text-xs text-gray-500">Pick up to 6</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chipOptions.map((chip) => {
                      const active = chips.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleChip(chip)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            active
                              ? "border-purple-200 bg-purple-50 text-purple-700"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-800">Write a message</label>
                    <p className="text-xs text-gray-500">{message.length}/300</p>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                    rows={4}
                    placeholder="Tell us what you liked, and what we can improve…"
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                  />
                  {error ? <p className="mt-2 text-sm font-medium text-rose-600">{error}</p> : null}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    disabled={submitting}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                      submitting
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }`}
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Submitting…" : "Submit Feedback"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FeedbackModal;

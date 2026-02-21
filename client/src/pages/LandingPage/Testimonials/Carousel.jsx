import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import "./carousel.css";

gsap.registerPlugin(ScrollTrigger, Draggable);

// 🔥 Sample text data
const items = [
  "Focus on Growth 🚀",
  "Stay Consistent 💪",
  "Build Projects 💻",
  "Learn Daily 📚",
  "Think Big 🌍",
  "Stay Positive ✨",
  "Keep Improving 🔥",
];

export default function Carousel() {
  const galleryRef = useRef();
  const cardsRef = useRef();
  const proxyRef = useRef();

  useEffect(() => {
    let iteration = 0;

    const cards = gsap.utils.toArray(".card");

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);

    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
        }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none" },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
      onUpdate: () => {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "+=3000",
      pin: galleryRef.current,
      onUpdate(self) {
        let scroll = self.scroll();

        if (scroll > self.end - 1) {
          wrap(1, 2);
        } else if (scroll < 1 && self.direction < 0) {
          wrap(-1, self.end - 2);
        } else {
          scrub.vars.offset =
            (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        }
      },
    });

    const progressToScroll = (progress) =>
      gsap.utils.clamp(
        1,
        trigger.end - 1,
        gsap.utils.wrap(0, 1, progress) * trigger.end
      );

    const wrap = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      trigger.scroll(scrollTo);
      trigger.update();
    };

    function scrollToOffset(offset) {
      let snappedTime = snapTime(offset);
      let progress =
        (snappedTime - seamlessLoop.duration() * iteration) /
        seamlessLoop.duration();

      let scroll = progressToScroll(progress);

      if (progress >= 1 || progress < 0) {
        return wrap(Math.floor(progress), scroll);
      }

      trigger.scroll(scroll);
    }

    document.querySelector(".next").onclick = () =>
      scrollToOffset(scrub.vars.offset + spacing);
    document.querySelector(".prev").onclick = () =>
      scrollToOffset(scrub.vars.offset - spacing);

    Draggable.create(proxyRef.current, {
      type: "x",
      trigger: cardsRef.current,
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        scrub.vars.offset =
          this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd() {
        scrollToOffset(scrub.vars.offset);
      },
    });

    ScrollTrigger.addEventListener("scrollEnd", () =>
      scrollToOffset(scrub.vars.offset)
    );
  }, []);

  return (
    <div className="gallery" ref={galleryRef}>
      <ul className="cards" ref={cardsRef}>
        {[...items, ...items].map((text, i) => (
          <li key={i} className="card">
            {text}
          </li>
        ))}
      </ul>

      <div className="actions">
        <button className="prev">Prev</button>
        <button className="next">Next</button>
      </div>

      <div className="drag-proxy" ref={proxyRef}></div>
    </div>
  );
}

// same function
function buildSeamlessLoop(items, spacing, animateFunc) {
  let overlap = Math.ceil(1 / spacing);
  let startTime = items.length * spacing + 0.5;
  let loopTime = (items.length + overlap) * spacing + 1;

  let rawSequence = gsap.timeline({ paused: true });
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });

  let l = items.length + overlap * 2;

  for (let i = 0; i < l; i++) {
    let index = i % items.length;
    let time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
    if (i <= items.length) seamlessLoop.add("label" + i, time);
  }

  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        ease: "none",
      }
    );

  return seamlessLoop;
}
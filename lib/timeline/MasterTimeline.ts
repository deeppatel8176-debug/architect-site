import { gsap } from "@/lib/gsap";

class MasterTimeline {
  private timeline: gsap.core.Timeline;

  constructor() {
    this.timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.inOut",
      },
    });
  }

  add(animation: gsap.core.Tween | gsap.core.Timeline) {
    this.timeline.add(animation);
  }

  play() {
    this.timeline.play();
  }

  pause() {
    this.timeline.pause();
  }

  restart() {
    this.timeline.restart();
  }

  kill() {
    this.timeline.kill();
  }

  get instance() {
    return this.timeline;
  }
}

export const masterTimeline = new MasterTimeline();
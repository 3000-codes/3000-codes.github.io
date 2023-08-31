"use client";
import { FC, useRef, useState, useEffect } from "react";
// import { useSize } from "ahooks";
import { initCanvas, polar2cart, Fn, Controls } from "./tools";

const mask = "radial-gradient(circle, transparent, black)";
const { random } = Math;
let isActive = false;
const setIsActive = (active: boolean) => (isActive = active);

const Texture: FC = () => {
  const el = useRef<HTMLCanvasElement>(null);

  // { width: 964, height: 520 }
  // useSize(document.body)!;

  useEffect(() => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const canvas = el.current!;
    const { ctx } = initCanvas(canvas, size.width, size.height);
    const { width, height } = canvas;
    let steps: Fn[] = [];
    let prevSteps: Fn[] = [];

    const step = (
      x: number,
      y: number,
      rad: number,
      counter: { value: number } = { value: 0 }
    ) => {
      const r15 = Math.PI / 12;
      const length = random() * 6;
      const MIN_BRANCH = 30;
      const [nx, ny] = polar2cart(x, y, length, rad);

      counter.value += 1;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      // out of bounds
      if (
        nx < -100 ||
        nx > size.width + 100 ||
        ny < -100 ||
        ny > size.height + 100
      )
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      // left branch
      if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));

      // right branch
      if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
    };

    let lastTime = performance.now();
    const interval = 1000 / 40; // 50fps

    let previousFrameTimestamp = 0;
    let rafId: null | number = null;
    let controls: Controls;

    const frame = () => {
      if (performance.now() - lastTime < interval) return;
      console.log("i am working");

      prevSteps = steps;
      steps = [];
      lastTime = performance.now();

      if (!prevSteps.length) {
        controls?.pause();
      }

      // Execute all the steps from the previous frame
      prevSteps.forEach((i) => {
        console.log(i);

        // 50% chance to keep the step for the next frame, to create a more organic look
        if (random() < 0.5) steps.push(i);
        else i();
      });
    };

    const loop = (timestamp: DOMHighResTimeStamp) => {
      console.log("loop");
      if (!isActive) return;
      console.log("loop");
      frame();
      previousFrameTimestamp = timestamp;
      rafId = requestAnimationFrame(loop);
    };
    const resume = () => {
      console.log("resume");

      if (!isActive) {
        setIsActive(true);
        rafId = requestAnimationFrame(loop);
      }
    };
    const pause = () => {
      console.log("pause");

      setIsActive(false);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
    controls = {
      resume,
      pause,
    };

    const randomMiddle: () => number = () => random() * 0.6 + 0.2;
    const r180 = Math.PI;
    const r90 = Math.PI / 2;
    (function () {
      controls.pause();
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#88888825";
      prevSteps = [];
      steps = [
        () => step(randomMiddle() * size.width, -5, r90),
        () => step(randomMiddle() * size.width, size.height + 5, -r90),
        () => step(-5, randomMiddle() * size.height, 0),
        () => step(size.width + 5, randomMiddle() * size.height, r180),
      ];
      if (size.width < 500) steps = steps.slice(0, 2);
      controls.resume();
    })();
    return () => {
      controls.pause();
    };
  }, []);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden z-[-1] overflow-hidden"
      style={{ WebkitMaskImage: mask }}
    >
      <canvas ref={el} width="400" height="400" />
    </div>
  );
};

export default Texture;

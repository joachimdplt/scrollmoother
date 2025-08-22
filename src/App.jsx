import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

function App() {
  const main = useRef();
  const smoother = useRef();

  const scrollTo = () => {
    smoother.current.scrollTo('.box-c', true, 'center center');
  };

  useGSAP(
    () => {
      // create the smooth scroller FIRST!
      smoother.current = ScrollSmoother.create({
        smooth: 2, // seconds it takes to "catch up" to native scroll position
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
        normalizeScroll: true
      });
      
      // pin box-c when it reaches the center of the viewport, for 300px
      ScrollTrigger.create({
        trigger: '.box-c',
        pin: true,
        start: 'center center',
        end: '+=300',
        markers: true,
      });
    },
    { scope: main }
  );

  return (
    <>
      <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
          <header className="header">
            <h1 className="title">ScrollSmoother</h1>
            <button className="button" onClick={scrollTo}>
              Jump to C
            </button>
          </header>
          <div className="box box-a gradient-green" data-speed="clamp(0.5)">
            a
          </div>
          <div className="box box-b gradient-purple" data-speed="clamp(0.8)">
            b
          </div>
          <div className="box box-c gradient-orange" data-speed="1.5">
            c
          </div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
}

export default App;

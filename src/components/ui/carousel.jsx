import React from "react";
import { useState, useEffect, useRef } from "react";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];


export function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
        2500
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="mx-auto overflow-hidden max-w-xl">
      <div
        className="whitespace-nowrap transition-transform ease-in-out duration-1000"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((backgroundColor, index) => (
          <div
            className="inline-block h-48 w-full"
            key={index}
            style={{ backgroundColor }}
          ></div>
        ))}
      </div>

      <div className="text-center mt-4">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`inline-block h-3 w-3 rounded-full cursor-pointer mx-1 ${index === idx ? "bg-purple-700" : "bg-gray-400"}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const images = [
  "/KakaoTalk_20250913_091937872_03.jpg",
  "/KakaoTalk_20250913_091937872_07.jpg",
  "/KakaoTalk_20250913_091937872_08.jpg",
  "/KakaoTalk_20250913_091937872_14.jpg",
  "/KakaoTalk_20250913_091947659 (1).jpg",
  "/KakaoTalk_20250913_091947659_01 (1).jpg",
  "/KakaoTalk_20250913_091947659_05 (2).jpg",
  "/KakaoTalk_20251212_114026679.jpg",
  "/KakaoTalk_20251212_114038054.jpg",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full bg-space-black py-24">
      <div className="relative grid min-h-[600px] grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-space-black">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-1">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "24rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={src}
                      alt={`Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;

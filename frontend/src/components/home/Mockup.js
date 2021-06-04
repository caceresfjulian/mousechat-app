import React from "react";
import mockup from "./web_mockup_compressed.webp";

export default function Mockup() {
  return (
    <img
      src={mockup}
      style={{ width: "100%", overflow: "hidden" }}
      alt="preview"
    />
  );
}

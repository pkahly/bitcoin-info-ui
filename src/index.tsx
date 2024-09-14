import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Price from "./components/Price.tsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Price />
);
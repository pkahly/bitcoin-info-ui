import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import FuctionSelector from "./components/FunctionSelector.tsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <FuctionSelector />
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import KnowledgeBase from "./KnowledgeBase";
import MarkdownReader from "./MarkdownReader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="bg-background text-foreground dark:bg-foreground dark:text-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kb" element={<KnowledgeBase />} />
          <Route path="/read/:filename" element={<MarkdownReader />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);

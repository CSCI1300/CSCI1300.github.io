import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Csci1300Page from "./pages/Csci1300Page.jsx";
import HwMarkdownPage from "./pages/HwMarkdownPage.jsx";

function parseHwNumOnly(raw) {
  if (raw == null || String(raw).trim() === "") return null;
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 1 || n > 99) return null;
  if (String(n) !== String(raw).trim()) return null;
  return n;
}

/** Old URLs `/hw/3/a` or `/hw/3/b` now redirect to single handout `/hw/3` */
function HwLegacyPartRedirect() {
  const { hwNum } = useParams();
  const n = parseHwNumOnly(hwNum);
  if (n == null) return <Navigate to="/" replace />;
  return <Navigate to={`/hw/${n}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Csci1300Page />} />
      <Route path="/project" element={<HwMarkdownPage project />} />
      <Route path="/project/checkpoint/:checkpointNum" element={<HwMarkdownPage projectCheckpoint />} />
      <Route path="/hw/:hwNum" element={<HwMarkdownPage />} />
      <Route path="/hw/:hwNum/:part" element={<HwLegacyPartRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

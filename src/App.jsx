import React, { useMemo } from "react";
import {
  Root,
  Pages,
  Page,
  CanvasLayer,
  TextLayer,
  AnnotationLayer
} from "@anaralabs/lector";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function readSrcParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("src") || "";
}

export default function App() {
  const srcRaw = readSrcParam();

  const src = useMemo(() => {
    try {
      return srcRaw ? decodeURIComponent(srcRaw) : "";
    } catch {
      return srcRaw;
    }
  }, [srcRaw]);

  if (!src) {
    return (
      <div style={{ padding: 16, fontFamily: "system-ui" }}>
        Missing <code>?src=</code> query param.
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff" }}>
      <Root source={src}>
        <Pages style={{ padding: 16 }}>
          <Page>
            <CanvasLayer />
            <TextLayer />
            <AnnotationLayer />
          </Page>
        </Pages>
      </Root>
    </div>
  );
}

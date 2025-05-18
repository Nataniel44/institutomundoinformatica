// app/class/page.tsx o una ruta similar

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReactPlayer from "react-player";

// Config PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Importa TinyMCE dinámicamente sin SSR
const TinyEditor = dynamic(() => import("@/components/layout/TinyEditor"), {
  ssr: false,
});

export default function ClassPage() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-screen bg-gray-50">
      {/* Editor de Word */}
      <div className="h-[80vh] border rounded-lg shadow-md bg-white p-2 overflow-hidden">
        <h2 className="text-xl font-bold mb-2">Editor de Documento</h2>
        <TinyEditor />
      </div>

      {/* Multimedia: Video y PDF */}
      <div className="flex flex-col gap-4 h-[80vh] overflow-y-auto">
        {/* Video */}
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            controls
            width="100%"
            height="100%"
          />
        </div>

        {/* PDF */}
        <div className="border rounded-lg p-4 bg-white shadow-md">
          <h3 className="font-semibold text-lg mb-2">PDF de Apuntes</h3>
          <Document
            file="/ejemplo.pdf" // Asegurate de poner el archivo en public/
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

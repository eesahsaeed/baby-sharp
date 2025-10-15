
import { useState } from "react";
import Masonry from "react-masonry-css";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

// Proper local worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function CredentialsPage({ credentials = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const isPdf = (src = "") =>
    src.toLowerCase().endsWith(".pdf") || src.includes("application/pdf");

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => {
    setSelectedIndex(null);
    setNumPages(null);
  };

  const goNext = () =>
    setSelectedIndex((prev) => (prev + 1 < credentials.length ? prev + 1 : prev));
  const goPrev = () =>
    setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));

  const selected = selectedIndex !== null ? credentials[selectedIndex] : null;

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Downloadable Contents
      </Typography>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {credentials.map((file, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              mb: 2,
              backgroundColor: "background.paper",
              cursor: "pointer",
            }}
            onClick={() => openModal(index)}
          >
            <Box
              sx={{
                width: "100%",
                height: 220,
                bgcolor: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {isPdf(file.src) ? (
                <Document file={file.src} loading={null} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                  <Page
                    pageNumber={1}
                    width={250}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </Document>
              ) : (
                <img
                  src={file.src}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>

            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {file.name}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                href={file.src}
                download
                fullWidth
                variant="contained"
                color="secondary"
                onClick={(e) => e.stopPropagation()}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>

      {/* Modal Preview with scrollable PDF */}
      <Modal open={!!selected} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#000",
            borderRadius: 2,
            p: 2,
            outline: "none",
            width: "90%",
            maxWidth: 900,
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {selected && (
            <>
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  overflowY: "auto",
                  mb: 2,
                  bgcolor: "#000",
                }}
              >
                {isPdf(selected.src) ? (
                  <Document
                    file={selected.src}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={<Typography color="white">Loading PDF...</Typography>}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={800}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                    ))}
                  </Document>
                ) : (
                  <img
                    src={selected.src}
                    alt={selected.name}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      maxHeight: "75vh",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>

              <Typography mt={1} variant="h6" color="white">
                {selected.name}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={goPrev}
                  disabled={selectedIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={goNext}
                  disabled={selectedIndex === credentials.length - 1}
                >
                  Next
                </Button>
                <Button
                  href={selected.src}
                  download
                  variant="contained"
                  color="secondary"
                >
                  Download
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

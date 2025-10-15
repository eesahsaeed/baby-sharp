
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DownloadIcon from "@mui/icons-material/Download";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";

export default function GalleryPage({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const currentItem = items[currentIndex];

  return (
    <>
      {/* ---------- Masonry Grid ---------- */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              mb: 2,
              backgroundColor: "background.paper",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardMedia
              component={item.type === "video" ? "video" : "img"}
              src={item.src}
              image={item.type === "img" ? item.src : undefined}
              alt={item.name}
              controls={false}
              sx={{
                borderRadius: "8px",
                height: 220,
                objectFit: "cover",
                backgroundColor: "#000",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(index)}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {item.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href={item.src}
                download={`${item.name}.${item.type === "video" ? "mp4" : "jpg"}`}
                fullWidth
                variant="contained"
                color={item.type === "video" ? "primary" : "secondary"}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>

      {/* ---------- Modal Preview ---------- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.95)",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          sx={{
            position: "relative",
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            backgroundColor: "#000",
          }}
        >
          {/* Close */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              zIndex: 3,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Navigation Buttons */}
          {items.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 16,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 16,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            {open && currentItem && (
              <motion.div
                key={currentItem.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {currentItem.type === "video" ? (
                  <video
                    src={currentItem.src}
                    controls
                    autoPlay
                    style={{
                      maxHeight: "80vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <img
                    src={currentItem.src}
                    alt={currentItem.name}
                    style={{
                      maxHeight: "80vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Download Button Inside Modal */}
          {currentItem && (
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 5,
              }}
            >
              <Button
                href={currentItem.src}
                download={`${currentItem.name}.${currentItem.type === "video" ? "mp4" : "jpg"}`}
                startIcon={<DownloadIcon />}
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 8, px: 3, py: 1, fontWeight: 600 }}
              >
                Download {currentItem.type === "video" ? "Video" : "Image"}
              </Button>
            </Box>
          )}
        </DialogContent>

        {currentItem && (
          <Typography
            variant="subtitle1"
            textAlign="center"
            fontWeight={600}
            sx={{ color: "#fff", py: 2 }}
          >
            {currentItem.name}
          </Typography>
        )}
      </Dialog>
    </>
  );
}


import { useState } from "react";
import Masonry from "react-masonry-css";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Box,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PicturesPage({ pictures = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const openModal = (index) => {
    setIsLoading(true);
    setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  const goPrevious = () => {
    setIsLoading(true);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : pictures.length - 1));
  };

  const goNext = () => {
    setIsLoading(true);
    setSelectedIndex((prev) => (prev < pictures.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={700}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Pictures
      </Typography>

      {/* Masonry grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pictures.map((img, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              mb: 2
            }}
          >
            <CardMedia
              component="img"
              image={img.src}
              alt={img.name}
              onClick={() => openModal(index)}
              sx={{
                borderRadius: "8px",
                height: 220,
                cursor: "pointer",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {img.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href={img.src}
                download={`${img.name}.jpg`}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>

      {/* ---------- Modal Preview ---------- */}
      <Modal
        open={selectedIndex !== null}
        onClose={closeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#000",
            borderRadius: 2,
            p: 2,
            outline: "none",
            width: isMobile ? "90vw" : "80vw",
            height: isMobile ? "75vh" : "80vh",
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 10,
            marginTop: 10
          }}
        >
          {selectedIndex !== null && (
            <>
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={goPrevious}
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: 8,
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                {isLoading && (
                  <CircularProgress
                    sx={{ color: "white", position: "absolute" }}
                  />
                )}

                <img
                  src={pictures[selectedIndex].src}
                  alt={pictures[selectedIndex].name}
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 8,
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.4s ease-in-out",
                  }}
                />

                <IconButton
                  onClick={goNext}
                  sx={{
                    color: "white",
                    position: "absolute",
                    right: 8,
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  pt: 1,
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Typography variant="h6" color="white">
                  {pictures[selectedIndex].name}
                </Typography>
                <Button
                  href={pictures[selectedIndex].src}
                  download={`${pictures[selectedIndex].name}.jpg`}
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: 1,
                    width: isMobile ? "100%" : "auto",
                  }}
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

"use client";
import React, { useState } from "react";
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
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PicturesPage({ pictures = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const goPrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : pictures.length - 1));
  };

  const goNext = () => {
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
              mb: 2,
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
              }}
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
      <Modal open={selectedIndex !== null} onClose={closeModal}>
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
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedIndex !== null && (
            <>
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                <IconButton onClick={goPrevious} sx={{ color: "white" }}>
                  <ArrowBackIosIcon />
                </IconButton>

                <img
                  src={pictures[selectedIndex].src}
                  alt={pictures[selectedIndex].name}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    display: "block",
                    maxHeight: "75vh",
                    objectFit: "contain",
                  }}
                />

                <IconButton onClick={goNext} sx={{ color: "white" }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>

              <Typography mt={2} variant="h6" color="white">
                {pictures[selectedIndex].name}
              </Typography>
              <Button
                href={pictures[selectedIndex].src}
                download={`${pictures[selectedIndex].name}.jpg`}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Download
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

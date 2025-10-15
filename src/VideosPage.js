import React from "react";
import Masonry from "react-masonry-css";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export default function VideosPage({ videos = [] }) {
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

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
        {videos.map((video, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              mb: 2,
            }}
          >
            <CardMedia
              component="video"
              src={video.src}
              controls
              sx={{
                width: "100%",
                height: 220,
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {video.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href={video.src}
                download={`${video.name}.mp4`}
                fullWidth
                variant="contained"
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>
    </>
  );
}

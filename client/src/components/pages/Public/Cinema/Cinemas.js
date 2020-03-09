import React from "react";
import Grid from "@material-ui/core/Grid";
import "../../../../assets/css/image-gralley.css";
import ImageGallery from 'react-image-gallery';

const Cinemas = () => {
    return (
        <Grid container justify={"center"} alignItems={"center"}>
            <div style={{
                height: 450,
                marginTop: 80,
            }}>
                <ImageGallery
                    items={[]}
                    showThumbnails={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={false}
                />
            </div>
        </Grid>
    )
};

export default Cinemas;
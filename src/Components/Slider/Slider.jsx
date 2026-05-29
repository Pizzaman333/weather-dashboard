import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./Slider.module.scss";
import { Container } from "../Container/Container";

const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
const TERM = "weather";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${TERM}&image_type=photo&per_page=10&page=${pageNum}`
      );

      if (pageNum === 1) {
        setImages(response.data.hits);
        setActiveIndex(2);
      } else {
        setImages((prev) => [...prev, ...response.data.hits]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const handleNext = useCallback(() => {
    if (activeIndex >= images.length - 4 && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage);
    }

    if (activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex, images, loading, page, fetchImages]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const getStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    let style = {
      opacity: 0,
      transform: "translateX(0) scale(0)",
      zIndex: -1,
      visibility: "hidden",
      transition: "all 0.5s ease-out",
    };

    if (absOffset > 3) return style;

    style.visibility = "visible";

    if (offset === 0) {
      style = {
        ...style,
        opacity: 1,
        transform: "translateX(0) scale(1.2)",
        zIndex: 10,
        filter: "brightness(1)",
      };
    } else if (absOffset === 1) {
      style = {
        ...style,
        opacity: 1,
        transform: `translateX(${offset * 80}%) scale(0.85)`,
        zIndex: 5,
        filter: "brightness(0.7)",
      };
    } else if (absOffset === 2) {
      style = {
        ...style,
        opacity: 0.5,
        transform: `translateX(${offset * 70}%) scale(0.65)`,
        zIndex: 1,
        filter: "brightness(0.5)",
      };
    } else if (absOffset === 3) {
      style = {
        ...style,
        opacity: 0,
        transform: `translateX(${offset * 100}%) scale(0.01)`,
        zIndex: 1,
        filter: "brightness(0.5)",
      };
    }

    return style;
  };

  if (images.length === 0 && loading)
    return <div className={styles["slider__loading"]}>Loading...</div>;

  return (
    <div className={styles.slider} id="slider-secion">
      <Container>
        <div className={styles.slider__container}>
          <h1 className={styles["slider__title"]}>
            Explore some beautiful images
          </h1>

          <div className={styles["slider__track"]}>
            {images.map((img, index) => {
              if (Math.abs(activeIndex - index) > 3) return null;

              return (
                <div
                  key={`${img.id}-${index}`}
                  className={styles["slider__card"]}
                  style={getStyle(index)}
                >
                  <img src={img.webformatURL} alt={img.tags} />
                  <div className={styles["slider__caption"]}>
                    <p>
                      #{index} {img.tags.split(",")[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles["slider__controls"]}>
            <button
              onClick={handlePrev}
              className={styles["slider__arrow-btn"]}
              disabled={activeIndex === 0}
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className={styles["slider__arrow-btn"]}
            >
              ❯
            </button>
          </div>

          <div className={styles["slider__debug"]}>
            Showing index {activeIndex} of {images.length} loaded
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Slider;

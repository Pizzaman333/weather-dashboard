import React, { useState, useEffect, useRef } from "react";
import styles from "./News.module.scss";
import { Container } from "../Container/Container";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1); // Guardian pagination starts at 1
  const [loading, setLoading] = useState(false);

  // Prevent duplicate fetches for the same page
  const loadedPages = useRef(new Set());

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    if (loadedPages.current.has(page)) return;
    loadedPages.current.add(page);

    const fetchNews = async () => {
      setLoading(true);
      try {
        // q=weather matches your app context better than "dogs"
        // show-fields=thumbnail is required to get the image
        const url = `https://content.guardianapis.com/search?q=weather&page=${page}&page-size=4&show-fields=thumbnail&api-key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        // The Guardian structure: { response: { status: "ok", results: [...] } }
        if (data.response && data.response.status === "ok") {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...data.response.results,
          ]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, API_KEY]);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className={styles["news"]} id="news-section">
      <Container>
        <h1 className={styles["news__title"]}>Relevant news</h1>

        <div className={styles["news__grid"]}>
          {articles.map((article, index) => (
            <div
              // Use ID or URL + index for unique key
              key={`${article.id}-${index}`}
              className={styles["news__card"]}
            >
              <img
                // Guardian puts images inside "fields"
                src={
                  article.fields?.thumbnail ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={article.webTitle}
                className={styles["news__image"]}
              />

              <h3 className={styles["news__articletitle"]}>
                <a
                  href={article.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["news__link"]}
                >
                  {article.webTitle}
                </a>
              </h3>
            </div>
          ))}
        </div>

        <button
          onClick={handleSeeMore}
          className={styles["news__button"]}
          disabled={loading}
        >
          {loading ? "Loading..." : "See more"}
        </button>
      </Container>
    </section>
  );
};

export default News;

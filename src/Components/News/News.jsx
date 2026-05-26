import React, { useState, useEffect, useRef } from "react";
import styles from "./News.module.scss";
import { Container } from "../Container/Container";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(true);

  const loadedPages = useRef(new Set());

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    if (loadedPages.current.has(page)) return;
    loadedPages.current.add(page);

    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `https://newsapi.org/v2/everything?q=dogs&pageSize=4&page=${page}&sortBy=popularity&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
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
    <section className={styles["news"]}>
      <Container>
        <h1 className={styles["news__title"]}>Relevant news</h1>
        <div className={styles["news__grid"]}>
          {articles.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className={styles["news__card"]}
            >
              <img
                src={
                  article.urlToImage ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={article.title}
                className={styles["news__image"]}
              />

              <h3 className={styles["news__articletitle"]}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["news__link"]}
                >
                  {article.title}
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

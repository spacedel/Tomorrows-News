import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${apiKey}`
        );
        setArticles(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`
        );
        setArticles(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        New York Times Top Story News
      </Typography>
      {articles.length ? (
        articles.map((article, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" color="primary">
                {article.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {article.abstract}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h6" align="center">
          Loading news...
        </Typography>
      )}
    </Container>
  );
};

export default App;

import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/map/${card.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={card.imageUrl}
          alt={card.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
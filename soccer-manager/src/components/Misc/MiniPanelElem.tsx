import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
  imageSrc: string;
  desc: string;
  url: string;
}

function MiniPanelElem({ imageSrc, desc, url }: IProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <Card
      sx={{
        margin: "1rem",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          image={imageSrc}
          sx={{
            height: "150px",
          }}
        ></CardMedia>
        <CardContent>
          <Typography>{desc}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MiniPanelElem;

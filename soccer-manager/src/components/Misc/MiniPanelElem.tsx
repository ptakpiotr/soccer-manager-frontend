import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface IProps {
  imageSrc: string;
  desc: string;
}

function MiniPanelElem({ imageSrc, desc }: IProps) {
  return (
    <Card
      sx={{
        margin: "1rem",
      }}
    >
      <CardActionArea>
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

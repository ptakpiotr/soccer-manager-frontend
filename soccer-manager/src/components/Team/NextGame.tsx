import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function NextGame() {
  return (
    <Grid container>
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardMedia
                image="https://a.espncdn.com/i/teamlogos/soccer/500/19246.png"
                sx={{
                  height: "150px",
                }}
              />
              <Typography>My team</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <CardMedia
                image="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20300.png&scale=crop&cquality=40&location=origin"
                sx={{
                  height: "150px",
                }}
              />
              <Typography>Opponent</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Typography>25.12.2190</Typography>
      </Grid>
    </Grid>
  );
}

export default NextGame;

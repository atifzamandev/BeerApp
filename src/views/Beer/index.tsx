import { useEffect, useState } from "react"
import { Beer as IBeer } from "../../types"
import { fetchData } from "./utils"
import { useParams, useNavigate } from "react-router-dom"
import BeerDetails from "./BeerDetails"
import { Button, Grid, Typography } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import GoogleMapContainer from "./GoogleMapContainer"

const Beer = () => {
  const { id } = useParams()
  const [beer, setBeer] = useState<IBeer>()
  const [favoriteBeerIds, setFavoriteBeerIds] = useState<string[]>([])
  const navigate = useNavigate()

  const handleAddToLocalStore = () => {
    if (beer?.id && !favoriteBeerIds.includes(beer.id)) {
      setFavoriteBeerIds((prevId) => [...prevId, beer.id])
      localStorage.setItem(
        "beerId",
        JSON.stringify([...favoriteBeerIds, beer.id])
      )
    } else {
      const favId = favoriteBeerIds.filter((fav) => fav !== beer?.id)
      setFavoriteBeerIds(favId)
      localStorage.setItem("beerId", JSON.stringify(favId))
    }
  }
  useEffect(() => {
    const storedBeerId = localStorage.getItem("beerId")
    if (storedBeerId) {
      setFavoriteBeerIds(JSON.parse(storedBeerId))
    }
  }, [])

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id])

  return (
    <article>
      <section>
        <header>
          <Typography variant="h3" ml={10}>
            {beer?.name}
          </Typography>
        </header>
        <main>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <BeerDetails beer={beer} />
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/")}
                    sx={{ mt: 2 }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to home
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToLocalStore}
                    sx={{ mt: 2 }}
                    startIcon={
                      favoriteBeerIds.some((id) => id === beer?.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                  >
                    {favoriteBeerIds.some((id) => id === beer?.id)
                      ? "Remove favorites"
                      : "Add to favorites"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <GoogleMapContainer beer={beer} />
            </Grid>
          </Grid>
        </main>
      </section>
    </article>
  )
}

export default Beer

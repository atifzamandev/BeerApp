import React, { ReactNode } from "react"
import { Beer } from "../../types"
import Paper from "@mui/material/Paper"
import { Box, Grid, Link, Typography } from "@mui/material"
import StoreIcon from "@mui/icons-material/Store"
import PhoneIcon from "@mui/icons-material/Phone"
import LinkIcon from "@mui/icons-material/Link"
import PlaceIcon from "@mui/icons-material/Place"
import { green, orange, red } from "@mui/material/colors"

interface BeerInfo {
  icon: JSX.Element
  title: string
  info: ReactNode
}

const BeerDetails = ({ beer }: { beer?: Beer }) => {
  const beerInfo: BeerInfo[] = [
    {
      icon: <StoreIcon sx={{ color: orange[800] }} />,
      title: "Type",
      info: beer?.brewery_type && (
        <Typography variant="body1">{beer?.brewery_type}</Typography>
      ),
    },
    {
      icon: <PhoneIcon sx={{ color: green[600] }} />,
      title: "Phone",
      info: beer?.phone && <Link href={`tel:${beer.phone}`}>{beer.phone}</Link>,
    },
    {
      icon: <LinkIcon color="primary" />,
      title: "Website",
      info: beer?.website_url && (
        <Link href={beer.website_url}>{beer.website_url}</Link>
      ),
    },
    {
      icon: <PlaceIcon sx={{ color: red[900] }} />,
      title: "Address",
      info: beer?.address_1 && (
        <>
          <Typography variant="body1">{beer?.street}</Typography>
          <Typography variant="body1">
            {beer?.city}, {beer?.state}, {beer?.postal_code}
          </Typography>
          <Typography variant="body1">{beer?.country}</Typography>
        </>
      ),
    },
  ]

  return (
    <Paper>
      <Box ml={1} mt={4}>
        {beerInfo.map(({ icon, title, info }) => (
            <Grid container key={title} spacing={4} mb={1}>
              <Grid item>{icon}</Grid>
              <Grid item xs={2}>
                {title}
              </Grid>
              <Grid item>{info}</Grid>
            </Grid>
          ))}
      </Box>
    </Paper>
  )
}

export default BeerDetails

import React from "react"
import { LatLngTuple } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Beer } from "../../types"
import style from "./GoogleMap.module.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Box, Paper, Typography } from "@mui/material"

const locationIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  shadowSize: [30, 65],
  iconAnchor: [12, 41],
  shadowAnchor: [7, 65],
})
const GoogleMapContainer = ({ beer }: { beer?: Beer }) => {
  if (!beer || !beer.latitude || !beer.longitude) return <div></div>

  const googleLatitude = parseFloat(beer?.latitude)
  const googleLongitude = parseFloat(beer?.longitude)

  const mapPosition: LatLngTuple = [googleLatitude, googleLongitude]

  return (
    <Paper>
      <Box>
        <Typography variant="h5" ml={2}>
          Find Direction
        </Typography>
      </Box>
      <div className={style.googleContaine}>
        <MapContainer
          className={style.leafletContainer}
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition} icon={locationIcon}>
            <Popup>
              <Typography variant="body1">
                {beer?.street}, {beer?.city}, {beer?.state}, {beer?.postal_code}
                , {beer?.country}
              </Typography>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Paper>
  )
}

export default GoogleMapContainer

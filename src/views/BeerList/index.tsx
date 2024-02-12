import { useEffect, useState } from "react"
import { Beer } from "../../types"
import { fetchData } from "./utils"
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import BeerTable from "./BeerTable"

const BeerList = () => {

  const [beerList, setBeerList] = useState<Array<Beer>>([])
  const [nameSearch, setNameSearch] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("All")
  const [filteredBeerList, setFilteredBeerList] =
    useState<Array<Beer>>(beerList)

  const uniqueBeerTypes = beerList
    .map((beer) => beer.brewery_type)
    .filter((type, index, arrType) => arrType.indexOf(type) === index)

  const handleFilterList = (e: SelectChangeEvent<string>) => {
    const selectedType = e.target.value
    setFilterType(selectedType)
    
    if (selectedType === "") {
      setFilteredBeerList(beerList)
    } else {
      const filteredBeers = beerList.filter(
        (beerSelect) => beerSelect.brewery_type === selectedType
      )
      setFilteredBeerList(filteredBeers)
    }
  }

  useEffect(() => {
    setFilteredBeerList(beerList)
  }, [beerList])

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), [])

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Paper>
            <Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
              <Grid container spacing={2} m={1}>
                <Grid item xs={5} >
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setNameSearch(e.target.value)}
                  />
                </Grid>

                <Grid item xs={7}>
                  <FormControl sx={{ width: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={filterType}
                      label="Type"
                      defaultValue="All"
                      onChange={(event) => handleFilterList(event)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {uniqueBeerTypes.map((beerType) => (
                        <MenuItem key={beerType} value={beerType}>
                          {beerType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box>
                <BeerTable
                  beerList={filteredBeerList}
                  nameSearch={nameSearch}
                />
              </Box>
            </Box>
          </Paper>
        </main>
      </section>
    </article>
  )
}

export default BeerList

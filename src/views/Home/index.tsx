import { useEffect, useState } from "react"
import { fetchData} from "./utils"
import { getRandomBeerList } from '../../api';
import { Beer } from "../../types"
import { Link as RouterLink } from "react-router-dom"
import {
  Button,
  Checkbox,
  Paper,
  TextField,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
} from "@mui/material"
import styles from "./Home.module.css"
import { getBeer } from "../../api"
import handle from "../../utils/error"
import DeleteIcon from "@mui/icons-material/Delete"

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([])
  const [savedList, setSavedList] = useState<Array<Beer>>([])
  const [storeBeerId, setStoreBeerId] = useState<string[]>([])
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const storedBeerIds = localStorage.getItem("beerId")
    if (storedBeerIds) {
      const parsedBeerIds: string[] = JSON.parse(storedBeerIds)
      setStoreBeerId(parsedBeerIds)
    }
  }, [])

  useEffect(() => {
    const fetchAndAddBeers = async () => {
      const fetchedBeers: Beer[] = []
      for (const id of storeBeerId) {
        try {
          const response = await getBeer(id)
          fetchedBeers.push(response.data)
        } catch (error) {
          handle(error)
        }
      }
      setSavedList([...fetchedBeers])
    }

    fetchAndAddBeers()
  }, [storeBeerId])

  const handleDeleteItem = (id: string) => {
    const updatedList = savedList.filter((beer) => beer.id !== id)
    setSavedList(updatedList)
    const updatedBeerIds = storeBeerId.filter((beerId) => beerId !== id)
    localStorage.setItem("beerId", JSON.stringify(updatedBeerIds))
  }

  const handleDeleteAll = () => {
    setSavedList([])
    localStorage.setItem("beerId", JSON.stringify([]))
  }
  const handleReload =async()=>{
    const {data} = await getRandomBeerList(10);
    setBeerList(data)
  }
  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), [])
  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="contained" onClick={handleReload}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList
                  .filter((beerName) => {
                    return search.toLowerCase() === ""
                      ? beerName
                      : beerName.name.toLowerCase().includes(search)
                  })
                  .map((beer, index) => (
                    <li key={index.toString()}>
                      <Checkbox />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleDeleteAll}
                >
                  Remove all items
                </Button>
              </div>
              <List className={styles.list}>
                {savedList.map((beer, index) => (
                  <ListItem key={index.toString()}>
                    <ListItemIcon>
                      <Checkbox />
                    </ListItemIcon>
                    <ListItemButton>
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer?.name}
                      </Link>
                    </ListItemButton>
                    <ListItemIcon>
                      <IconButton
                        onClick={() => handleDeleteItem(beer.id)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </List>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  )
}

export default Home

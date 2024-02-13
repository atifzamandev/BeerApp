import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Beer } from "../../types"
import {
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"

const BeerTable = ({
  beerList,
  nameSearch,
}: {
  beerList: Array<Beer>
  nameSearch: string
}) => {
  const [filteredBeerList, setFilteredBeerList] = useState<Array<Beer>>([])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sorted, setSorted] = useState<{
    property: string
    descending: boolean
  }>({ property: "name", descending: false })

  const sortBeerList = (property: string) => {
    const sortedBeerList = [...beerList].sort((valueA, valueB) => {
      const resultA = (valueA as any)[property].toLowerCase()
      const resultB = (valueB as any)[property].toLowerCase()
      const sortOrder =
        sorted.property === property ? !sorted.descending : false
      if (resultA < resultB) return sortOrder ? 1 : -1
      if (resultA > resultB) return sortOrder ? -1 : 1
      return 0
    })
    return sortedBeerList
  }

  const handleSort = (property: string) => {
    setSorted({
      property,
      descending: sorted.property === property ? !sorted.descending : false,
    })
    const sortedBeerList = sortBeerList(property)
    setFilteredBeerList(sortedBeerList)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  useEffect(() => {
    const filteredList = beerList.filter((beer) =>
      beer.name.toLowerCase().includes(nameSearch.toLowerCase())
    )
    setFilteredBeerList(filteredList)
  }, [beerList, nameSearch])

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 300 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ paddingLeft: 4 }}
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sorted.property === "name" && (sorted.descending ? "▼" : "▲")}
              </TableCell>

              <TableCell onClick={() => handleSort("brewery_type")}>
                Type{" "}
                {sorted.property === "brewery_type" &&
                  (sorted.descending ? "▼" : "▲")}
              </TableCell>
              <TableCell onClick={() => handleSort("state")}>
                State{" "}
                {sorted.property === "state" && (sorted.descending ? "▼" : "▲")}
              </TableCell>
              <TableCell onClick={() => handleSort("country")}>
                Country{" "}
                {sorted.property === "country" &&
                  (sorted.descending ? "▼" : "▲")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBeerList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((beer) => (
                <TableRow
                  key={beer.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <ListItemButton
                      component={RouterLink}
                      to={`/beer/${beer?.id}`}
                    >
                      {beer?.name}
                    </ListItemButton>
                  </TableCell>
                  <TableCell>{beer?.brewery_type}</TableCell>
                  <TableCell>{beer?.state}</TableCell>
                  <TableCell>{beer?.country}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredBeerList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />
    </Paper>
  )
}

export default BeerTable

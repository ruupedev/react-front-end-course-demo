import { useState } from "react";
import ListItems from "./ListItems";
import { Box, TextField } from "@mui/material";

function SearchList({ data }) {
  const [searchWord, setSearchWord] = useState("");

  const filtered = data.filter((tavara) =>
    tavara.nimi.toUpperCase().includes(searchWord.toUpperCase()),
  );

  return (
    <>
      <Box
        component="form"
        sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center", pt: 3 }}
      >
        <TextField
          label="Haku"
          variant="outlined"
          size="small"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {searchWord && filtered.length === 0 ? (
          <p>Ei hakutuloksia</p>
        ) : (
          <ListItems data={filtered} />
        )}
      </Box>
    </>
  );
}

export default SearchList;

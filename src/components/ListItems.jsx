import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import SearchList from "./SearchList";
import AddItem from "./AddItem";
import ProductCard from "./ProductCard";

function ListItems({ data, toggleMyyty, editTavara, poistaTavara }) {
  const myynnissa = data.filter((tavara) => tavara.myyty === false);
  const myyty = data.filter((tavara) => tavara.myyty === true);

  const [value, setValue] = useState(0);

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <div>
      <Box sx={{ width: "100%"}}>
        <AppBar position="static">
          <Tabs
            value={value}
            textColor="inherit"
            indicatorColor="secondary"
            variant="fullWidth"
            onChange={(e, val) => handleChange(val)}
          >
            <Tab label="Myynnissä" />
            <Tab label="Myyty" />
          </Tabs>
        </AppBar>
        <Box>
          {value === 0 && <ProductCard data={myynnissa} toggleMyyty={toggleMyyty} editTavara={editTavara} poistaTavara={poistaTavara} />}
          {value === 1 && <ProductCard data={myyty} toggleMyyty={toggleMyyty} editTavara={editTavara} poistaTavara={poistaTavara} />}
        </Box>
      </Box>
    </div>
  );
}
export default ListItems;

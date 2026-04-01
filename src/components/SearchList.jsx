import { useState } from "react";
import ListItems from "./ListItems";
import ShowSearch from "./ShowSearch";

function SearchList({ data }) {
  const [searchWord, setSearchWord] = useState("");
  const [showList, setShowList] = useState("");

  const change = (e) => {
    setSearchWord(e.target.value);
  };

  const search = () => {
    let result = data.filter((tavara) =>
      tavara.nimi.toUpperCase().includes(searchWord.toUpperCase()),
    );

    let answer;

    if (result.length === 0) {
      answer = <p>Nothing found with this search</p>;
    } else {
      answer = <ShowSearch data={result} />;
    }

    setShowList(answer);
  };

  return (
    <>
      <form>
        <label>
          Haku
          <input
            type="text"
            name="searchWord"
            value={searchWord}
            onChange={(e) => change(e)}
          />
          &nbsp;
        </label>
        <input type="button" value="Hae" onClick={() => search()} />
      </form>

      {showList}
    </>
  );
}
export default SearchList;

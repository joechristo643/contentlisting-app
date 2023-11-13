import "./App.css";
import { IMG_BASE_URL } from "../constants/constants.js";
import GridView from "../GridView/GridView.js";
import { useState, useEffect, useRef } from "react";
import usePageNext from "../hooks/usePageNext.js";
import { useDispatch, useSelector } from "react-redux";
import { takeFetchContentData } from "../redux/actionCreator.js";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [gridData, setGridData] = useState([]);
  const { isNextPage, resetNextPage } = usePageNext();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const retrivedData = useSelector((state) => {
    return state.gridContent;
  });

  useEffect(() => {
    // if(retrivedData.pageNumber !== pageNumber){
    dispatch(takeFetchContentData(pageNumber));
    // }
  }, [pageNumber]);

  useEffect(() => {
    if (isNextPage && Object.values(retrivedData).length) {
      const currPage = pageNumber;
      const nextPage = currPage + 1;
      const pageSize = retrivedData?.pageSize;
      const totalItems = retrivedData?.totalItems;

      if (nextPage < Math.round(totalItems / pageSize) + 1) {
        setPageNumber(nextPage);
      }
    }
  }, [isNextPage]);
  useEffect(() => {
    if (!retrivedData.loading && retrivedData.content.length) {
      const content = retrivedData?.content;
      setGridData(content);
      resetNextPage();
    }
  }, [retrivedData]);

  useEffect(() => {
    if (isSearch) {
      //set focus to search input field
      inputRef?.current?.focus();
    }
    if (isSearch && searchText.length > 2) {
      const filteredData = gridData.filter((element) => {
        return element.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setGridData(filteredData);
      //scroll to top when showing search results
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    //reset grid data to initial contents
    if (!isSearch || searchText.length === 0) {
      if (retrivedData?.content.length) {
        setGridData(retrivedData?.content);
      }
    }
  }, [isSearch, searchText]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={`${IMG_BASE_URL}Back.png`}
          className="Back-logo"
          alt="back"
          onClick={() => {
            setIsSearch(false);
            setSearchText("");
          }}
        />
        {isSearch ? (
          <input
            className="Search-input"
            role="textbox"
            ref={inputRef}
            type="text"
            placeholder="Enter text to search"
            maxLength={50}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        ) : (
          <>
            <h1 className="App-header-title">{retrivedData?.title}</h1>
            <img
              src={`${IMG_BASE_URL}search.png`}
              className="Search-logo"
              alt="search"
              onClick={() => {
                setIsSearch(true);
              }}
            />
          </>
        )}
      </header>
      <main>
        {gridData.length === 0 || retrivedData.error ? (
          <p>No results found. Please try again</p>
        ) : (
          <GridView data={gridData} />
        )}
      </main>
    </div>
  );
}

export default App;

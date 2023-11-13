import { useState, useEffect } from "react";
  
  /**
* Custom hook for pagination based on scroll
* @return {Object} isNextPage, resetNextPage
*/

const usePageNext = () => {
  const [isNextPage, setNextPage] = useState(false);

  const resetNextPage = () => {
    setNextPage(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    const curElement = e.target.scrollingElement;
    const curScrollY = curElement.scrollTop;
    //when user scrolls more than half of page height
    if (curScrollY > 0.5 * curElement.scrollHeight) {
      setNextPage(true);
    }
  };

  return { isNextPage, resetNextPage };
};
export default usePageNext;

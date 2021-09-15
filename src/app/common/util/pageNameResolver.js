/* pageNameResolver.js */

// Helps to determine the current
//  page name based off the meta tag 'title'

const getCurrentPageName = () => {
  const currentPageWhole = document.getElementsByTagName('title')[0].text;
  if ( currentPageWhole.toLowerCase() === "unme" ) {
    return "";
  }
  else if ( currentPageWhole.toLowerCase().includes("unme - ") ) {
    const currentPage = currentPageWhole.substring("UnMe - ".length, currentPageWhole.length);
    return currentPage;
  }
  else {
    return currentPageWhole;
  }
};

export default getCurrentPageName;
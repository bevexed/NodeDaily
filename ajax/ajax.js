ajax = (url,callback) => {
  let xml = new XMLHttpRequest();
  xml.onreadystatechange = () => {
    if (xml.readyState === 4) {
      callback(xml.response)
    }
  };
  xml.open('get', url, true);
  xml.send(null);
};

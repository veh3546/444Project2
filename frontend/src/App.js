import React, { useState, useEffect } from "react";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
function App() {
 const [data, setData] = useState('');

  useEffect(() => {
    // Making a GET request to the Express backend
    instance.get('/api/message')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

   return (
  <div className="App">
    <h1>Backend Response:</h1>
    {/* If data is empty, it shows "No data yet" instead of just "Loading" */}
    <p>{data || "Loading or empty response..."}</p>
  </div>
);
}

export default App;
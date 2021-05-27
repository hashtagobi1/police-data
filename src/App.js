import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import * as topojson from 'topojson'
import styled from 'styled-components'
import * as d3_dsv from 'd3-dsv'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Choropleth from './components/Choropleth'
import BarChart from './components/BarChart';




function App() {
  const [showChoropleth, setShowChoropleth] = useState(true)
  const [showBarChart, setShowBarChart] = useState(false)

  const toggleChart = () => {
    setShowChoropleth(!showChoropleth)
    setShowBarChart(!showBarChart)
  }

  return (
    <div className="App">
      <h1>MPS Borough Level Crime</h1>



      {
        showChoropleth &&
        <>
          <Button onClick={toggleChart}>Show BarChart</Button>

          <Choropleth />

        </>

      }


      {

        showBarChart &&

        <>
          <Button
            onClick={toggleChart}
          >Show Choropleth</Button>

          <BarChart />

        </>

      }


    </div>
  );
}


export default App;

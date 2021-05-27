// import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [mapData, setMapData] = useState([])
    const [policeData, setPoliceData] = useState([])
    const [showToggle, setShowToggle] = useState(false)
    const [showLegend, setShowLegend] = useState(false)
    const mapSVGRef = useRef(null)
    const toolTipRef = useRef(null)

    const topoURL = 'https://vega.github.io/vega-datasets/data/londonBoroughs.json'
    const policeURL = 'https://data.london.gov.uk/download/recorded_crime_summary/d2e9ccfc-a054-41e3-89fb-53c2bc3ed87a/MPS%20Borough%20Level%20Crime%20%28most%20recent%2024%20months%29.csv'

    useEffect(() => {

    }, [mapData, policeData, policeData, setPoliceData])

    const toggleView = () => {
        setShowToggle(true)
    }

    let canvas = d3.select(mapSVGRef.current)
    let tooltip = d3.select(toolTipRef.current)
    // Visually represents map on screen

    const drawMap = () => {

        const londonProjection = d3.geoMercator()
            .center([0, 51])
            .scale(Math.pow(2.1, 17) / (2 * Math.PI))
            .translate([1180 / 2, 1900 / 2])

        canvas.selectAll('path')
            .data(mapData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath().projection(londonProjection))
            .attr('class', (d) => {
                return d.id
            })
            // Assigns different colors dependent on data in CSV file
            .attr('fill', (mD) => {

                let mapID = mD['id']
                let borough = policeData.find((item) => {
                    return item['LookUp_BoroughName'] === mapID
                })
                try {
                    let may19 = borough['201905']
                    if (parseInt(may19) < 3) {
                        return '#ffc6c6'
                    } else if (parseInt(may19) < 6) {
                        return '#ff8d8d'
                    } else if (parseInt(may19) <= 10) {
                        return '#fe5555'
                    } else if (parseInt(may19) > 10) {
                        return '#ff1c1c'
                    } else { return 'black' }

                } catch (err) {
                    return 'white'
                }
            })
            .on('mouseover', (mD) => {
                try {
                    tooltip.transition().style('visibility', 'visible')

                    let mapID = mD['id']
                    let borough = policeData.find((item) => {
                        return item['LookUp_BoroughName'] === mapID
                    })
                    tooltip.text(mapID)
                } catch (err) {
                    console.log(err)
                }
            })
            .on('mouseout', (d) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })
            .attr("stroke", "black")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
        setShowLegend(!showLegend)
    }

    // Retrieves data needed to draw map + crime data from police Database
    const getMapData = () => {
        // get map data and convert to GeoJSON file
        d3.json(topoURL)
            .then(
                (data, error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        setMapData((topojson.feature(data, data.objects.boroughs)).features)
                        // get crime data
                        d3.csv(policeURL).then(data => {
                            setPoliceData(data)
                        })
                    }
                }
            )
        setTimeout(() => {
            toggleView()
        }, 800)
    }
    return (
        <div className="App">

            {showLegend &&
                <>

                    <Legend>
                        <g>
                            <rect x="10" y="0" width="40" height="40" fill="#ffc6c6"></rect>
                            <text x="60" y="20" fill="white">Less than 3 occurences</text>
                        </g>
                        <g>
                            <rect x="10" y="40" width="40" height="40" fill="#ff8d8d"></rect>
                            <text x="60" y="60" fill="white">Up to 6 occurences</text>
                        </g>
                        <g>
                            <rect x="10" y="80" width="40" height="40" fill="#fe5555"></rect>
                            <text x="60" y="100" fill="white">Up to 10 occurences</text>
                        </g>
                        <g>
                            <rect x="10" y="120" width="40" height="40" fill="#ff1c1c"></rect>
                            <text x="60" y="140" fill="white">More than 10 </text>
                        </g>
                    </Legend>

                    <div>
                        <h4>Crime:
          <br />
                            <Paragraph>
                                {policeData[0].MajorText}
                            </Paragraph>
                            {/* Access first item in the object and retrieve the date that corresponds to the data */}
                            <Paragraph>
                                {Object.keys(policeData[0])[0].slice(0, 6)}
                            </Paragraph>
                        </h4>
                    </div>

                    {/* Dynamically Retreives Crime + Month/Year */}

                </>
            }

            <SVG ref={mapSVGRef}></SVG>
            {showToggle && !showLegend &&
                <Buttons onClick={drawMap}>Draw Map!</Buttons>
            }
            {!showToggle &&
                <Buttons onClick={getMapData}>Retrieve Data!</Buttons>}
            <ToolTipDiv
                id="tooltip"
                ref={toolTipRef}>
            </ToolTipDiv>
        </div>
    );
}

// Component Styling
const SVG = styled.svg`
min-width: 1000px;
min-height: 600px;
background: #eee;
padding: 12px 12px;
`

const Legend = styled.svg`
  background-color: #305555;
padding: 10px;
border-radius: 5px;
color: rgb(56, 58, 74);
font-size: 18px;
min-height: 150px;
max-width: 280px;
margin-top: 40px;
margin-bottom: 40px;
text-align: center;`

const Buttons = styled(Button)``

const Paragraph = styled.p`
color:#6c7a86;
`

const ToolTipDiv = styled.div`
color:pink;
visibility: hidden;
height:auto;
width:auto;`
export default App;

import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function BarChart() {
    const contRef = useRef(null)
    const [policeData, setPoliceData] = useState([null])
    const policeURL = 'https://data.london.gov.uk/download/recorded_crime_summary/d2e9ccfc-a054-41e3-89fb-53c2bc3ed87a/MPS%20Borough%20Level%20Crime%20%28most%20recent%2024%20months%29.csv'


    useEffect(() => {
        setTimeout(() => {
            d3.csv(policeURL).then(data => {
                setPoliceData(data)
                console.log(
                )
            })
        })

    }, [policeData, setPoliceData], 800)


    // Create SVG + Canvas
    const width = 800
    const height = 400
    const margin = {
        top: 50, bottom: 50, left: 50, right: 50
    }

    const svg = d3.select(contRef.current)
        .append('svg')
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewBox', [0, 0, width, height])

    const x = d3.scaleBand()
        .domain(d3.range(policeData.length - 1500))
        .range([margin.left, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, 300])
        .range([height - margin.bottom, margin.top])

    svg

        .append('g')
        .attr('fill', 'royalblue')
        .selectAll('rect')
        .data(Object.values(policeData))
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', (d) => y(d['201905']))
        .attr('height', d => y(0) - y(d['201905']))
        .attr('width', x.bandwidth())


    const xAxis = (g) => {
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i =>
                Object.keys(policeData[0])[0].slice(0, 6)

            ))
            .attr('font-size', '3px')


    }

    const yAxis = (g) => {
        g.attr('transform', `translate(0, ${margin.left}, 0`)
            .call(d3.axisLeft(y).ticks(null, policeData.format))
            .attr('font-size', '3px')



    }



    svg.append('g').call(yAxis)
    svg.append('g').call(xAxis)


    svg.node()




    try {
        // policeData.filter((row, i)=>{
        //     return row['201905']
        // })
        // console.log(policeData[0]['201905'])
    } catch (e) {
        console.log(e)
    }

    // console.log(Object.keys(policeData[0])[0].slice(0, 6))





    // object =
    return (
        <Container ref={contRef}>
            <h5>Arson and Criminal Damage in: Barking + Dagenham</h5>

        </Container>
    )
}

export default BarChart

const Container = styled.div``
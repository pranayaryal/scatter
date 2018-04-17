const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const xValue = d => d.Calories
const xScale = d3.scaleLinear().range([0, width])

const xMap = d => xScale(xValue(d))
const xAxis = d3.axisBottom(xScale)

const yValue = d => d.Protein
const yScale = d3.scaleLinear().range([height, 0])

const yMap = d => yScale(yValue(d))
const yAxis = d3.axisLeft(yScale)

// const cValue = d => d.Manufacturer
const cValue = d => d.class
const color = d3.scaleOrdinal(d3.schemeCategory10);


d3.csv('calories.csv').then((error, data) => {

    data.forEach(d => {
        d.Calories = +d.Calories;
        d.Protein = +d.Protein;
        console.log('you are here');

    });

});

// xScale.domain([d3.min(parsed, xValue) - 1, d3.max(parsed, xValue) + 1])
xScale.domain([d3.min(desiredArr, xValue) - 1, d3.max(desiredArr, xValue) + 1])
// yScale.domain([d3.min(parsed, yValue) - 1, d3.max(parsed, yValue) + 1])
yScale.domain([d3.min(desiredArr, yValue) - 1, d3.max(desiredArr, yValue) + 1])

const svg = d3.select('#plotSection').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', width + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

const tooltip = d3.select('#plotSection').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)
    .append('text')
    .attr('class', 'label')
    .attr('x', width)
    .attr('y', -6)
    .style('text-anchor', 'end')
    .text('Calories')

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Protein (g)')

svg.selectAll('.dot')
// .data(parsed)
    .data(desiredArr)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('r', 8.5)
    .attr('cx', xMap)
    .attr('cy', yMap)
    // .style('fill', function(d) { return color(cValue(d))})
    .style('fill', d => color(cValue(d)))
    .on('mouseover', d => {
        tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
        tooltip.html(`${d.CerealName}<br/>Calories: ${xValue(d)}, Protein: ${yValue(d)}`)
        // .style('left', `${d3.event.pageX + 5}px`)
            .style('left', `${d3.event.pageX - 210}px`)
            // .style('top', `${d3.event.pageY -28 }px`)
            .style('top', `${d3.event.pageY }px`)
            .style('border', '1px solid grey')
            .style('padding-left', '15px')
            .style('padding-top', '5px')
            .style('padding-bottom', '5px')
            .style('background-color', 'lightblue')
            .style('width', `${d.CerealName.length + 200}px`)
    })
    .on('mouseout', d => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0)
    })

var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
        return `translate(0,${i * 20})`
    })

legend.append('rect')
    .attr('x', width - 18)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', color)


legend.append('text')
    .attr('x', width - 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'end')
    .text(d => d)




const dataset = [
  { year: '2012', co2: 5345.454 },
  { year: '2013', co2: 5480.926 },
  { year: '2014', co2: 5528.871 },
  { year: '2015', co2: 5376.578 },
  { year: '2016', co2: 5251.757 },
  { year: '2017', co2: 5210.958 },
  { year: '2018', co2: 5376.657 },
  { year: '2019', co2: 	5259.144 },
  { year: '2020' ,co2: 4715.691 },
  { year: '2021' ,co2: 5007.336 },
];

const margin = { top: 30, right: 50, bottom: 80, left: 80 };
const width = 650 - margin.left ;
const height = 400 - margin.top;

const xScale = d3.scaleBand()
  .range([0, width])
  .round(true)
  .paddingInner(0.5); // space between bars (it's a ratio)

const yScale = d3.scaleLinear()
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(10);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.right})`);

const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

xScale
  .domain(dataset.map(d => d.year));
yScale
  .domain([0, d3.max(dataset, d => d.co2)]);

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis)
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('y', 6)
  .attr('dy', '.71em')
  .style('text-anchor', 'end')
  .text('Co2');

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("CO2 Emssion Rate");

svg.append("text")
.attr("y",  margin.bottom +310 )
.attr("x", margin.left +220 )
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Year");

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.left +250)
.attr("y", margin.top - 60 )
.style("font-size", "20px")
.style("text-anchor", "middle")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("CO2 Emssion Rate Change");
  

svg.selectAll('.bar').data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', d => xScale(d.year))
  .attr('width', xScale.bandwidth())
  .attr('y', d => yScale(d.co2))
  .attr('height', d => height - yScale(d.co2))
  .attr('fill','orange')
  .on('mouseover', (d) => {
    tooltip.transition().duration(200).style('opacity', 0.9);
    tooltip.html(`CO2 Value: <span>${d.co2}</span>`)
      .style('left', `${d3.event.layerX}px`)
      .style('top', `${(d3.event.layerY - 28)}px`);
  })
  .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));

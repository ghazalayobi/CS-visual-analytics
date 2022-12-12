// javascrip

d3.select('h1').style('color', '#468499')
.style("text-align","center")
.style("font", "50px times")

d3.select('h2').style('color', 'black')
.style("text-align","center")
.style("font", "20px times")

{
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const svg = d3.select("#bar")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/ghazalayobi/CS-visual-analytics/main/assignment5/country_data.csv").then ( function(data) {
    
      // sort data
      data.sort(function(b, a) {
        return a.Value - b.Value;
      });
    
      // X axis
      const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(d => d.Country))
        .padding(0.2);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 1100])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
    
      // Bars
      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", d => x(d.Country))
          .attr("y", d => y(d.Value))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.Value))
          .attr("fill", "#468499")
    
    })
}

d3.select('h3').style('color', 'black')
.style("text-align","center")
.style("font", "20px times")

{

  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            `translate(${margin.left},${margin.top})`);
  
  // get the data
  d3.csv("https://raw.githubusercontent.com/ghazalayobi/CS-visual-analytics/main/assignment5/data.csv").then( function(data) {
  
    // X axis: scale and draw:
    const x = d3.scaleLinear()
        .domain([-4,4])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
  
    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function(d) { return +d.AScore; })   // I need to give the vector of AScore
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(40)); // then the numbers of bins
  
    // And apply twice this function to data to get the bins.
    const bins1 = histogram(data.filter( function(d){return d.gender === "F"} ));
    const bins2 = histogram(data.filter( function(d){return d.gender === "M"} ));
  
    // Y axis: scale and draw:
    const y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .call(d3.axisLeft(y));
  
    // append the bars for series 1
    svg.selectAll("rect")
        .data(bins1)
        .join("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")
          .style("opacity", 0.6)
  
    // append the bars for series 2
    svg.selectAll("rect2")
        .data(bins2)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#404080")
          .style("opacity", 0.6)
  
    // Handmade legend
    svg.append("circle").attr("cx",600).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",600).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 620).attr("y", 30).text("F").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 620).attr("y", 60).text("M").style("font-size", "15px").attr("alignment-baseline","middle")
  
  });
  }
        
      
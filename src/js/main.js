var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 1300 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

var svg = d3
  .select("#graphVisual")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("circle")
  .attr("cx", 900)
  .attr("cy", -10)
  .attr("r", 6)
  .style("fill", "black");

svg
  .append("text")
  .attr("x", 920)
  .attr("y", -9)
  .text("2022 season is on-going")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");

var x = d3.scaleBand().range([0, width]).padding(0.2);
var xAxis = svg.append("g").attr("transform", "translate(0," + height + ")");

var y = d3.scaleLinear().range([height, 0]);
var yAxis = svg.append("g").attr("class", "myYaxis");

svg
  .append("text")
  .attr("x", 500)
  .attr("y", 600)
  .style("text-anchor", "middle")
  .text("Year");
  

function changeLabel() {
  const ylabel = document.getElementById("ylabel");
  ylabel.innerHTML = "Three Point Attempts";
}

function changeLabel2() {
  const ylabel = document.getElementById("ylabel");
  ylabel.innerHTML = "Three Point Percentage %";
}

function changeLabel3() {
  const ylabel = document.getElementById("ylabel");
  ylabel.innerHTML = "Three Pointers Made";
}

function update(selectedVar, text) {
  // Parse the Data
  d3.csv("/src/data/nbaAvgs.csv", function (data) {
    // X axis
    x.domain(
      data.map(function (d) {
        return d.Year;
      })
    );
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    // Add Y axis
    y.domain([
      0,
      d3.max(data, function (d) {
        return +d[selectedVar];
      }),
    ]);

    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    var l = svg.selectAll("rect").data(data);

    // update bars
    l.enter()
      .append("rect")
      .merge(l)
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return x(d.Year);
      })
      .attr("y", function (d) {
        return y(d[selectedVar]);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d[selectedVar]);
      })
      .attr("fill", "#943d24");
  });
}

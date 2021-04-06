//Create variable to link drop down menu on html
var dropdownmenu = d3.select('#selDataset');

//Create variable to display map
var myMap = L.map("map", {
    center: [44.005619, -84.785018],
    zoom: 6.25
  });

  //Define layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
  }).addTo(myMap);
  
  var link = "https://school-data-server.herokuapp.com/api";
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    //var earthquake_loc = [];


// Render Map 
    for (var i = 0; i < data.district_data.length; i++) {
      var lat = +data.district_data[i].lat;
      var lng = +data.district_data[i].lng;
      var school_enrol = +data.district_data[i].ave_school_enrol;
      var district_name = data.district_data[i].district;
      //var demo_data = {White:data.district_data[i].ave_prcnt_wht, Black:data.district_data[i].ave_prcnt_bk, Hispanic:data.district_data[i].ave_prcnt_hisp, Asian:data.district_data[i].ave_prcnt_asn, Other:data.district_data[i].ave_prcnt_othr}
      var demo_data = {White:Math.round(data.district_data[i].ave_prcnt_wht), Black:Math.round(data.district_data[i].ave_prcnt_bk), Hispanic:Math.round(data.district_data[i].ave_prcnt_hisp), Asian:Math.round(data.district_data[i].ave_prcnt_asn), Other:Math.round(data.district_data[i].ave_prcnt_othr)}

      var school_location = [lat, lng];
      // console.log(school_location);
      // console.log(demo_data);

      L.circle(school_location, {
        fillOpacity: 0.80,
        // color: "white",
        fillColor: "red",
        // Adjust radiuss
        radius: 2000
      })
      //.bindPopup("<h1>" + district + "</h1> <hr> <p>Points: " + school_enrol + "</p>").addTo(myMap);
      .bindPopup(piechart(demo_data, district_name)).addTo(myMap);

    }

    var data_distnames = data.district_data;
    data_distnames.forEach(function (d) {
      dropdownmenu
          .append("option")
          .attr('value', d.index) 
          .text(d.district);
          });
  });

  function piechart(data, district){
    
    var width = 200;
    var height = 170;
    var margin = {left:20,right:20,top:20,bottom:20};

    var div = d3.create("div")
    var svg = div.append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom);
    var g=svg.append("g")
      .attr("transform","translate(" + (width / 2 -30) + "," + height / 2 + ")");  

    
    var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
    g.selectAll(null)
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
    .innerRadius(30)
    .outerRadius(50)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);
    

    svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 80) + "," + 20 + ")")
               .append("text")
               .text(district)
              //  .style("font-size", "15px")
               .style("textLength", "120")
               .attr("class", "title")


    var labelHeight = 15;
    const legend = svg
    .append('g')
    .attr('transform', "translate(" + (65*2) + "," + 50 + ")");

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('text')
    // .text(d => d.data.key)
    .text(function (d) { return (d.data.value+'% '+d.data.key); })
    .attr('x', labelHeight * 1.2)
    .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${labelHeight}px`);
    // .style('font-size', `15px`);

    return div.node();
  }

  function optionChanged(value){
    console.log("#demo-piechart")
    d3.select("#demo-piechart").html('')
    var link = "https://school-data-server.herokuapp.com/api";
      d3.json(link, function(data) {
        var i=value;
        var district_name = data.district_data[i].district;
        //var demo_data = {White:data.district_data[i].ave_prcnt_wht, Black:data.district_data[i].ave_prcnt_bk, Hispanic:data.district_data[i].ave_prcnt_hisp, Asian:data.district_data[i].ave_prcnt_asn, Other:data.district_data[i].ave_prcnt_othr}
        var demo_data = {White:Math.round(data.district_data[i].ave_prcnt_wht), Black:Math.round(data.district_data[i].ave_prcnt_bk), Hispanic:Math.round(data.district_data[i].ave_prcnt_hisp), Asian:Math.round(data.district_data[i].ave_prcnt_asn), Other:Math.round(data.district_data[i].ave_prcnt_othr)}
        populate_piechart(demo_data, district_name);
    });
  };

  function populate_piechart(data){
    var width = 400;
    var height = 300;
    var margin = {left:20,right:20,top:20,bottom:20};
    var svg =d3.select("#demo-piechart")
      .append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom);
    var g=svg.append("g")
      .attr("transform","translate(" + ((width / 3)+50) + "," + height / 2 + ")");  

    
    var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
    var arc = d3.arc()
    .innerRadius(50)
    .outerRadius(80);

    var label = d3.arc()
                      .outerRadius(50)
                      .innerRadius(80);


    g.selectAll(null)
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .transition()
    .duration(1000)
    .attrTween("d", function (d) {
        var i = d3.interpolate(d.endAngle, d.startAngle);
        return function (t) {
            d.startAngle = i(t);
            return arc(d);
        }
    });
    
    svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 300) + "," + 20 + ")")
               .append("text")
               .attr("class", "title");

    var labelHeight = 18;
    const legend = svg
    .append('g')
    .attr('transform', "translate(" + (100*3) + "," + 80 + ")");
    
    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

    legend
    .selectAll(null)
    .data(data_ready)
    .enter()
    .append('text')
    // .text(d => d.data.key)
    .text(function (d) { return (d.data.value+'% '+d.data.key); })
    // .text(piechart_text(data_ready))
    .attr('x', labelHeight * 1.2)
    .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${labelHeight}px`);
  }





  

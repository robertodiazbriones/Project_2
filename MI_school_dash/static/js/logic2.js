// Creating map object
var map = L.map("map", {
    center: [42.73, -84.55],
    zoom: 11
});

/* Control panel to display map layers */
var controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
}).addTo(map);

  // Display Carto basemap tiles with light features and labels
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(light, 'Light basemap');

// add an OpenStreetMap tile layer
var streetmap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'The map contributors',
    maxZoom: 18
});
controlLayers.addBaseLayer(streetmap, 'OpenStreetMap');

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/
var link = "https://school-data-server.herokuapp.com/api";
// Read markers data from cleaned_data.csv
d3.json(link, function(data) {
    function chooseColor(data) {
        return data > 66 ? 'red' :
            data < 33 ? 'green' :
            "yellow";
    }
    // For each row in data, create a marker and add it to the map
    // For each row, columns `lat`, `lng`, and `eligible_for_frl` are required
    for (var i in data) {
        var row = data[i];
    
        var marker = L.circle([row.lat, row.lng], 500, {
            stroke: true,
            color: chooseColor(row.eligible_for_frl),
            opacity: 1,
            fill: true,
            fillColor: chooseColor(row.eligible_for_frl),
            fillOpacity: 1,
        }).bindPopup(row.school + "<br> Free and Reduced Lunch Eligibility: " + row.eligible_for_frl + "%" + "<br> Majority-Minority School: " + row.majority_minority);
      
        marker.addTo(map);
    }
});


///// ---------------------------------------------------------------- //////


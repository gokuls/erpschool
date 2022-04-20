$("#sidenav").click();

let map = L.map('map', {
    keyboard: false,
    // dragging: false,
    // zoomControl: false,
    boxZoom: false,
    //doubleClickZoom: false,
    scrollWheelZoom: false,
    tap: false,
    touchZoom: false,
});

let geoData = null;

let geoJson = null;



$.get("/static/dashboard/geojson/DamanDiu.json",).then((res) => {
    
    map.setView([20.473483, 71.934247], 8);

        geoData = res

        geojson = L.geoJson(geoData, {

            style: {
                fillColor: 'white', weight: 1, opacity: 1,

                color: '#333333', dashArray: '', fillOpacity: 0.7

            }, onEachFeature: (feature, layer) => {

                layer.on({

                    mouseover: onMouseOverDistrict,

                    mouseout: onMouseOutDistrict,

                    click: onClickDistrict,
                });
            }
        }).addTo(map);

});
$("#sidenav").click();

let mapLoad = null;

let districtBorderData = null;

let districtBorderGeoJSON = null;

let schools = [];

let selectedDistrict = null;

let districtSchools = [];

let villageBorderData = null;

let villageBorderGeoJSON = null;

let selectedVillageGeoJSON = null;

let schoolMarkers = []

let villagePopup = []

let uniqGrades = []

var MarkerIcon = L.Icon.extend({
    options: {
        iconSize: [30, 45],
        //shadowSize: [50, 64],
        //iconAnchor: [22, 94],
        //shadowAnchor: [4, 62],
        //popupAnchor: [-3, -76]
    }
});



let map = L.map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
    keyboard: false,
    // dragging: false,
    zoomControl: true,
    boxZoom: false,
    //doubleClickZoom: false,
    // scrollWheelZoom: false,
    tap: false,
    touchZoom: false,
});

/* z-index to send popup back (popup z-index: 800)
https://stackoverflow.com/questions/28394867/leaflet-z-index */
map.createPane("villageborder").style.zIndex = 850;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    // this.update();
    return this._div;
};

info.update = function (props) {
    let oneSch = props

    let ptr_ratio = '0';

    let csr_ratio = '0';

    if ("students" in oneSch) {

        if (oneSch.students > 0 && oneSch.teachers > 0) {
            ptr_ratio = `${(oneSch.students / oneSch.teachers).toFixed(2)} : 1`;
        }

        if (oneSch.students > 0 && oneSch.classrooms > 0) {
            csr_ratio = `${(oneSch.students / oneSch.classrooms).toFixed(2)} : 1`;
        }

        this._div.innerHTML = `
            <div class="row" style="width: 350px">
                <div class="col-lg-12">
                    <div class="small-box bg-secondary mb-2" >
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h5 class="text-white">${oneSch.school}</h5>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">Medium: ${oneSch.medium}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="width: 350px">
                <div class="col-lg-8">
                    <div class="small-box bg-success mb-2" style="opacity: 0.8">
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h4 class="text-white">${oneSch.boys} / ${oneSch.girs} (${oneSch.students})</h4>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">Boys / Girls (Students)</p>
                        </div>
                    </div>
                </div>
                <!--<div class="col-lg-4">
                    <div class="small-box bg-success mb-2" style="opacity: 0.8">
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h4 class="text-white">${oneSch.girs}</h4>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">Girls</p>
                        </div>
                    </div>
                </div>-->
                <div class="col-lg-4">
                    <div class="small-box bg-warning mb-2" style="opacity: 0.8">
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h4 class="text-dark">${oneSch.teachers}</h4>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">Teachers</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="small-box bg-primary mb-2" style="opacity: 0.8">
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h4 class="text-light">${ptr_ratio}</h4>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">PTR Ratio</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="small-box bg-danger mb-2" style="opacity: 0.8">
                        <div class="inner" style="text-align: center; padding: 5px">
                            <h4 class="text-light">${csr_ratio}</h4>
                            <p style="font-size: 12px; margin: 0; font-weight: bold;">CSR Ratio</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        this._div.innerHTML = '';
    }
};

info.addTo(map);


var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + "#333333" + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



function getDistrictColor(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: feature.properties.fillcolor
    };
}

function districtStyle(feature) {

    return {

        fillColor: '#000000', weight: 2, opacity: 1,

        color: '#000000', dashArray: '', fillOpacity: 0,
    };
}

function clearMarkers() {

    if (schoolMarkers.length) {

        schoolMarkers.forEach((marker) => {

            map.removeLayer(marker);

        });
    }

    if (villagePopup.length) {

        villagePopup.forEach((popup) => {

            map.removeLayer(popup);

        });
    }
}


function initialLoad() {

    map.setView([20.220918, 72.232609], 9);

    $(".info")[0].hidden = true;
    clearMarkers();
    if (villageBorderGeoJSON) map.removeLayer(villageBorderGeoJSON);
    if (districtBorderGeoJSON) map.removeLayer(districtBorderGeoJSON);
    if (selectedVillageGeoJSON) map.removeLayer(selectedVillageGeoJSON);
    $(".legend").html('');
    // info.update();

    mapLoad = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 'attribution': 'Map data &copy; OpenStreetMap contributors' }).addTo(map);

    // background: white;
    // color: #333;
    // box-shadow: 0 3px 14px rgb(0 0 0 / 40%);

    $.get('http://10.184.49.191:8069/api/school_profile?block=&cluster=&village=&school=').then((data) => {

        schools = data.data;

        updateDashboard(schools);

        $.get('/static/dashboard/geojson/DamanDiu.json').then((data) => {

            console.log(data);

            districtBorderData = data;

            districtBorderGeoJSON = L.geoJson(data, {

                style: getDistrictColor, onEachFeature: (feature, layer) => {

                    layer.on({

                        mouseover: onMouseOverDistrict,

                        mouseout: onMouseOutDistrict,

                        click: onClickDistrict

                    });

                    let latlon = layer.getBounds().getCenter();

                    L.popup({
                        permanent: true,
                        direction: 'bottom', autoClose: false, className: "custom-popup"
                    }).setLatLng([latlon.lat, latlon.lng]).setContent(`<b>${layer.feature.properties.DISTRICT}</b>`).openOn(map).bringToBack();

                }

            }).addTo(map);

        });

        $(".leaflet-popup-tip, .leaflet-popup-content-wrapper").addClass("add-popup-bg");

    });

}

function onMouseOverDistrict(e) {

    var layer = e.target;

    layer.setStyle({

        weight: 2, color: '#85ded8',

        dashArray: '', fillOpacity: 0.7

    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    let sel_dist = layer.feature.properties.DISTRICT;

    updateDashboardonDistrict(sel_dist);

}


function onMouseOutDistrict(e) {

    districtBorderGeoJSON.resetStyle(e.target);

    updateDashboard(schools);

    // initialLoad();

}


function onClickDistrict(e) {

    // let { lat, lng } = e.target.getBounds().getCenter()

    // map.setView([lat, lng], 12);

    selectedDistrict = e.target.feature.properties.DISTRICT;

    onClickDistrictDashboard(selectedDistrict);

    map.fitBounds(e.target.getBounds());

    districtBorderGeoJSON.remove();

    $.get(`/static/dashboard/geojson/${selectedDistrict}.json`).then((data) => {

        villageBorderData = data;

        console.log(data);

        villageBorderGeoJSON = L.geoJson(data, {

            style: {
                pane: 'villageborder',

                fillColor: '#FC4E2A', weight: 2, opacity: 1,

                color: '#000000', dashArray: '', fillOpacity: 0,

            }, onEachFeature: (feature, layer) => {

                layer.on({

                    mouseover: onMouseOverVillage,

                    mouseout: onMouseOutVillage,

                    click: onClickVillage

                });

                let latlon = layer.getBounds().getCenter()

                console.log(layer.getBounds().getCenter(), layer.feature.properties.name);

                // L.CircleMarker([latlon.lat, latlon.lng]).addTo(map).bindPopup(`<b>${feature.properties.name}</b>`).openPopup();

                villagePopup.push(L.popup({
                    permanent: true, closeButton: false,
                    direction: 'bottom', autoClose: false, className: "custom-popup", offset: [0, 30]
                }).setLatLng([latlon.lat, latlon.lng]).setContent(`<b>${layer.feature.properties.name}</b>`).openOn(map).bringToBack());

            }

        }).addTo(map).openPopup();

        $(".leaflet-popup-tip").removeClass("add-popup-bg");
        $(".leaflet-popup-tip, .leaflet-popup-content-wrapper").addClass("remove-popup-bg");
        $("leaflet-popup-content").addClass("remove-margin");
        // villageBorderGeoJSON.eachLayer(function (layer) {

        //     layer.bindPopup(layer.feature.properties.name);

        // }).addTo(map);

    })

}


function onMouseOverVillage(e) {

    var layer = e.target;

    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    let sel_village = layer.feature.properties.name;

    console.log(sel_village);

    updateDashboardonVillage(sel_village);

}


function onMouseOutVillage(e) {

    villageBorderGeoJSON.resetStyle(e.target);

    updateDashboard(schools);

}


function onClickVillage(e) {

    let sel_village = e.target.feature.properties.name;

    onClickVillageDashboard(sel_village);

    map.fitBounds(e.target.getBounds());

    villageBorderGeoJSON.remove();

    let selectedVillageData = villageBorderData.features.filter(ele => ele.properties.name == sel_village);

    selectedVillageGeoJSON = L.geoJson(selectedVillageData, {

        style: districtStyle, onEachFeature: (feature, layer) => {

            layer.on({

            });
        }
    }).addTo(map);

}


function updateDashboard(school) {

    // $(".overlay-load").css("display", "flex");

    // $(".overlay-load").style.display = "flex";

    console.log($(".overlay-load"));

    let total_students = 0;

    let total_teachers = 0;

    let total_staffs = 0;

    school.forEach((sch) => {

        total_students += sch.students;

        total_teachers += sch.teachers;

        total_staffs += sch.staffs;

    })

    $('#total_schools').html(school.length);

    $('#total_students').html(total_students);

    $('#total_teachers').html(total_teachers);

    $('#total_staffs').html(total_staffs);

    $(".overlay-load").css("display", "none");
    // $(".overlay-load").style.display = "none";
}


function updateDashboardonDistrict(district) {

    let f_schools = schools.filter((school) => {

        return school.block_name == district;

    })

    updateDashboard(f_schools);
}


function onClickDistrictDashboard(district) {

    schools = schools.filter((school) => {

        return school.block_name == district;

    });

    updateDashboard(schools);
}

function updateDashboardonVillage(village) {

    let f_schools = schools.filter((school) => {

        return school.village_name == village;

    })
    console.log(schools.length);
    console.log({ f_schools });

    updateDashboard(f_schools);
}


function onClickVillageDashboard(village) {

    schools = schools.filter((school) => {

        return school.village_name == village;

    });

    updateDashboard(schools);

    gradeWiseMarker(schools);

    schools.forEach((sch) => {

        schoolMarkers.push(L.marker([sch.lat, sch.long], { icon: getIconGrade(sch.grade) }).on('mouseover', function (ev) {

            this.openPopup();

        }).on('click', function (ev) {

            let latlng = ev.target.getLatLng();

            let find_school = schools.find((school) => {
                return school.lat == latlng.lat && school.long == latlng.lng;
            });

            console.log({ find_school });

            $(".info")[0].hidden = false;

            info.update(find_school);

        }).addTo(map).bindPopup(sch.school));

    })
}

function gradeWiseMarker(schools_grades) {

    let grades = new Set();

    schools_grades.forEach((sch) => {

        grades.add(sch.grade);

    })

    console.log({ grades });

    uniqGrades = Array.from(grades);

    let icons = ["#5534A5", "#FF5733 ", "#581845", "#006E7F", "#383838", "#069A8E", "#FF2E63", "#E900FF"];

    let mappedIcons = [];

    uniqGrades.forEach((grade, i) => {

        mappedIcons.push({ 'grade': grade, 'iconcolor': icons[i] });

    })

    uniqGrades = mappedIcons;

    let appendLegend = "";

    uniqGrades.forEach((grade, i) => {

        appendLegend += `<div class="legend-item mb-3 row"><div class="col-4"><i class="fa fa-school fa-2x" style="color: ${grade.iconcolor}"></i></div><div class="col-8"> ${grade.grade}</div></div>`;

    })

    $(".legend").html(appendLegend);
}


function getIconGrade(grade) {

    let colorcode = uniqGrades.find(g => g.grade == grade).iconcolor;

    return L.divIcon({
        html: `<i class="fa fa-school fa-2x" style="color: ${colorcode}"></i>`,
        iconSize: [20, 20],
        className: 'myDivIcon'
    });

}

$(function () {

    initialLoad();

});
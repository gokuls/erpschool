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


let info = L.control();

info.onAdd = function (map) {

    this._div = L.DomUtil.create('div', 'info');

    this.updateForDistrict();

    return this._div;
};

info.updateForDistrict = function (properties) {

    let dist;

    if (properties) {

        console.log (properties.DISTRICT );

        // dist = stateData.filter(ele => ele.district == properties.DISTRICT)

        // if (dist.length) {

        //     dist[0].info.freeBeds - dist[0].info.patients < 10 ? this._div.classList.add('ak-alert') : this._div.classList.remove('ak-alert');
            
        //     $('#totalhospitals').html(dist[0].status.totalhospitals);
            
        //     $('#patientsadmitted').html(dist[0].status.patientsadmitted);
            
        //     $('#availablebeds').html(dist[0].status.availablebeds);
            
        //     $('#availableventilators').html(dist[0].status.availableventilators);
        // }
    }

    this._div.innerHTML = (properties && dist.length ?
        "".concat(
            '<h4>', properties.DISTRICT, '</h4>',
            "Health Centres: ", '',
            ", Patients: ", '',
            ", Free Beds: ", ''
        ) : '');
    
        
}

info.addTo(map);

var locations = []
var total_students = 0
var total_teachers = 0
var total_present = 0
var total_absent = 0

let geojson = null;
let villagejson = null;
let villageData = null;
let villagejsonclicked = null;
let geoData = null;
let titleLayer = null;

let talukData = null;

let selectedTaluk = null;

let markers = [];

let districtData = null;

var Districtmapping = {
    'DAMAN': 5,
    'DNH' : 1,
    'DIU': 6
  };

function districtStyle(feature) {

    return {

        fillColor: '#000000', weight: 2, opacity: 1,

        color: '#000000', dashArray: '', fillOpacity: 0,
    };
}

function clearMarkers() {

    if (markers.length) {

        markers.forEach((marker) => {

            map.removeLayer(marker);
        });
    }
}

function initialLoad() {

    map.setView([20.473483, 71.934247], 8);
    removeData();
    
    //if(titleLayer) map.removeLayer(titleLayer);
    //if(villagejson) map.removeLayer(villagejson);
    //if(villagejsonclicked) map.removeLayer(villagejsonclicked);

    $.get("/static/dashboard/geojson/DamanDiu.json",).then((res) => {
        geoData = res

        titleLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 'attribution': 'Map data &copy; OpenStreetMap contributors' }).addTo(map);

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


        $.get('http://14.139.180.56:8069/api/school_location').then((res) => {
            talukData = res.data
            let options = '<option value="">All</option>'
            talukData.forEach(element => {
                if (element.cluster == true) {
                    options += `<option value="${element.id}">${element.name}</option>`
                }
            })
            $("#taluk").html(options)
        }).catch((err) => {
            console.log(err)
        });

            $.get('http://14.139.180.56:8069/api/student_attendance?block=&cluster=&village=&school=').then((res) => {

                districtData = res.data

                $.get('http://14.139.180.56:8069/api/school_detail?block=&cluster=&village=&school=').then(function (res) {
                    console.log(res);
                    locations = res.data
                    console.log("Distric Data");
                    console.log(districtData);
                    console.log(locations)

                    labels = []
                    datas = []

                    districtData.forEach(element => {
                        labels.push(element.block_name);
                        datas.push(element.total);
                    });

                    console.log(labels);
                    console.log(datas);
                    

                    updateDashboard(districtData);
                    updateStudentTeacher(locations);
                    // updateChart(locations);
                    removeData();
                    
                    addData(labels, datas);


                    geojson.eachLayer(function (layer) {
                        layer.bindPopup(layer.feature.properties.DISTRICT);
                    });

                }).catch(function (error) {
                    console.error(error)
                });


            }).catch((err) => {console.log(err)});
        
    }).catch(function (error) {
        console.error(error)
    });

    var markers = L.markerClusterGroup();
    markers.addLayer(L.marker(getRandomLatLng(map)));
    map.addLayer(markers2);

}

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);


function updateDashboard(dis_data) {

    let present = 0;
    let absent = 0;
    let total = 0;

    dis_data.forEach(item => {
        present += item.present
        absent += item.absent
        total += item.total
    })

    
    $("#total_student").text(total);
    $("#attendance").text(`${present} / ${absent}`);

}


function drawDonutChart(values) {
    // Donut Chart
    var pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
    var pieData = {
        labels: [
            'Total Students',
            'Total Present',
            'Total Absent'
        ],
        datasets: [
            {
                data: values,
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }
        ]
    }
    var pieOptions = {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true
    }
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    // eslint-disable-next-line no-unused-vars
    var pieChart = new Chart(pieChartCanvas, { // lgtm[js/unused-local-variable]
        type: 'doughnut',
        data: pieData,
        options: pieOptions
    })
}


$('.daterange').daterangepicker({
    ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate: moment()
}, function (start, end) {
    // eslint-disable-next-line no-alert
    // alert('You chose 1: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    initialLoad();
})

function getCircleColor(total, present) {
    let percentage = present / total * 100

    if (percentage >= 50) {
        return {
            color: 'green',
            fillColor: '#28a74569',
            fillOpacity: 0.5,
            radius: 500
        }
    }
    else {
        return {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }
    }

}


// http://14.139.180.56:8069/api/school_detail

// Vigneswari CDAC Chennai says:
// http://14.139.180.56:8069/api/school_location

// Vigneswari CDAC Chennai says:
// https://github.com/geohacker/india


function onMouseOverDistrict(e) {

    var layer = e.target;

    console.log(layer.feature.properties.DISTRICT);

    layer.setStyle({ weight: 2, color: '#85ded8', dashArray: '', fillOpacity: 0.7 });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {

        layer.bringToFront();
    }

    let sel_dist = layer.feature.properties.DISTRICT

    console.log(sel_dist);
    // info.updateForDistrict(layer.feature.properties);

    let temp = locations.filter((item) => {
        return item.block_name == sel_dist
    })

    console.log(temp)

    let did = Districtmapping[layer.feature.properties.DISTRICT]
    console.log(`${did}`)

    $.get(`http://14.139.180.56:8069/api/school_detail?block=${did}&cluster=&village=&school=`).then(function (res) {
                    locations = res.data
                    console.log(locations)
                    

                    updateStudentTeacher(locations);

                    geojson.eachLayer(function (layer) {
                        layer.bindPopup(layer.feature.properties.DISTRICT);
                    });

                }).catch(function (error) {
                    console.error(error)
                });

    let d_data = districtData.find((dist) => dist.block_name == sel_dist);

    // $("#total_school").text(temp.length);
    $("#attendance").text(`${d_data.present} / ${d_data.absent}`);

    //updateStudentTeacher(temp);


    const ctx = document.getElementById("stackedBarChart");
    console.log(ctx);

    removeData();
    addData();

}

function onMouseOverVill(e) {

    var layer = e.target;

    console.log(layer.feature.properties.name);

    let sel_village = layer.feature.properties.name

    layer.setStyle({ weight: 2, color: '#85ded8', dashArray: '', fillOpacity: 0.7 });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {

        layer.bringToFront();
    }

    // console.log(layer.feature.properties.DISTRICT)
    // info.updateForDistrict(layer.feature.properties);

    let temp = locations.filter((item) => {
        return item.village_name == sel_village
    })

    console.log(temp)

    let d_data = districtData.find((dist) => dist.block_name == sel_dist);

    

}

function onMouseOutDistrict(e) {

    geojson.resetStyle(e.target);

    updateDashboard(districtData);
    
    updateStudentTeacher(locations);

}

function onMouseOutVill(e) {

    geojson.resetStyle(e.target);
}


function onClickDistrict(e) {

    let selectedDistrict = e.target.feature.properties.DISTRICT;

    console.log(selectedDistrict);

    // titleLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     'attribution': 'Map data &copy; OpenStreetMap contributors'
    // }).addTo(map);
    // titleLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 'attribution': 'Map data &copy; OpenStreetMap contributors' }).addTo(map);

    map.fitBounds(e.target.getBounds());

    geojson.clearLayers();

    // let selectedDistrictGeoJson = geoData.features.filter(ele => ele.properties.DISTRICT == selectedDistrict);

    $.get('/static/dashboard/geojson/village.json').then((response) => {
        villageData = response
        console.log(villageData)

        titleLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 'attribution': 'Map data &copy; OpenStreetMap contributors' }).addTo(map);

        villagejson = L.geoJson(response, {

        style: districtStyle, onEachFeature: (feature, layer) => {

            layer.on({

                mouseover: onMouseOverVill,

                mouseout: onMouseOutVill,

                click: onClickVillage,
            });
        }
    }).addTo(map);
    })
    

}


function onClickVillage(e) {

    let sVillage = e.target.feature.properties.name;

    console.log({sVillage});

    console.log(e.target);

    titleLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
    }).addTo(map);

    map.fitBounds(e.target.getBounds());

    geojson.clearLayers();
    villagejson.clearLayers();

    console.log(villageData)

    villageData.features.forEach(ele => {
        console.log(ele)
    })

    let selectedVillage = villageData.features.filter(ele => ele.properties.name == sVillage);

        villagejsonclicked = L.geoJson(selectedVillage, {

        style: districtStyle, onEachFeature: (feature, layer) => {

            layer.on({

            });
        }
    }).addTo(map);
    

}

$("#taluk").on("change", function (e) {
    selectedTaluk = e.target.value
    console.log(selectedTaluk);
    
    clearMarkers();

    total_school = 0;
    total_students = 0;
    total_teachers = 0;
    total_present = 0;
    total_absent = 0;

    if(selectedTaluk == ""){
        initialLoad();
    }
    else{
        let sel_taluk = locations.filter(ele => ele.cluster == selectedTaluk);

        sel_taluk.forEach(element => {
            markers.push(L.marker([element.lat, element.longi]).addTo(map));
            total_school++;
            total_students += element.students;
            total_teachers += element.teachers;
            total_present = total_present + 20
            total_absent = total_absent + 20
        })

        updateChart(sel_taluk)
    }

        $("#total_school").text(total_school);
        $("#total_student").text(total_students);
        $("#total_teachers").text(`${total_teachers} / 0`);
        $("#attendance").text(`${total_present} / ${total_absent}`);

    
});


function updateStudentTeacher(dataparms){

    let t_students = 0;
    let t_teachers = 0;

    // dataparms.forEach(element => {
    //     t_students += element.students;
    //     t_teachers += element.teachers;
    // })
    $("#total_school").text(dataparms[0].schools);
    $("#total_student").text(dataparms[0].students);
    $("#total_teachers").text(`${dataparms[0].teachers} / 0`);
}


$(function () {

    initialLoad();

});

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

// function removeData(chart) {
//     // chart.data.labels.pop();
//     // chart.data.datasets.forEach((dataset) => {
//     //     dataset.data.pop();
//     // });
//     // chart.update();
//     chart.clear();
// }
 

 
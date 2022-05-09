let filterData = null;

let academicYear = null;

let stackedBar = null;

// let apiUrl = 'http://14.139.180.56:8069/api/';
let apiUrl = 'http://10.184.49.191:8069/api/';

$.get(`${apiUrl}school_location`, function (data) {

    filterData = data.data;

    academicYear = data.year;

    let academic = '';

    let district = '<option value="">All</option>';

    academicYear.forEach(function (item) {

        if (item.current) {
            academic += `<option value="${item.id}" selected>${item.name}</option>`;
        }
        else {
            academic += `<option value="${item.id}">${item.name}</option>`;
        }

    });

    filterData.forEach(function (item) {

        if (item.block) district += `<option value="${item.id}">${item.name}</option>`;

    })

    $("#academic").html(academic);
    $("#district").html(district);
    $("#cluster, #village, #school").html('<option value="">All</option>');

    updateDailyAttendanceTile();
    updateSyncedTile();

});

$('#district').change(function () {

    let district = $('#district').val();

    $("#cluster, #village, #school").html('<option value="">All</option>');

    let cluster = '<option value="">All</option>';

    filterData.forEach(function (item) {

        if (item.cluster && (item.parent == district || district == '')) {
            cluster += `<option value="${item.id}">${item.name}</option>`;
        }

    });

    $("#cluster").html(cluster);

    updateDailyAttendanceTile();
    updateSyncedTile();

});

$("#cluster").change(function () {

    let cluster = $('#cluster').val();

    $("#village, #school").html('<option value="">All</option>');

    let village = '<option value="">All</option>';

    filterData.forEach(function (item) {

        if (item.village && (item.parent == cluster || cluster == '')) {
            village += `<option value="${item.id}">${item.name}</option>`;
        }

    });

    $("#village").html(village);

    updateDailyAttendanceTile();
    updateSyncedTile();

});


$("#village").change(function () {

    let village = $('#village').val();

    $("#school").html('<option value="">All</option>');

    $.get(`${apiUrl}school_profile?block=&cluster=&village=&school=`, function (data) {

        let school = '<option value="">All</option>';

        data.data.forEach(function (item) {

            if (item.village == village || village == '') {
                school += `<option value="${item.school_id}">${item.school}</option>`;
            }

        });

        $("#school").html(school);

        updateDailyAttendanceTile();
        updateSyncedTile();

    })

})

$("#school").change(function () {

    updateDailyAttendanceTile();
    updateSyncedTile();

})


function updateDailyAttendanceTile() {

    let params = getParams();

    console.log({ params });

    $.get(`${apiUrl}student_daily_attendance?${params}`, function (data) {

        console.log(data);

        let stuData = data.data[0];

        $("#daily-attendance").html(`
        <thead>
            <tr>
                <th></th>
                <th class="text-center"><span class="text-danger" style="text-size: 12px !important">${stuData.percent.toFixed(2)}&nbsp%</span><br/>Today</th>
                <th class="text-center"><span class="text-danger" style="text-size: 12px !important">${stuData.y_percent.toFixed(2)}&nbsp%</span><br/>Yesterday</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Present</td>
                <td class="text-center">${stuData.present}</td>
                <td class="text-center">${stuData.y_present}</td>
            </tr>
            <tr>
                <td>Absent</td>
                <td class="text-center">${stuData.absent}</td>
                <td class="text-center">${stuData.y_absent}</td>
            </tr>
            <tr>
                <td>Not Synced</td>
                <td class="text-center">${stuData.notsynced}</td>
                <td class="text-center">${stuData.y_notsynced}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td class="text-center">${stuData.total}</td>
                <td class="text-center">${stuData.total}</td>
            </tr>
        </tbody>
        `)
    }).catch(function (err) {
        console.log(err);
        $("#daily-attendance").html(`<h5 class="text-center">No data found</h5>`);
    })

}


function updateSyncedTile() {

    let params = getParams();

    console.log({ params });

    $.get(`${apiUrl}school_attendance_sync?${params}`, function (data) {

        console.log(data);

        let stuData = data.data[0];

        $("#tile-synced").html(`
        <thead>
            <tr>
                <th></th>
                <th class="text-center"><span class="text-warning" style="text-size: 12px !important">${stuData.percent.toFixed(2)}&nbsp%</span><br/>Today</th>
                <th class="text-center"><span class="text-warning" style="text-size: 12px !important">${stuData.y_percent.toFixed(2)}&nbsp%</span><br/>Yesterday</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Synced</td>
                <td class="text-center">${stuData.synced}</td>
                <td class="text-center">${stuData.y_synced}</td>
            </tr>
            <tr>
                <td>Not Synced</td>
                <td class="text-center">${stuData.notsynced}</td>
                <td class="text-center">${stuData.y_notsynced}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td class="text-center">${stuData.total}</td>
                <td class="text-center">${stuData.total}</td>
            </tr>
        </tbody>
        `)
    }).catch(function (err) {
        console.log(err);
        $("#tile-synced").html(`<h5 class="text-center">No data found</h5>`);
    })

}

function openDatatable(url) {

    $.get(`${apiUrl+url}?${getParams()}`, function (data) {

        console.table(data.data)

        generateDataTable("#example1", "today", data.data);
        generateDataTable("#example2", "yesterday", data.data);

        $("#attendance-modal").modal('show');

    }).catch(function (err) { })

}


function getParams() {

    let district = $("#district").val();

    let cluster = $("#cluster").val();

    let village = $("#village").val();

    let school = $("#school").val();

    let params = '';

    params += (district) ? `block=${district}` : 'block=';

    params += (cluster) ? `&cluster=${cluster}` : '&cluster=';

    params += (village) ? `&village=${village}` : '&village=';

    params += (school) ? `&school=${school}` : '&school=';

    return params;

}

function generateDataTable(tableId, type, tableData) {

    let finaldata = [];

    tableData.forEach(function (item) {

        let data = {}

        let y_data = [];

        Object.keys(item).forEach(function (key) {


            if(key.includes('y_')) {

                if(type == 'today') { 
                    
                    delete item[key]; 
                
                } else {

                    y_data.push(key.split('y_')[0]);

                }

            }
            else{

                data[key] = item[key];

            }
            
        });

        if(y_data.length) {

            y_data.forEach(function(key){

                delete data[key];
            
            })
        }

        finaldata.push(data);

    });

    console.table(finaldata);

    let columns = [];

    let thead = Object.keys(finaldata[0]);

    thead.forEach(function (item) {

        columns.push({'title': item.toUpperCase(), 'data': item});

    });

    if ($.fn.dataTable.isDataTable(tableId)) {

        $(tableId).DataTable().clear().destroy();               
    
    }

    $(tableId).html('');

    $(tableId).DataTable({
        "autoWidth": false,
        "processing": true,
        "orderClasses": false,
        "deferRender": true,
        "retrieve": true,
        "data": finaldata,
        "dom": "<'row'<'col-sm-5'B>><'hr'><'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        "buttons": [{
            extend: 'copyHtml5',
            text: '<i class="fas   text-info fa-file"></i>',
            titleAttr: 'Copy',
        },
        {
            extend: 'csvHtml5',
            title: type.toUpperCase(),
            text: '<i class="fas  text-warning fa-file-alt"></i>',
            titleAttr: 'CSV',
        },
        {
            extend: 'excelHtml5',
            title: type.toUpperCase(),
            text: '<i class="fas text-success fa-file-excel"></i>',
            titleAttr: 'EXCEL',
        },
        {
            extend: 'pdfHtml5',
            title: type.toUpperCase(),
            text: '<i class="fas text-danger fa-file-pdf"></i>',
            titleAttr: 'PDF',
            orientation: 'landscape',
        }],
        "language": {
            "search": '<i class="fa fa-search"></i>',
            "searchPlaceholder": "search",
            "paginate": {
                "previous": '<i class="fa fa-angle-left"></i>',
                "next": '<i class="fa fa-angle-right"></i>'
            }
        },
        "lengthMenu": [[10, 20, 30, 40, -1], [10, 20, 30, 40, "All"]],
        "columns": columns,
    })
}

function openBarChart(url) {

    $.get(`${apiUrl+url}?${getParams()}`, function (data) {

        let res = data.data[0];

        let chartFinalData = {}

        if(url == 'student_daily_attendance') {
            chartFinalData.labels = ['Present', 'Absent', 'Not Synced'];
            chartFinalData.today = [res.present, res.absent, res.notsynced];
            chartFinalData.yesterday = [res.y_present, res.y_absent, res.y_notsynced];
        }
        else {
            chartFinalData.labels = ['Synced', 'Not Synced'];
            chartFinalData.today = [res.synced, res.notsynced];
            chartFinalData.yesterday = [res.y_synced, res.y_notsynced];
        }

        if (stackedBar != null) stackedBar.destroy();

        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = {
            labels  : chartFinalData.labels,
            datasets: [
                {
                    label               : 'Today',
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : chartFinalData.today
                },
                {
                    label               : 'Yesterday',
                    backgroundColor     : 'rgba(210, 214, 222, 1)',
                    borderColor         : 'rgba(210, 214, 222, 1)',
                    pointRadius         : false,
                    pointColor          : 'rgba(210, 214, 222, 1)',
                    pointStrokeColor    : '#c1c7d1',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data                : chartFinalData.yesterday
                },
            ]
            }

        var barChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false
        }

        stackedBar = new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })

            $("#attendance-barchart-modal").modal('show');
    })
}
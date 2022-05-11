let filterData = null;

let academicYear = null;

let stackedBar = null;

let dateParamsForStudentAnalysis = null;

let dateParamsForIrregularAbsent = null;

let presentParams = null;

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
    updateIrregularAbsentTile();
    updateStuAttAnalysisTile();

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
    updateIrregularAbsentTile();
    updateStuAttAnalysisTile();

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
    updateIrregularAbsentTile();
    updateStuAttAnalysisTile();

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
        updateIrregularAbsentTile();
        updateStuAttAnalysisTile();

    })

})

$("#school").change(function () {

    updateDailyAttendanceTile();
    updateSyncedTile();
    updateIrregularAbsentTile();
    updateStuAttAnalysisTile();

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

function updateStuAttAnalysisTile(startDate='', endDate='', present='') {

    let params = getParams();

    console.log({ params });

    dateParamsForStudentAnalysis = '';

    if(startDate == '' || endDate == ''){

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        dateParamsForStudentAnalysis = `&start=${yyyy}-${mm}-01&end=${yyyy}-${mm}-${dd}`;
    }
    else{
        dateParamsForStudentAnalysis = `&start=${startDate}&end=${endDate}`;
    }

    $.get(`${apiUrl}student_attendance_analysis?${params+dateParamsForStudentAnalysis}`, function (data) {

        console.log(data);

        let stuData = data.data[0];

        $("#stu-att-analysis").html(`
        <tbody>
        <tr>
            <td class="text-center">Total</td>
            <td class="text-center">${stuData.total}</td>
        </tr>
        <tr>
            <td class="text-center">100% - 91%</td>
            <td class="text-center">${stuData.green}</td>
        </tr>
        <tr>
            <td class="text-center">90% - 81%</td>
            <td class="text-center">${stuData.lgreen}</td>
        </tr>
        <tr>
            <td class="text-center">80% - 61%</td>
            <td class="text-center">${stuData.yellow}</td>
        </tr>
        <tr>
            <td class="text-center">60% - 41%</td>
            <td class="text-center">${stuData.orange}</td>
        </tr>
        <tr>
            <td class="text-center">40% - 1%</td>
            <td class="text-center">${stuData.red}</td>
        </tr>
        </tbody>
        `)
    }).catch(function (err) {
        console.log(err);
        $("#tile-synced").html(`<h5 class="text-center">No data found</h5>`);
    })

}


function updateIrregularAbsentTile(startDate='', endDate='', percent='') {

    let params = getParams();

    console.log({ params });

    dateParamsForIrregularAbsent = '';


    if(startDate == '' || endDate == '' || percent == ''){

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        presentParams = '5';
        dateParamsForIrregularAbsent = `&start=${yyyy}-${mm}-01&end=${yyyy}-${mm}-${dd}`;
    }
    else{
        presentParams = present
        dateParamsForIrregularAbsent = `&start=${startDate}&end=${endDate}`;
    }

    presentParams = 5;

    $.get(`${apiUrl}student_irregular_absence?${params}&percent=${presentParams}${dateParamsForIrregularAbsent}`, function (data) {

        console.log(data);

        let stuData = data.data[0];

        $("#irregular-absent-tile").html(`
        <thead>
            <tr>
                <th class="text-center">Boys</th>
                <th class="text-center">Girls</th>
                <th class="text-center">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-center">${stuData.boys}</td>
                <td class="text-center">${stuData.girls}</td>
                <td class="text-center">${stuData.total}</td>
            </tr>
        </tbody>
        `)
    }).catch(function (err) {
        console.log(err);
        $("#irregular-absent-tile").html(`<h5 class="text-center">No data found</h5>`);
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

    if(type == 'yesterday') y_data = {}

    tableData.forEach(function (item) {

        let data = {}

        let y_data = [];

        Object.keys(item).forEach(function (key) {

            if(type == 'today'){

                if(key.includes('y_')){
                    delete data[key];
                }
                else {
                    data[key] = item[key];
                }
            }
            else{
                if(key.includes('y_')){
    
                    y_data[key] = item[key];
    
                }
                else {
                    data[key] = item[key];
                }
            }
            
        });
        
        if(type == 'today'){
            //for today data
            finaldata.push(data);
        }
        else{
            //for yesterday data
            Object.keys(y_data).forEach(function(key){
                //change yesterday to normal key
                data[key.split('y_')[1]] = y_data[key];
            })
            finaldata.push(data);
        }

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
                    backgroundColor     : 'rgba(186,192,255,0.9)',
                    borderColor         : 'rgba(186,192,255,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(186,192,255,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(186,192,255,1)',
                    data                : chartFinalData.today
                },
                {
                    label               : 'Yesterday',
                    backgroundColor     : 'rgba(242, 150, 201, 1)',
                    borderColor         : 'rgba(242, 150, 201, 1)',
                    pointRadius         : false,
                    pointColor          : 'rgba(242, 150, 201, 1)',
                    pointStrokeColor    : '#c1c7d1',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(242, 150, 201,1)',
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


function openBarChartStudentAnalysis() {

    $.get(`${apiUrl}student_attendance_analysis?${getParams()+dateParamsForStudentAnalysis}`, function (data) {

        let res = data.data[0];

        let chartFinalData = {}

        chartFinalData.labels = ['100% - 91%','90% - 81%','80% - 61%','60% - 41%','40% - 1%'];
        chartFinalData.data = [res.green, res.lgreen, res.yellow, res.orange, res.red];
        

        if (stackedBar != null) stackedBar.destroy();

        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = {
            labels  : chartFinalData.labels,
            datasets: [
                {
                    label               : 'Percentage',
                    backgroundColor     : 'rgba(186,192,255,0.9)',
                    borderColor         : 'rgba(186,192,255,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(186,192,255,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(186,192,255,1)',
                    data                : chartFinalData.data
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

function generateStudentAnalysisDataTable() {

    $.get(`${apiUrl}student_attendance_analysis_table?${getParams()+dateParamsForStudentAnalysis}`, function(data){

        let finaldata = data.data;

        console.table(finaldata);

        let columns = [];

        let thead = Object.keys(finaldata[0]);

        thead.forEach(function (item) {

            columns.push({'title': item.toUpperCase(), 'data': item});

        });

        if ($.fn.dataTable.isDataTable('#student-analysis-table')) {

            $('#student-analysis-table').DataTable().clear().destroy();               
        
        }

        $('#student-analysis-table').html('');

        $('#student-analysis-table').DataTable({
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
                title: 'student-analysis',
                text: '<i class="fas  text-warning fa-file-alt"></i>',
                titleAttr: 'CSV',
            },
            {
                extend: 'excelHtml5',
                title: 'student-analysis',
                text: '<i class="fas text-success fa-file-excel"></i>',
                titleAttr: 'EXCEL',
            },
            {
                extend: 'pdfHtml5',
                title: 'student-analysis',
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
        });

        $("#student-analysis-modal").modal('show');
    });

}

$("#present").on('change', function () {
    let present = $("#present").val();
    console.log(present);
    updateIrregularAbsentTile('','',present);
})
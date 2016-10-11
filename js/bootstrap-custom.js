$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    //Full calendar plugin
    $('#calendar').fullCalendar({
        /* disable past dates and future dates shows only next 4 weeks */
        viewRender: function(month) {
            var minDate = moment(),
                maxDate = moment().add(4, 'weeks');
            // Past
            if (minDate >= month.start && minDate <= month.end) {
                $(".fc-prev-button").prop('disabled', true);
                $(".fc-prev-button").addClass('fc-state-disabled');
            } else {
                $(".fc-prev-button").removeClass('fc-state-disabled');
                $(".fc-prev-button").prop('disabled', false);
            }
            // Future
            if (maxDate >= month.start && maxDate <= month.end) {
                $(".fc-next-button").prop('disabled', true);
                $(".fc-next-button").addClass('fc-state-disabled');
            } else {
                $(".fc-next-button").removeClass('fc-state-disabled');
                $(".fc-next-button").prop('disabled', false);
            }
        },
        aspectRatio: 1.5,
        header: {
            left: 'today',
            center: 'prev title next',
            right: 'month,agendaDay'
        },
        defaultView: 'month',
        events: 'full_cal/cal.json',
        dayClick: function(date, jsEvent, view) {

            if (view.name === "month") {
                $('#calendar').fullCalendar('gotoDate', date);
                $('#calendar').fullCalendar('changeView', 'agendaDay');
                $(".check-event-btn").delay(800).fadeIn(500);
                $(".fc-prev-button").prop('disabled', true);
                $(".fc-prev-button").addClass('fc-state-disabled');
                $(".fc-next-button").prop('disabled', true);
                $(".fc-next-button").addClass('fc-state-disabled');
            }
        },
        views: {
            agenda: {
                allDaySlot: false,
                minTime: "06:00:00"
            }
        },
        eventRender: function(event, element, view) {


            var dataToFind = moment(event.start).format('YYYY-MM-DD');
            $("td[data-date='" + dataToFind + "']").addClass('activeDay');
        }
    }).on('click', '.fc-agendaDay-button', function() {
        $(".check-event-btn").delay(800).fadeIn(500);

    });

    /* end full calendar plugin */

    /* show actual date on left panel */
    var date = new Date();
    var todayDay = date.getDate();
    var todayDayId = date.getDay();
    var dayNames = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    document.querySelector(".details-day").innerHTML = todayDay;
    document.querySelector(".details-day-name").innerHTML = dayNames[todayDayId];

    /* add event to json file */
    $('form.ajax').on('submit', function(e) {
        e.preventDefault();
        var selectDay = $("#select-day");
        var startHour = $("#start-hour");
        var endHour = $("#end-hour");
        var params = {
            selectDay: selectDay.val(),
            startHour: startHour.val(),
            endHour: endHour.val(),
        }
        if ((params.selectDay != "") && (params.startHour != "") && (params.endHour != "")) {
        $.ajax({
            type: 'POST',
            data: params,
            url: 'full_cal/save_to_json.php',

            success: function(data) {
                alert('Termin został poprawnie dodany');
                window.location.reload(true);
            },
            error: function(data) {
                alert('UPS, wystąpił błąd');
            },
            complete: function() {
                console.log('Complete');
            }
        });
        } else {
                if (params.selectDay === "") {
                    alert("Musisz wybrać dzień korepetycji");

                } else if (params.startHour === "") {
                    alert("Musisz podać godzinę rozpoczęcia");

                } else if (params.endHour === "") {
                    alert("Musisz podać godzinę zakończenia");

                } 
            }
        return false;
    });

/* datepicker and timepicker */
    $('#select-day').datepicker({
        dateFormat: "yy-mm-dd"
    });
    $('#start-hour').timepicker({ 'step': 15, 'forceRoundTime': true, 'timeFormat': 'H:i', 'disableTimeRanges': [['0am', '5:59am']] });
    $('#end-hour').timepicker({ 'step': 15, 'forceRoundTime': true, 'timeFormat': 'H:i', 'disableTimeRanges': [['0am', '5:59am']] });
/*reload page after click on month or day button */
$(".fc-month-button ").click(function(event) {
	window.location.reload(true);
});

});
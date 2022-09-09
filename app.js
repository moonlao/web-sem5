

// CHECK LEAP YEAR
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre']

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

//GENERATE CALENDAR

generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    calendar_days.innerHTML = ''
    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    let first_day = new Date(month, year, 1)
    
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            //possible bug line up
            if (i - first_day.getDay() + 1 === currDate.getDay() && year === currDate.getFullYear() && month
            === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year =  {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

// DARK MODE TOGGLE
let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}





//////////////////


// var dateFrom = null;
// var dateTo = null;

// $("#from").val('06/10/2015');
// $("#to").val('10/10/2015');
// var selectedDate = null;
// var tempDateFrom = null;
// var tempDateTo = null;
// $(".datepicker").datepicker({
//     minDate: 0,
//     numberOfMonths: [2,1],
//     defaultDate: '06/10/2015',
//     beforeShowDay: function(date) {           
//         dateFrom = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#from").val());
//         dateTo = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#to").val());
        
//         if(dateFrom != null){
//             if(date.getTime() == dateFrom.getTime()){
//                 return [true,"dateFrom"];                     
//             }
//         }
//         if(dateTo != null){
//             if(date.getTime() == dateTo.getTime()){
//                 return [true,"dateTo"];
//             } 
//         }   
//         return [true, dateFrom && ((date.getTime() == dateFrom.getTime()) || (dateTo && date >= dateFrom && date <= dateTo)) ? "dp-highlight" : ""];   
//     },
//     onSelect: function(dateText, inst) {
//         console.log('onSelect');
//         dateFrom = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#from").val());
//         dateTo = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#to").val());
//         selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);               
//         if (!dateFrom || dateTo) {
//             $("#from").val(dateText);
//             $("#to").val("");
//             $(this).datepicker();
//         } else if( selectedDate < dateFrom ) {
//             $("#to").val( $("#from").val() );
//             $("#from").val( dateText );
//             $(this).datepicker();
//         } else {
//             $("#to").val(dateText);
//             $(this).datepicker();
//         }           
//         setTimeout(function() {                
//             highlightBetweenDates(); 
//         }, 0); 
//     },
//     refresh: function() {
//        alert('sdfdsf');
//     }
// });


// var currentDate = null;
// var allTds = null;

// function highlightBetweenDates() {
//     if(dateFrom == null || dateTo == null ){ 
//         $(".ui-datepicker-calendar td").mouseover(function() {
//             if(dateFrom != null && !$(this).hasClass('ui-datepicker-unselectable')){
//                 currentDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $(this).children().text() + '/' + (parseInt($(this).attr('data-month'))+1) + '/' + parseInt($(this).attr('data-year')));
//                 if(currentDate != selectedDate){
//                     if (selectedDate === null) {
//                         selectedDate = new Date();
//                     }
//                     allTds = $('.ui-datepicker').find('td');            
//                     allTds.removeClass('dp-highlight')
//                     found = false;
//                     if (currentDate < selectedDate) {
//                         for (i = 0; i < allTds.length; i++) {
//                             if (allTds[i] == this) {
//                                 found = true;
//                             }
//                             if ($(allTds[i]).hasClass('ui-datepicker-current-day')) {
//                                 break;
//                             }
//                             if (found) {
//                                 $(allTds[i]).addClass('dp-highlight');
//                             }
//                         }
//                     } else if (currentDate > selectedDate) {
//                         for (i = 0; i < allTds.length; i++) {
//                             if (found) {
//                                 $(allTds[i]).addClass('dp-highlight');
//                             }
//                             if ($(allTds[i]).hasClass('ui-datepicker-current-day') ) {
//                                 found = true;
//                             }
//                             if (allTds[i] == this) {
//                                 break;
//                             }
//                         }
//                     }                
//                 } else {
//                     console.log('same');  
//                 }    
//             } else {
//                 console.log('NOT');   
//             }    
//         });
//     }  else {
//         $(".ui-datepicker-calendar td").unbind('mouseover');
//         $(".ui-datepicker-calendar td").off('mouseover');
//     } 
// }
// highlightBetweenDates();
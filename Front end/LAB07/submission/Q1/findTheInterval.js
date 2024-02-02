function DayCount(currentDateString, eventDateString) {
    // Set the unit values in milliseconds.
    let msecPerMinute = 1000 * 60;
    let msecPerHour = msecPerMinute * 60;
    let msecPerDay = msecPerHour * 24;
  
    // Set a date and get the milliseconds
    let currentDate = new Date(currentDateString); // startDate.setMonth(8);startDate.setDate(8);startDate.setHours(0, 0, 0, 0);
    let eventDate = new Date(eventDateString);
    let currentDateMsec = currentDate.getTime();
    let eventDateMsec = eventDate.getTime();
  
    // Get the difference in milliseconds.
    let interval = eventDateMsec - currentDateMsec;
  
    // many days from the interval to determine the remainder.
    let days = Math.floor(interval / msecPerDay);
    let reminder = interval - (days * msecPerDay);
  
    //Output: xx days
    //the positive number refers to day left
    //the negative number refers day since
    return days;
  }
  
  let days = DayCount('9/7/2024', '8/7/2024');
  
  document.getElementById("interval1").innerHTML = days;

  let events = [];
  events.push(days);

  /* ==========================================================================
   Student's code here
   ========================================================================== */
   
// code here >
var tr_list = document.getElementsByTagName("tr");
var str = "";
for(var i = 2; i < tr_list.length; i++){
  var dateContent = tr_list[i].childNodes[3].textContent;
  var intervalPointer = tr_list[i].childNodes[5];
  var interval = DayCount(dateContent, "9/07/24");
  intervalPointer.textContent = interval;
  // check log
  str += dateContent + " : " + intervalPointer.textContent + "\n";
}
console.log(str);
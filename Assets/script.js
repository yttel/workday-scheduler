// js for workdayt calendar
// written by Letty Bedard

$(function(){
  
  //  DECLARATIONS 
  let today = moment().format("dddd MMMM Do YYYY");
  let toDoList = [{ //blank list (nothing in local)
    hour: "06",
    task: ""
  },{
    hour: "07",
    task: ""
  },{
    hour: "08",
    task: ""
  },{  
    hour: "09",
    task: ""
  },{
    hour: "10",
    task: ""
  },{
    hour: "11",
    task: ""
  },{
    hour: "12",
    task: ""
  },{
    hour: "13",
    task: ""
  },{
    hour: "14",
    task: ""
  },{
    hour: "15",
    task: ""
  },{
    hour: "16",
    task: ""
  },{
    hour: "17",
    task: ""
  },{
    hour: "18",
    task: ""
  },{
    hour: "19",
    task: ""
  },{
    hour: "20",
    task: ""
  },{
    hour: "21",
    task: ""
  },{
    hour: "22",
    task: ""
  }];
  let storedTasks = JSON.parse(localStorage.getItem("storedList"));

  //  REFERENCES
  let calendarSpot = $("#middlePart");

  //  FUNCTIONS

  function hourTime(time){ //convert 24hr to 12hr
    let timeInt = parseInt(time);
    if (timeInt <= 12){
      return (`${timeInt} a.m.`);
    }
    else {
      return (`${timeInt % 12} p.m.`);
    }
  }

  function addARow(time, words){

    let bgColor;

    let timeComp = Math.sign(parseInt(time) - parseInt(moment().format("HH")));

    switch (timeComp){
      case 0:
        //current hour, color row white
        bgColor = "thisIsNow";
        break;
      case (-1):
        //before current hour, color row lt gray
        bgColor = "beforeNow";
        break;
      case (1):
        //after the current hour, color row lt teal
        bgColor = "afterNow";
        break;
      default: 
        // broken
        bgColor = "pink";
    }
    

    let row = $("<div>")
                .addClass("row w-100 mx-0 hourRow")
                .attr("data-hour", time);
    row.append($("<div>")
                .text(hourTime(time))
                .addClass("col-sm-2 hour text-center w-100 pt-4"));
    row.append($("<div>")
                .addClass("col-sm-6 w-100 textArea")
                .addClass(bgColor)
                .append($("<textarea>")
                  .text(words)
                  .attr({
                    "value": words,
                    "data-hour": time
                  })
                )
              );
              
    let infoText = "";
    
    if (words.length > 0){
      infoText = "SAVED"
    }
    let saveButton = $("<i>")
                      .addClass("far fa-save fa-3x mt-2")
                      .attr("data-hour", time);
    
    saveButton.append($("<p>")
                        .text(infoText)
                        .addClass("text-center m-0")
                        .css("font-size", "1rem"));

    row.append($("<div>")
                .addClass("col-sm-2 w-100 text-center saveButton")
                .append(saveButton));
    
    row.append($("<div>")
                .addClass("col-sm-2 w-100 text-center trashButton")
                .attr("data-hour", time)
                .append($("<i>")
                        .addClass("far fa-trash-alt fa-3x mt-2")
                        .attr("data-hour", time)));
    calendarSpot.append(row);
  }

  function renderCalendar(){
    $("#today").text(today);
    calendarSpot.empty();
    if (storedTasks){
      storedTasks.forEach(function(element){
        addARow(element.hour, element.task);
      });
    }
    else {
      localStorage.setItem("storedList", JSON.stringify(toDoList));

      toDoList.forEach(function(element){
        addARow(element.hour, element.task);
      });
    }
  }

  //takes the text and stores it in the location (string from data-hour attr)
  function makeEntry(text, location){
    let time = parseInt(location);
    storedTasks = JSON.parse(localStorage.getItem("storedList"));
    storedTasks[(time-6)].task = text;
    localStorage.setItem("storedList", JSON.stringify(storedTasks));
    renderCalendar();
  }

  //  EVENT LISTENERS
  $(document).on("click", ".trashButton", function(){
    makeEntry("", $(this).attr("data-hour")); 
  });

  $(document).on("focusout", "textarea", function(){
    makeEntry($(this).val(), $(this).attr("data-hour")); 
  });

  $(document).on("focus", "textarea", function(){
    $(this).parent().next().children().children().text("editing");
  });

  renderCalendar();
  

});
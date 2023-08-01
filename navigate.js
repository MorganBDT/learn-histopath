"use strict";

function startSurvey() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("survey-form").style.display = "block";
}

function submitSurvey() {
  // Add your code here to process the survey data if needed
  // For demonstration purposes, we will just hide the survey form and show the task content
  getRandomImage();
  document.getElementById("intro-text").style.display = "none";
  document.getElementById("survey-form").style.display = "none";
  document.getElementById("task-content").style.display = "block";
  document.getElementById("response-container").style.display = "block";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomImage() {
  let fileList = undefined;
  let file = fetchDirmap().then(file => {
      Papa.parse(file, {
        complete: function(result) {
          fileList = result.data;
          let image = document.getElementById('hist-image');
          image.src = "https://morgan-histopath-96x96.s3.amazonaws.com/" + fileList[getRandomInt(fileList.length - 2)+1][3];
        }
      })
  })
  .catch(error => {
    // Handle any errors that occur during the fetch or parsing process
    console.error("Error fetching or parsing CSV:", error);
  });
//  Papa.parse(file, {
//    complete: function(result) {
//      fileList = result.data;
//      let image = document.getElementById('hist-image');
//      //image.src = "/home/morgan/projects/learn-histopath-backend/data/combined_histopath_subsample/" + fileList[getRandomInt(fileList.length - 2)+1][3];
//      //image.src = "/media/morgan/MT_Backup/datasets/combined_histopath_96x96_subsample/" + fileList[getRandomInt(fileList.length - 2)+1][3];
//      image.src = "https://morgan-histopath-96x96.s3.amazonaws.com/" + fileList[getRandomInt(fileList.length - 2)+1][3];
//    }
//  })
}

function classGuess(className) {
    //alert("You guessed: " + className);
    getRandomImage();
}

function showEndSurveyQuickClick() {
  // TODO record the partial data?
  document.getElementById("survey-form").style.display = "none";
  document.getElementById("task-content").style.display = "none";
  let end_survey_quick_click = document.getElementById('end_survey_quick_click');
  end_survey_quick_click.style.display = 'block';
//  let rating_container = document.getElementById('rating-container');
//  rating_container.style.display = 'none';
//  let image_container = document.getElementById('image-container');
//  image_container.style.display = 'none';
}

//async function fetchDirmap(){
//  let response = await fetch('https://morgan-histopath-96x96.s3.amazonaws.com/histopath_dirmap.csv');
//  let text = await response.text()
//  return text
////  let data = await response.blob();
////  let metadata = {
////    type: 'csv'
////  };
////  let file = new File([data], "histopath_dirmap.csv", metadata);
////  //alert(data)
////  return file
//}

function fetchDirmap() {
  return fetch('https://morgan-histopath-96x96.s3.amazonaws.com/histopath_dirmap.csv')
    .then(response => response.text()) // Get the CSV data as a string
    .then(data => {
      let metadata = {
        type: 'csv'
      };
      let file = new File([data], "histopath_dirmap.csv", metadata);
      return file;
    });
}
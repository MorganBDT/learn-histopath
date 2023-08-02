"use strict";

let imageFileList = undefined

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

function getRandomImage() {

  if (imageFileList === undefined) {
    let fileList = undefined;
    let file = fetchDirmap().then(file => {
        Papa.parse(file, {
          complete: function(result) {
            imageFileList = result.data;
            getRandomImage();
          }
        })
    })
    .catch(error => {
      // Handle any errors that occur during the fetch or parsing process
      console.error("Error fetching or parsing CSV:", error);
    });
  } else {
    let image = document.getElementById('hist-image');
    let idx = getRandomInt(imageFileList.length - 2)+1
    image.src = "https://morgan-histopath-96x96.s3.amazonaws.com/" + imageFileList[idx][3];
    image.setAttribute("data-idx", idx)
  }

  document.getElementById("response-container").style.display = "block";
  document.getElementById("answer-container").style.display = "none";
}

function getImageClass() {
//  let hClass = undefined;
//  let fileList = undefined;
//  let file = fetchDirmap().then(file => {
//      Papa.parse(file, {
//        complete: function(result) {
//          fileList = result.data;
//          let idx = document.getElementById('hist-image').getAttribute("data-idx")
//          hClass = fileList[idx][1]
//          alert(hClass)
//        }
//      })
//  })
//  .catch(error => {
//    // Handle any errors that occur during the fetch or parsing process
//    console.error("Error fetching or parsing CSV:", error);
//  });

  let idx = document.getElementById('hist-image').getAttribute("data-idx")
  return imageFileList[idx][1]
}

function classGuess(guessedClass) {
    let correctClass = getImageClass()
    if (guessedClass == correctClass) {
      document.getElementById("correct-or-not").textContent = "Correct!"
      document.getElementById("correct-or-not").style.color = "green"
    } else {
      document.getElementById("correct-or-not").textContent = "Incorrect!"
      document.getElementById("correct-or-not").style.color = "red"
    }

    let class_map = {
      cancer_colon: "Colon: Cancer",
      normal_colon: "Colon: Normal",
      cancer_breast: "Breast: Cancer",
      normal_breast: "Breast: Normal",
      cancer_lymph: "Lymph node: Cancer",
      normal_lymph: "Lymph node: Normal",
    }

    document.getElementById("correct-or-not").textContent = (guessedClass == correctClass) ? "Correct!" : "Incorrect"
    document.getElementById("subj-answer-para").textContent = "You answered: \"" + class_map[guessedClass] + "\""
    document.getElementById("corr-answer-para").textContent = "Correct answer: \"" + class_map[correctClass] + "\""
    document.getElementById("response-container").style.display = "none";
    document.getElementById("answer-container").style.display = "block";
    //getRandomImage();
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


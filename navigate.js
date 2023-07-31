function startExperiment() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("survey-form").style.display = "block";
}

function submitSurvey() {
  // Add your code here to process the survey data if needed
  // For demonstration purposes, we will just hide the survey form and show the task content
  document.getElementById("survey-form").style.display = "none";
  document.getElementById("task-content").style.display = "block";
}
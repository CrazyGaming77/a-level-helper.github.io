var percentages = {};
var subject;
var learntPercentage;
var consolidatedPercentage;
var topics;
var learntPercentage;
var consolidatedPercentage;
var template;
var fileUploaded = false;


function uploadClick() {
  topics = document.querySelectorAll(".topicLearn").length;
  for (i=0; i<topics; i++) {
    document.querySelectorAll(".topicLearn")[i].checked = false;
    document.querySelectorAll(".topicConsolidate")[i].checked = false;
  }
  document.getElementById("uploadInput").click();
};

function download() {
  fileUploaded = false;
  document.getElementById('uploadButton').disabled = true;
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = 'data:text/plain;charset=utf-8,' + JSON.stringify(percentages);
  link.setAttribute('download', 'progress.txt');
  link.style.display = 'none';
  link.click();
  document.body.removeChild(link);
};

function downloadTemplate() {
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = 'data:text/plain;charset=utf-8,' + JSON.stringify(percentages);
  link.setAttribute('download', 'progress.txt');
  link.style.display = 'none';
  link.click();
  document.body.removeChild(link);
}

function fileSetup(event) {
  file = event.target;
  var reader = new FileReader();
  reader.onload = () => JSONFormat (reader.result);
  reader.readAsText(file.files[0]);
  fileUploaded = true;
  document.getElementById('uploadButton').disabled = false;
};

function JSONFormat(data) {
  percentages = JSON.parse(data);
  if (!(subject in percentages)){
    percentages[subject] = template;
  };
  console.log(percentages);
  learntPercentage = parseInt(percentages[subject].learnt.replace('%', ''));
  consolidatedPercentage = parseInt(percentages[subject].consolidated.replace('%', ''));
  barRefresh();
}

function barRefresh() {
  document.documentElement.style.setProperty('--learntCompleted', percentages[subject].learnt);
  document.getElementById("learntText").innerHTML = percentages[subject].learnt;
  document.documentElement.style.setProperty('--consolidatedCompleted', percentages[subject].consolidated);
  document.getElementById("consolidatedText").innerHTML = percentages[subject].consolidated;
  for (i=0; i<topics+1; i++) {
    if(percentages[subject].topicsLearnt[i]) {
      document.querySelectorAll(".topicLearn")[i-1].checked = true;
    }
  }; 
  for (i=0; i<topics+1; i++) {
      if(percentages[subject].topicsConsolidated[i]) {
        document.querySelectorAll(".topicConsolidate")[i-1].checked = true;
      }
    }; 
};

function learntChange(element) {
  topicNumber = parseInt(element.value);
  if (element.checked) {
    learntPercentage += 100 / topics;
    percentages[subject].learnt = Math.round(learntPercentage).toString() + '%';
    percentages[subject].topicsLearnt[topicNumber] = true;
  } else {
    learntPercentage -= 100 / topics;
    percentages[subject].learnt = Math.round(learntPercentage).toString() + '%';
    percentages[subject].topicsLearnt[topicNumber] = false;
  };
  barRefresh();
};

function consolidatedChange(element) {
  topicNumber = parseInt(element.value);
  if (element.checked) {
    consolidatedPercentage += 100 / topics;
    percentages[subject].consolidated = Math.round(consolidatedPercentage).toString() + '%';
    percentages[subject].topicsConsolidated[topicNumber] = true;
  } else {
    consolidatedPercentage -= 100 / topics;
    percentages[subject].consolidated = Math.round(consolidatedPercentage).toString() + '%';
    percentages[subject].topicsConsolidated[topicNumber] = false;
  };
  barRefresh();
};


//team
var teamParis = [];
var teamHk = [];
var deliveryEmail;

//JIRA
var jiraServerUrl = "";

// templates
var templateHeader = '<!doctype html><html><head><meta charset="utf-8"/><title>Template Delivery</title></head>';
var deliveryTemplateCSS = '<style type="text/css">div{border:thin solid #000;padding:1em;margin-bottom:1em;}b{width:250px;}body{font-size:13px;font-family:"Arial,Verdana"; width:800px;}.caption{border:thin solid #000;text-align:left;background-color:#76923c;font-family:Tekton Pro;color:white;font-size:20px;padding:3px 10px;font-weight:bold;height:20px;}tr{border: thin solid #000000;height:3em;}#project{background-color:#c2d69b}</style>';

//documents
var docTasks = ""; //doc id
var docHistory = "";//doc id
var docBriefModel = "";//doc id
var sheetTaskName = "";
var storageFolder = "";
var rootFolder;

//miscs
var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var emailSubjectPrepend = "//";


Settings = {
  jiraServerUrl: "",
  jiraLoginUrl : "rest/auth/1/session",
  jiraMe : "rest/auth/1/session",
  jiraRestUrl : "rest/api/latest/",
  jiraRestUrlIssue : "issue/",
  jiraCredsToken : ""  
}; //

// hide some internal fct to google
_ = {
  
};

//init function

function init() {
  deliveryEmail = TeamActivities.getEmail("DELIVERY");
};
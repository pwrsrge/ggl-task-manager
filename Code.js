/**
* Main Actions
*
*/
function deliver(row) {
  //select the active row
  if(!row) {
    row = SpreadActivities.getSelectedRow();//SpreadsheetApp.getActiveRange().getRow();
  }
  
  var theSheet = SpreadActivities.getTHEtaskSheet();
  var date = new Date();
  var datas = getDatas(row, theSheet);
  var adname = getItemValue("ADNAME", theSheet, row);
  var status = getItemValue("STATUS", theSheet, row);
  var htmlMessage = "";  
  var producer = getItemValue("PRODUCER", theSheet, row);
  var team = TeamActivities.getTeam(producer);
  
  htmlMessage = templateHeader + deliveryTemplateCSS + deliverTemplate.format(adname,
                                                                              getItemValue("AD ID",theSheet,row),
                                                                              getItemValue("WORK", theSheet, row),
                                                                              getItemValue("AD PREVIEW", theSheet, row),
                                                                              getItemValue("REQUEST & QUICK REMARKS", theSheet, row),
                                                                              getItemValue("DELIVERY CANNOT BE FULLY OK, WHY?", theSheet, row)
                                                                             );
  
  var options = {
    htmlBody: htmlMessage
  };
  // MailApp.sendEmail(deliveryEmail, "MOPROD "+team+" [" +adname + "] >> " + status,' << ', options);
  
  
  var update = updateStatus(status, [adname,"DELIVERY"]);
  if(update[0] != "") {
    MailApp.sendEmail(update[0],update[1],'',options);
    historySave([adname,Session.getActiveUser().getEmail(),update[1]]);
    Browser.msgBox("Mail sent to " + deliveryEmail);
  }
}

function createBrief(row) {
  //select the active row
  if(!row) {
    row = SpreadsheetApp.getActiveRange().getRow(); 
  }
  Logger.log("CreateBrief for row : " + row + " in "+ docTasks + " sheet " + sheetTaskName);
  //get current month
  var date = new Date();
  var currentMonth = date.getMonth() + 1;
  var currentYear = date.getYear();
  var activeRow = row;
  
  //var theFile = SpreadsheetApp.getActiveSpreadsheet();
  // use getByid for testing
  //var theFile = SpreadsheetApp  
  var theSheet = SpreadsheetApp.openById(docTasks).getSheetByName(sheetTaskName);
  
  var adname = getItemValue("ADNAME", theSheet, row);
  var producer = getItemValue("PRODUCER", theSheet, row);
  var status = getItemValue("STATUS", theSheet, row);
  var requestType = getItemValue("REQUEST", theSheet, row);
  var pm = getItemValue("PM", theSheet, row);
  
  if(producer == "") {
    Browser.msgBox(error("PRODUCER_MISSING"));
  } else {
    
    var team = TeamActivities.getTeam(producer);
    testFolder(currentYear, rootFolder);
    
    // create new sheet
    var _file = currentYear + "_" + currentMonth + "_" + adname+"_"+"_"+team+"_"+producer;
    if(!testFile(_file)) {
      //if file doesn't exists, create it
      var source = SpreadsheetApp.openById(docBriefModel);
      var sheet = source.getSheets()[0];
      var theNewSheetApp = SpreadsheetApp.create(_file);
      var targetSheet = sheet.copyTo(theNewSheetApp);
      var refCol = "B";//start at col B
    } else {
      //update file else
      theNewSheetApp = testFile(_file);
      var refColNumber = theNewSheetApp.getSheets()[0].getLastColumn();
      var refCol = getColLetter(refColNumber); // start after last col
      var targetSheet = theNewSheetApp.getSheets()[0]; //get the first sheet
    }
    var theSheetUrl = theNewSheetApp.getUrl(); // get the sheet URL
    
    // get one line
    var rangeOfValues = theSheet.getRange(row, 1, 1,theSheet.getLastColumn()); 
    var values = rangeOfValues.getValues();
    
    //get entities for sheet
    var rangeOfId = theSheet.getRange(2,1,1,theSheet.getLastColumn());
    var ids = rangeOfId.getValues();
    
    // get elt to display in brief
    var targetLines = targetSheet.getRange(1,1,targetSheet.getLastRow(),1); 
    var targetIds = targetLines.getValues();
    
    //add url field to init sheet
    for (var i in ids[0]) {
      if(i == 0) {
        targetSheet.getRange(refCol + "1").setValue(new Date().toString());
      } else {
        if( contains(targetIds,ids[0][i])) {
          var paramRowIndex = getRowIndexForString(targetSheet,ids[0][i] );
          if(paramRowIndex > 0) {
            targetSheet.getRange(refCol + paramRowIndex).setValue(values[0][i]);
          }
        }
      }
    }
    //send email to assignee
    htmlMessage = updateTemplate.format(((refCol == "B") ? "CREATED" : "UPDATED"), theSheetUrl);
    //get the diff between the last col and the previous
    Logger.log(getColLetter(refColNumber-1)+"2:"+getColLetter(refColNumber-1) +""+ targetSheet.getLastRow());
    if(refCol != "B") {
      var diff = getDiff(
        targetSheet.getRange(2,1,targetSheet.getLastRow()),
        targetSheet.getRange(getColLetter(refColNumber-1)+"2:"+getColLetter(refColNumber-1) +""+ targetSheet.getLastRow()),
        targetSheet.getRange(refCol+"2:"+refCol +""+ targetSheet.getLastRow())
        );
    } else {
      var diff = ""; 
    }    
    var options = {
      htmlBody: htmlMessage + "<br />" + diff
    };
    
    var update = updateStatus(status, [adname,producer,pm,requestType]);
    if(update[0] != "") {
      MailApp.sendEmail(update[0],update[1],'',options);
      historySave([adname,Session.getActiveUser().getEmail(),update[1], theSheetUrl]);
      Browser.msgBox("Mail sent to " + producer);
    }
  }
}


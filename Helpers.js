
function getColLetter(id) {
  return pool[id];
}
function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] == obj) {
      return true;
    }
  }
  return false;
}
// DIFF between 2 cols
//@params  range
//@params  range
//@params  range
function getDiff(index, colA, colB) {
  var diff = "";
  var l = index.getValues().length;
  var indexValues = index.getValues();
  var colAValues = colA.getValues();
  var colBValues = colB.getValues();
  var diffCounter = 0;  
  for(var i = 0; i<l;i++) {
    if(compareCells(colAValues[i],colBValues[i])) {
      diff += diffTemplate.format(indexValues[i],colAValues[i],colBValues[i]);
      diffCounter ++;
    }
  }
  diff += "<hr />Diff counted : " + diffCounter + "<br />";
  // Browser.msgBox(areEmpty);
  
  return diff;
}
function compareCells(cell1, cell2) {
  if(!cell1) {
    cell1 = " ";
  }
  if(!cell2) {
    cell2 = " ";
  }
  return (cell1.toString().localeCompare(cell2.toString()) != 0);
}
function testFolder(str, parent) {
  var exists = DriveApp.getFoldersByName(str).hasNext();
  if(!exists && parent != "") {
    parent.createFolder(str);
  }
  return true;
}
function testFile(str) {
  var selectedFile = DriveApp.getFilesByName(str); // only one file
  if(selectedFile.hasNext()) {
    return SpreadsheetApp.openById(selectedFile.next().getId());
  } else {
    return false;
  }
}
function getRowIndexForString(sht, searchKeystr) {
  var rng = sht.getRange(1, 1, sht.getLastRow());
  var data = rng.getValues();
  for (n=0; n<data.length; ++n) {
    //Logger.log(data[n]);
    if (data[n][0] == searchKeystr){
      return n+1;
    };
  }
  return -1;
}
function getColIndexForString(sht, searchKeystr) {
  var rng = sht.getRange(2, 1, 1, sht.getLastColumn());
  var data = rng.getValues()[0];
  for (n=0; n<data.length; ++n) {
    //Logger.log(data[n]);
    if (data[n] == searchKeystr){
      return n+1;
    };
  }
  return -1;
}
function getDatas(row, sheet) {
  var rangeOfValues = sheet.getRange(parseInt(row), 1, 1,sheet.getLastColumn()); 
  var datas = rangeOfValues.getValues();
  return datas;
}
function getItemValue(str, sht, row) {
  var colIndex = getColIndexForString(sht,str);
  var itemValue = sht.getRange(row, colIndex).getValue();
  return itemValue;
}
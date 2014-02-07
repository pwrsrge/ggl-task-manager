function historySave(datas) {
  var historySheet = SpreadsheetApp.openById(docHistory).getSheets()[0];
  historySheet.insertRowAfter(1);
  historySheet.getRange(2, 1).setValue(new Date().toString());
  var datasLength = datas.length;
  for(var i=0; i<datasLength; i++) {
    historySheet.getRange(2, i+2).setValue(datas[i]);
  }
}
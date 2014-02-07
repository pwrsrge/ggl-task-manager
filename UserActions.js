function promptForLineBrief() {
  var response =  Browser.inputBox('Brief', 'Enter the line to create the brief', Browser.Buttons.OK_CANCEL);
  createBrief(response);
}
function promptForLineDeviver() {
  var response =  Browser.inputBox('Delivery', 'Enter the line to deliver', Browser.Buttons.OK_CANCEL);
  deliver(response);
}
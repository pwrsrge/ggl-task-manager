var deliverTemplate = '<p style="width:1000px;"><p class="caption">DELIVERY</p><br>';
deliverTemplate += "<b>ADNAME</b>: <br />{0} ({1})<hr/>";
deliverTemplate += "<b>WORK</b>: <br />{2}<hr />";
deliverTemplate += "<b>AD PREVIEW</b>: <br />{3}<hr />";
deliverTemplate += "<b>REQUEST & QUICK REMARKS</b>: <br />{4}<hr />\n";
deliverTemplate += "<b>DELIVERY CANNOT BE FULLY OK, WHY?</b>: <br />{5}<br />\n</p>";


var updateTemplate = "<u>BRIEF HAS BEEN {0}, see </u> : <br />\n{1}<br/>\n";

var diffTemplate = "<p>At <b>{0}</b> :<br /> (old) {1}\t<div style='background-color:green;'>(new) {2}</div></p>\n";
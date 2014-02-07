//https://developers.google.com/apps-script/guides/services/external


//JIRA CONTROLER
Jira = {
    headers: {
        get: {
            'contentType': 'application/json',
            'Authorization': 'Basic ' + Settings.jiraCredsToken
        },
        post: {
            'contentType': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Settings.jiraCredsToken
        }
    },
    sheet: SpreadsheetApp.openById(docTasks).getSheetByName(sheetTaskName),
    status: {
        connected: false
    },
    Tools: {
        parseResponse: function(response) {
            response.getContentText();
            return JSON.parse(response);
        }
    },
    MessageHandler: {
        getError: function(response) {
            var res = Jira.Tools.parseResponse(response);
            if (res.errorMessages) {
                if (res.errorMessages.length > 0) {
                    return res.errorMessages[0];
                }
            }
            return false;
        }
    },
    PrivateActivities: {
        sendRequest: function(url, options) {
            var r = UrlFetchApp.fetch(url, options);
            // UrlFetchApp.getRequest(url, options);
            Logger.log(r);
            return  r;
        }
    },
    TestActivities: {
        login: function() {
            var options = {
                'method': 'get',
                'headers': Jira.headers.send
            };
            var response = Jira.PrivateActivities.sendRequest(Settings.jiraServerUrl + Settings.jiraMe, options);

            return "Login to JIRA :" + Jira.MessageHandler.getError(response);
        }
    }
};


//functions 
function jiraPublishBanner(row) {
    if (!row) {
        row = SpreadActivities.getSelectedRow();
    }
    if (!Jira.status.connected) {
        Logger.log("not logged !!");
    } else {
        //create banner object
        var banner = VO.banner;
        banner.fields.project.key = getItemValue("CLIENT", Jira.sheet, row);
        banner.fields.parent.key = "ROLEX-374";
        banner.fields.summary = "dqsqsest gdoc" + getItemValue("ADNAME", Jira.sheet, row);
        banner.fields.components = [{id: "10100"}];// getItemValue("*LANGUAGE", Jira.sheet, row)

        //create options
        var options = {
            'method': 'post',
            'headers': Jira.headers.post,
            'payload': JSON.stringify(banner),
            'contentType': 'application/json'
        };

        //send request
        var request = UrlFetchApp.getRequest(Settings.jiraServerUrl + Settings.jiraRestUrl + Settings.jiraRestUrlIssue, options);
        var response = Jira.PrivateActivities.sendRequest(Settings.jiraServerUrl + Settings.jiraRestUrl + Settings.jiraRestUrlIssue, options);
        Logger.log(response);
    }
};

function jiralogin() {
    var options = {
        'method': 'get',
        'headers': Jira.headers.get
    };
    var response = UrlFetchApp.fetch(Settings.jiraServerUrl + Settings.jiraLoginUrl, options);
    if (Jira.MessageHandler.getError(response)) {
        Browser.msgBox("Login error", Jira.Message.getError(response), []);
    } else {
        //continue 
        Logger.log("logged !!");
        Jira.status.connected = true;
    }
}


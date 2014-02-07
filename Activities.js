//define all visibles fcts / methodes

JiraActivities = {
    login: jiralogin,
    logout: "",
    createBanner: jiraPublishBanner,
    test: Jira.TestActivities
};

SpreadActivities = {
    getSelectedRow: function() {
        return SpreadsheetApp.getActiveRange().getRow();
    },
    getTHEtaskSheet: function() {
        return SpreadsheetApp.openById(docTasks).getSheetByName(sheetTaskName);
    }
};

TeamActivities = {
    getEmail: _.Team.getProducerEmail,
    getTeam: _.Team.getProducerTeam
}
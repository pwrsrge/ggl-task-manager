

init();
function test_deliver() {
    deliver(3);
}
function test_brief() {
    createBrief(3);
}
function test_pool() {
    Logger.log(getColLetter(2));
}
function test_history() {
    historySave(["row1", "row2", "row3"]);
}
function test_jiraLogin() {
    Logger.log(Jira.test.login());
}
function test_jiraPublishBanner() {
    jiralogin();
    jiraPublishBanner(3);
}
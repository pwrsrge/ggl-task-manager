_.BannerStatus = {
    sendUpdate: function(status, datas) {
        var mailSubject, email;
        var adname = datas[0];
        var producer = datas[1];
        var requestType = datas[1];
        var pm = datas[3];

        switch (status) {
            case "ASSIGNED":
                mailSubject = emailSubjectPrepend + " " + requestType + " ASSIGNED [" + adname + "] TO " + producer;
                email = TeamActivities.getProducerEmail(producer);
                break;
            case "DONE HK":
            case "DONE PA":
                mailSubject = emailSubjectPrepend + " " + status + " " + requestType + " [" + adname + "]";
                email = TeamActivities.getEmail("DELIVERY");
                break;
            case "PM":
                email = TeamActivities.getEmail(pm);
                break;
        }
        return [email, mailSubject];
    }
};

//BC
function updateStatus(status, datas) {
    return _.BannerStatus.sendUpdate(status, datas);
}

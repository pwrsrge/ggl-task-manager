_.Team = {
    getProducerEmail: function(producer) {
        var email = "";
        switch (producer) {
            case "SERGE":
                email = "snicolas@.com";
                break;
            case "COORD":
                email = "coord-mo@.com";
                break;
            case "DELIVERY":
                email = "snicolas@.com";
                break;
        }
        return email;
    },
    getProducerTeam: function(producer) {
        if (contains(teamParis, producer)) {
            return "PA";
        } else if (contains(teamParis, producer)) {
            return "HK";
        }
    }
};

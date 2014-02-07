_.Team = {
    getProducerEmail: function(producer) {
        var email = "";
        switch (producer) {
            case "SERGE":
                email = "snicolas@datawords.com";
                break;
            case "COORD":
                email = "coord-mo@datawords.com";
                break;
            case "DELIVERY":
                email = "snicolas@datawords.com";
                break;
            case "BLANDINE":
                email = "bdupre@datawords.com";
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
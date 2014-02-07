_.Error = {
    get: function(type) {
        var err;
        switch (type) {
            case "PRODUCER_MISSING":
                err = "Please fill the producer name";
                break;
        }
        return err;
    }
};

function error(type) {
    return _.Error.get(type);
}

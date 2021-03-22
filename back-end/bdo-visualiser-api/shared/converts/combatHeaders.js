exports.convertToEntity = function CombatHeadersEntity(headingId, field, header, isActive) {
    this.headingId = headingId;
    this.field = field;
    this.header = header;

    if(isActive == false)
        this.isActive = 0;
    else
        this.isActive = 1;
}

exports.convertToVM = function CombatHeadersVM(headingId, field, header, isActive) {
    this.headingId = headingId;
    this.field = field;
    this.header = header;

    if(isActive == 0)
        this.isActive = false;
    else
        this.isActive = true;
}
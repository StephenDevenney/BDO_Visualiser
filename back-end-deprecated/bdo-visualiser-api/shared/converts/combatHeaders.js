/*
    ## Combat Header Entity
        headingId - int
        field - string
        header - string
        isActive - int
*/
exports.convertToEntity = function CombatHeadersEntity(combatHeaderViewModel) {
    var isActiveCheck = 0;
    if(combatHeaderViewModel.isActive == true)
        isActiveCheck = 1;

    var headerEntity = {
        headingId: combatHeaderViewModel.headingId,
        field: combatHeaderViewModel.field,
        header: combatHeaderViewModel.header,
        isActive: isActiveCheck
    }

    return headerEntity;
}
/*
    ## Combat Header View Model
        headingId - number
        field - string
        header - string
        isActive - boolean
*/
exports.convertToVM = function CombatHeadersVM(combatHeaderEntity) {
    var isActiveCheck = false;
    if(combatHeaderEntity.isActive == 1)
        isActiveCheck = true;

    var headerVM = {
        headingId: combatHeaderEntity.headingId,
        field: combatHeaderEntity.field,
        header: combatHeaderEntity.header,
        isActive: isActiveCheck
    };

    return headerVM;
}
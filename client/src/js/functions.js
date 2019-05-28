const checkDate = (input) => {
    var currentDate = new Date();
    var inputDate = new Date(input);
    var diffMilliseconds = Math.abs(inputDate.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(diffMilliseconds/86400000);

    if(currentDate > inputDate && diffDays > 1 ){
        return ("expired");
    } else if (diffDays <=30 ){
        return ("almost-expired");
    } else {
        return ('');
    }
}

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const today = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

export { checkDate, desc, getSorting, isEmpty, stableSort, today };
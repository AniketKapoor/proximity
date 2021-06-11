exports.getStudentAccess = () => { }
exports.denyAccess = () => {
    res.errorCode = 3
    res.errorMessage = 'Access denied';
}
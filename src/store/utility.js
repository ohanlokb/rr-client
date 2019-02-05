export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export const setLocal = (email,token,userId,expirationDate) => {
    localStorage.setItem('email',email);
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
    localStorage.setItem('expirationDate',expirationDate);
};

export const getLocal = () => {
    let retObj = {
        email: null,
        token: null,
        userId: null,
        expirationDate: null
    };

    retObj.email = localStorage.getItem('email');
    retObj.token = localStorage.getItem('token');
    retObj.userId = localStorage.getItem('userId');
    retObj.expirationDate = localStorage.getItem('expirationDate');

    return retObj;
};
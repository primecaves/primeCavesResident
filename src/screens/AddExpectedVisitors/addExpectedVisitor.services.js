import API from '../../services/baseApi';

export const fetchExpectedVisitors = (req) => {
    const url = '/getAllVisitors';
    return API.post(url, req);
};

export const addExpectedVisitor = (req) => {
    const url = '/addVisitor';
    return API.post(url, req);
};

export const updateExpectedVisitor = (req) => {
    const url = '/updateVisitor';
    return API.put(url, req);
};

export const deleteExpectedVisitor = (visitorId) => {
    const url = `/deleteVisitor/?id=${visitorId}`;
    return API.delete(url);
};

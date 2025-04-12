import { stringify } from 'query-string';
import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.get('users');
export const updateContest = data =>
  http.patch(`contests/${data.get('contestId')}`, data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('contests', data.formData);
export const changeMark = data => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = data => http.post('getChat', data);
export const dataForContest = data => http.post('dataForContest', data);
export const cashOut = data => http.post('contests/creative', data);
export const updateUser = data => http.post('updateUser', data);
export const newMessage = data => http.post('catalog/message', data);
export const changeChatFavorite = data => http.post('favorite', data);
export const changeChatBlock = data => http.post('blackList', data);
export const getCatalogList = data => http.get('catalog/', data);

export const addChatToCatalog = data => http.post('/catalog/chat', data);

export const createCatalog = data => http.post('/catalog', data);

export const deleteCatalog = ({ catalogId }) =>
  http.delete(`catalog/${catalogId}`);

export const removeChatFromCatalog = ({ catalogId, chatId }) =>
  http.delete(`catalog/chat/${catalogId}/${chatId}`);

export const changeCatalogName = ({ catalogId, catalogName }) =>
  http.patch(`catalog/${catalogId}`, { catalogName });

export const getCustomersContests = data =>
  http.get(`contests/byCustomer?${stringify(data)}`);

export const getActiveContests = data =>
  http.get(`contests/?${stringify(data)}`);

export const getContestById = ({ contestId }) =>
  http.get(`contests/${contestId}`);

export const getOffers = ({ status, page, results }) =>
  http.get(
    `/offers/moderator?status=${status || ''}&page=${page}&results=${results} `
  );

export const updateOffersStatus = ({ id, status }) =>
  http.patch(`/offers/moderator/${id}/status`, { status });

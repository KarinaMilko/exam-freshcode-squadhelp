import { stringify } from 'query-string';
import http from '../interceptor';

export const registerRequest = data => http.post('users/registration', data);
export const loginRequest = data => http.post('users/login', data);
export const getUser = () => http.get('users');
export const updateUser = data => http.post('users/updateUser', data);
export const changeMark = data => http.post('users/changeMark', data);

export const payMent = data => http.post('contests/customer', data.formData);
export const cashOut = data => http.post('contests/creative', data);
export const getActiveContests = data =>
  http.get(`contests/?${stringify(data)}`);
export const getCustomersContests = data =>
  http.get(`contests/customer?${stringify(data)}`);
export const getContestById = ({ contestId }) =>
  http.get(`contests/${contestId}`);
export const updateContest = data =>
  http.patch(`contests/${data.get('contestId')}`, data);
export const dataForContest = data =>
  http.post('contests/dataForContest', data);
export const downloadContestFile = data =>
  http.get(`contests/downloadFile/${data.fileName}`);
export const setNewOffer = data => http.post('contests/setNewOffer', data);
export const setOfferStatus = data =>
  http.post('contests/setOfferStatus', data);

export const newMessage = data => http.post('chat/addMessage', data);
export const getDialog = data =>
  http.get(`chat/getChat/${data.interlocutorId}`);
export const getPreviewChat = () => http.get('chat/getPreview');
export const changeChatBlock = data => http.patch('chat/blackList', data);
export const changeChatFavorite = data => http.patch('chat/favoriteChat', data);
export const getCatalogList = () => http.get('chat/getCatalogs');
export const createCatalog = data => http.post('chat/createCatalog', data);
export const changeCatalogName = data =>
  http.patch('chat/updateNameCatalog', data);
export const deleteCatalog = data =>
  http.delete(`chat/deleteCatalog/${data.catalogId}`);
export const addChatToCatalog = data =>
  http.patch('chat/addNewChatToCatalog', data);
export const removeChatFromCatalog = data =>
  http.patch('chat/removeChatFromCatalog', data);

export const getOffers = ({ moderationStatus, page, results }) =>
  http.get(
    `/offers/moderator?moderationStatus=${
      moderationStatus || ''
    }&page=${page}&results=${results}`
  );
export const updateOffersStatus = ({ id, status }) =>
  http.patch(`/offers/moderator/${id}/status`, { status });
export const getApprovedOffersForCustomer = contestId =>
  http.get(`/offers/customer/${contestId}`);
export const updateOfferStatusByCustomer = ({ id, status }) =>
  http.patch(`/offers/customer/${id}/status`, { status });

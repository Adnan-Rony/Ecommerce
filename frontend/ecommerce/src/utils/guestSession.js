import { v4 as uuidv4 } from 'uuid';

export const getGuestId = () => {
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
};

export const clearGuestId = () => {
  localStorage.removeItem('guestId');
  localStorage.removeItem('guestCart');
};
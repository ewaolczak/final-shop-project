export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? '/images'
    : 'http://localhost:3000/images';

export const PRODUCT_MIN_ORDER = 1;
export const PRODUCT_MAX_ORDER = 10;
export const NAME_MAX_LENGTH = 30;
export const ADDRESS_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 50;
export const PHONE_MIN_LENGTH = 7;
export const PHONE_MAX_LENGTH = 18;

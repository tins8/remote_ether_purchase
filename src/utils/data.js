const LOCAL = false;// false = AWS instance, true = local instance
const baseUrl = LOCAL ? "http://localhost:4000/" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

export const PROD_ADDRESS = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60000;
export const TWO_MINUTES = 120000;

export const getBTC = () => {
  return fetch(`${baseUrl}b`)
  .then(res => res.json());
};

export const getETH = () => {
  return fetch(`${baseUrl}e`)
  .then(res => res.json());
};

export const buyETH = () => {
  return fetch(`${baseUrl}buy`)
  .then(res => res.json());
};

export const getBalance = () => {
  return fetch(`${baseUrl}balance`)
  .then(res => res.json());
};

export const getHistoric = () => {
  return fetch(`${baseUrl}historic`)
  .then(res => res.json());
};

export const extractPriceFields = priceData => {
  return priceData.response.map(t => {
    const sObj = {
        time: new Date(t[0] * 1000),
        low: t[1],
        high: t[2],
        open: t[3],
        close: t[4],
        volume: t[5]
        };
    return sObj;
  });
};

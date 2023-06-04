import {offersByType } from './const';
import { getRandomSliceFromItems } from '../utils';


const getRandomOffersIdsByType = (type) => {
  const currentTypeOffers = getRandomSliceFromItems(
    offersByType.find((currentOffers) => currentOffers.type === type).offers);
  return currentTypeOffers.map((offer) => offer.id);
};

const getOfferById = (type, offerId)=> offersByType.find((el)=>el.type === type).offers.find((offer)=>offer.id === offerId);


export {getRandomOffersIdsByType, getOfferById};

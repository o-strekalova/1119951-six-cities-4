import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.APP;

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

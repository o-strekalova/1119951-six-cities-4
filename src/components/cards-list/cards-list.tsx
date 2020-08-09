import * as React from "react";
import Card from "../card/card";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {Offer, CardClass} from "../../types";

interface Props {
  authorizationStatus: string,
  offers: Array<Offer>,
  cardClass: CardClass,
  onCardTitleClick: (offer: Offer) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onCardHover: (offer: Offer) => void,
}

const CardWrapped = withToggle(Card);

const CardsList: React.FC<Props> = (props:Props) => {
  const {
    authorizationStatus,
    cardClass,
    offers,
    onCardHover,
    onCardTitleClick,
    onFavoriteButtonClick,
  } = props;

  return (
    <React.Fragment>
      {offers.map((offer) => {
        return <CardWrapped
          authorizationStatus={authorizationStatus}
          key={offer.title + offer.id}
          cardClass={cardClass}
          isToggleChecked={offer.isFavorite}
          offer={offer}
          onCardTitleClick={onCardTitleClick}
          onCardHover={onCardHover}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />;
      })}
    </React.Fragment>
  );
};

export default React.memo(CardsList);

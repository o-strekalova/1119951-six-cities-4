import * as React from "react";
import {getRatingPercentage} from "../../utils";
import {Review} from "../../types";

interface Props {
  review: Review,
}

const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const Review: React.FC<Props> = (props: Props) => {
  const {review} = props;
  const {
    text,
    date,
    rating,
    user,
  } = review;

  const avatarClass = user.isSuper ? ` reviews__avatar-wrapper--pro` : ``;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper user__avatar-wrapper` + avatarClass}>
          <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingPercentage(rating) + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={date.getFullYear() + `-` + date.getMonth() + `-` + date.getDate()}> {MONTHS[date.getMonth()] + ` ` + date.getFullYear()}</time>
      </div>
    </li>
  );
};

export default React.memo(Review);

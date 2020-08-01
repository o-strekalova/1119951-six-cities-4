import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const STARS_REVIEWS = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();
    this._commentRef = createRef();
    this._submitButtonRef = createRef();
    this._rating = null;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._validateForm = this._validateForm.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit, id} = this.props;

    evt.preventDefault();

    onSubmit({
      comment: this._commentRef.current.value,
      rating: this._rating,
    }, id);

    this._formRef.current.reset();
    this._submitButtonRef.current.setAttribute(`disabled`, `disabled`);
  }

  _validateForm() {
    if (
      this._rating !== null &&
      this._formRef.current.checkValidity()
    ) {
      this._submitButtonRef.current.removeAttribute(`disabled`);
    }
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        ref={this._formRef}
        onChange={this._validateForm}
        onSubmit={this._handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {STARS_REVIEWS.map((starTitle, i) => {
            let count = STARS_REVIEWS.length - i;

            return (
              <React.Fragment key={count}>
                <input className="form__rating-input visually-hidden" name="rating" value={count} id={count + `-stars`} type="radio" />
                <label htmlFor={count + `-stars`} className="reviews__rating-label form__rating-label" title={starTitle}
                  onClick={() => {
                    this._rating = count;
                  }}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="50" maxLength="300" required
          ref={this._commentRef}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled
            ref={this._submitButtonRef}
          >Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;

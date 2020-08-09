import * as React from "react";

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

interface Props {
  id: string,
  onSubmit: ({comment, rating}: {comment: string; rating: string}, id: string) => void,
}

const STARS_REVIEWS = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

class ReviewForm extends React.PureComponent<Props> {
  private formRef: React.RefObject<HTMLFormElement>;
  private commentRef: React.RefObject<HTMLTextAreaElement>;
  private submitButtonRef: React.RefObject<HTMLButtonElement>;
  private rating: string | null;

  constructor(props: Props) {
    super(props);

    this.formRef = React.createRef();
    this.commentRef = React.createRef();
    this.submitButtonRef = React.createRef();
    this.rating = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit, id} = this.props;

    evt.preventDefault();

    onSubmit({
      comment: this.commentRef.current.value,
      rating: this.rating,
    }, id);

    this.rating = null;
    this.formRef.current.reset();
    this.submitButtonRef.current.setAttribute(`disabled`, `disabled`);
  }

  validateForm() {
    if (
      this.rating !== null &&
      this.formRef.current.checkValidity()
    ) {
      this.submitButtonRef.current.removeAttribute(`disabled`);
    }
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        ref={this.formRef}
        onChange={this.validateForm}
        onSubmit={this.handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {STARS_REVIEWS.map((starTitle, i) => {
            const count = STARS_REVIEWS.length - i;

            return (
              <React.Fragment key={count}>
                <input className="form__rating-input visually-hidden" name="rating" value={count} id={count + `-stars`} type="radio" />
                <label htmlFor={count + `-stars`} className="reviews__rating-label form__rating-label" title={starTitle}
                  onClick={() => {
                    this.rating = String(count);
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
          minLength={MIN_COMMENT_LENGTH } maxLength={MAX_COMMENT_LENGTH } required
          ref={this.commentRef}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled
            ref={this.submitButtonRef}
          >Submit</button>
        </div>
      </form>
    );
  }
}

export default ReviewForm;

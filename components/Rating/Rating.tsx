import styles from "./Rating.module.css";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import StarIcon from "./Star.svg";
import { useEffect, useState, KeyboardEvent, useRef } from "react";
import { forwardRef, ForwardedRef } from "react";

export const Rating = forwardRef(
  (
    { isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    const raitingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) return -1;
      if (!rating && i == 0) return tabIndex ?? 0;
      if (rating == i + 1) return tabIndex ?? 0;
      return -1;
    };

    useEffect(() => {
      construstRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    const construstRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => chandeDisplay(i + 1)}
            onMouseLeave={() => chandeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r) => raitingArrayRef.current?.push(r)}
            role={isEditable ? "slider" : ""}
            aria-invalid={!!error}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-label={isEditable ? "Укажите рейтинг" : "рейтинг " + rating}
            aria-valuemin={1}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    const chandeDisplay = (i: number): void => {
      if (!isEditable) return;
      construstRating(i);
    };

    const onClick = (i: number): void => {
      if (!isEditable || !setRating) return;
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent<HTMLSpanElement>): void => {
      if (!isEditable || !setRating) return;
      e.preventDefault();
      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          setRating(rating < 5 ? rating + 1 : 5);
        }
        raitingArrayRef.current[rating]?.focus();
      } else if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        setRating(rating > 1 ? rating - 1 : 1);
        raitingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        ref={ref}
        {...props}
        className={cn(styles.wrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span className={styles.errorMessage} role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

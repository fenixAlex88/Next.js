import styles from "./Rating.module.css";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import StarIcon from "./Star.svg";
import { useEffect, useState, KeyboardEvent } from "react";
import { forwardRef, ForwardedRef } from "react";

export const Rating = forwardRef(
  (
    { isEditable = false, rating, error, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      construstRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

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
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
            />
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

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>): void => {
      if (!isEditable || !setRating || e.code !== "Space") return;
      setRating(i);
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
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

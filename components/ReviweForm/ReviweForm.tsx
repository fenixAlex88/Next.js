import { ReviweFormProps } from "./ReviweForm.props";
import styles from "./ReviweForm.module.css";
import cn from "classnames";
import { Button, Input, Rating, Textarea } from "..";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/helpers/api";
import { useState } from "react";

export const ReviweForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviweFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("Что-то пошло не так");
      }
    } catch (e) {
      if (e instanceof Error) setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" },
          })}
          className={styles.title}
          placeholder="Заголовок отзыва"
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Заполните текст отзыва" },
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш вызов отправлен</div>
          <div className={styles.successDescription}>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className={styles.close}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Что-то пошло не так, попобуйте обновить страницу.
          <button
            onClick={() => setIsError(undefined)}
            className={styles.close}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};

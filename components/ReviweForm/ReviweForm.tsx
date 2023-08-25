import { ReviweFormProps } from "./ReviweForm.props";
import styles from "./ReviweForm.module.css";
import cn from "classnames";
import { Button, Input, Rating, Textarea } from "..";
import CloseIcon from './close.svg';

export const ReviweForm = ({
  productId,
  className,
  ...props
}: ReviweFormProps): JSX.Element => {
  return (
    <>
     <div
      className={cn(styles.reviewForm, className)}
      {...props}
    >
      <Input placeholder="Имя"/>
      <Input className={styles.title} placeholder="Заголовок отзыва"/>
      <div className={styles.rating}>
        <span>Оценка:</span>
        <Rating rating={0}/>
      </div>
      <Textarea className={styles.description} placeholder="Текст отзыва"/>
      <div className={styles.submit}>
        <Button appearance="primary">Отправить</Button>
        <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
      </div>
    </div>
    <div className={styles.success}>
      <div className={styles.successTitle}>Ваш вызов отправлен</div>
      <div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
      <CloseIcon className={styles.close}/>
    </div>
    </>
   
  );
};

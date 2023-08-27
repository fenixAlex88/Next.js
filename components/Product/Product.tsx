import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Button, Card, Divider, Rating, Review, ReviweForm, Tag } from "..";
import { declOfNum, priceRu } from "../../helpers/helpers";
import Image from "next/image";
import cn from "classnames";
import { useState, useRef, forwardRef, ForwardedRef } from "react";
import { DOMAIN } from "@/helpers/api";
import { motion } from "framer-motion";

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpend, setIsReviewOpend] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      const scrollToReview = () => {
        setIsReviewOpend(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} ref={ref} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span className="visualyHidden">Цена</span>
              {priceRu(product.price)}

              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  <span className="visualyHidden">Скидка</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">Кредит</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес.</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                {"Рейтинг" + product.reviewAvg ?? product.initialRating}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag className={styles.categoryTag} key={c} color="ghost">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden="true">
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden="true">
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, [" отзыв", " отзыва", " отзывов"])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
              {product.characteristics.map((c) => (
                <div className={styles.characteristic} key={c.name}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpend ? "down" : "right"}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpend(!isReviewOpend)}
                aria-expanded={isReviewOpend}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpend ? "visible" : "hidden"}
            variants={variants}
            initial={"hidden"}
          >
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpend ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviweForm isOpened={isReviewOpend} productId={product._id} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);

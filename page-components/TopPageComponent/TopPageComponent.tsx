import { Advantages, HhData, Htag, Product, Sort, Tag, Up } from "@/components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "@/interfaces/page.intrerface";
import { SortEnum } from "@/components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";
import { useReducer, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);

  const setSort = (sort: SortEnum): void => {
    dispatchSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <Up />
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag
            color="gray"
            size="m"
            aria-label={products.length + " элементов"}
          >
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              layout={!shouldReduceMotion}
              product={p}
              key={p._id}
              role="listitem"
            />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length !== 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag color="primary" key={t}>
          {t}
        </Tag>
      ))}
    </div>
  );
};

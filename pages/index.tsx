import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, P, Tag } from "../components";
import { Rating } from "../components/Rating/Rating";
import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.intervace";

function Home({ menu }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  return (
    <>
      <Htag tag="h1">{counter}</Htag>
      <Button
        appearance="ghost"
        arrow="right"
        onClick={() => setCounter((x) => x + 1)}
      >
        Кнопка
      </Button>
      <Button appearance="primary" arrow="down">
        Кнопка
      </Button>
      <P size="l">Большой</P>
      <P size="m">Средний</P>
      <P size="s">Маленький</P>
      <Tag size="s">Маленький</Tag>
      <Tag size="m" color="red">
        Red
      </Tag>
      <Tag size="s" color="green">
        Green
      </Tag>
      <Tag color="primary">Primary</Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

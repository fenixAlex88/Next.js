import { Button, Htag, P, Tag } from "../components";
import { useState } from "react";
import { Rating } from '../components/Rating/Rating';
import { withLayout } from '@/layout/Layout';

function Home(): JSX.Element {
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
      <Rating rating={rating} setRating={setRating} isEditable/>
    </>
  );
}

export default withLayout(Home);
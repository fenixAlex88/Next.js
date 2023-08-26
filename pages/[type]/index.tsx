import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.intervace";
import { firstLevelMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/app.context";
import { API } from '@/helpers/api';

function Type({ menu, firstCategory }: TypeProps): JSX.Element {
  const { setMenu } = useContext(AppContext);
  useEffect(() => {
    setMenu && setMenu(menu);
  }, [menu, setMenu]);
  return <>Type: {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => `/${m.route}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params)
    return {
      notFound: true,
    };
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem)
    return {
      notFound: true,
    };
  const firstCategory = firstCategoryItem.id;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

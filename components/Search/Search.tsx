import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Button, Input } from "..";
import { useState, KeyboardEvent } from "react";
import SearchIcon from "./search.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const searchHandler = (): void => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
    setSearch("");
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Enter") searchHandler();
  };

  return (
    <form className={cn(styles.search, className)} {...props} role='search'>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={searchHandler}
        aria-label='Искать по сайту'
      >
        <SearchIcon />
      </Button>
    </form>
  );
};

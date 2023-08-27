import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { AppContextProvider, IAppContext } from '@/context/app.context';
import cn from 'classnames';

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const skipContantAction = (key: KeyboardEvent): void => {
        if (key.code == "Space" || key.code == "Enter") {
          key.preventDefault();
          bodyRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={0}
        className={cn(styles.skilLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onKeyDown={skipContantAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={ props.menu } firstCategory={ props.firstCategory }>
        <Layout>
        <Component {...props} />
      </Layout>
      </AppContextProvider>
    );
  };
};

import { useScrollY } from "@/hooks";
import styles from "./Up.module.css";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { ButtonIcon } from "..";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        appearance="primary"
        icon="up"
        onClick={scrollToTop}
        title="up"
        aria-label='Наверх'
      />
    </motion.div>
  );
};

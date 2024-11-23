import styles from "./SingleMenu.module.scss";

export const Page = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>{title}</div>
    </div>
  );
};

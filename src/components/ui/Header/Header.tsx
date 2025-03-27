import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.containerHeader}>
      <h1 className={styles.title}>Todo-List App</h1>
    </div>
  );
};

export default Header;

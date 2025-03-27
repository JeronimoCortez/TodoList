import styles from "./SendButton.module.css";

export const SendButton = () => {
  return (
    <div className={styles.sendButton}>
      <img src="./deployed_code.svg" alt="" />
    </div>
  );
};

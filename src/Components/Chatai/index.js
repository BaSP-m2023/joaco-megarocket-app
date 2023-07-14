import styles from './chatai.module.css';

function Chatai() {
  return (
    <div className={styles.container}>
      <div className={styles.oldMessages}></div>
      <div className={styles.writeMessage}>
        <input className={styles.text} type="text" placeholder="type your message here"></input>
      </div>
    </div>
  );
}

export default Chatai;

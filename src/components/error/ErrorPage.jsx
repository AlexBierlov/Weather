import errorImg from '../../img/404-page.jpg';
import styles from './ErrorPage.module.css';
export default function ErrorPage() {
   return (
   <div className={styles.error}>
      <img className={styles.errImg} src={errorImg} alt="errorImg" />
   </div>);
}
import Link from 'next/link';

import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

const name = 'IKUN';
export const siteTitle = 'Next.js blog';

const Layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <header className={`${styles.header}`}>
        {home ? (
          <>
            <img src='/images/profile.png' className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img src='/images/profile.png' className={`${utilStyles.borderCircle}`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}
export default Layout;
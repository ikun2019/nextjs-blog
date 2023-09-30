import Link from 'next/link';
import Head from 'next/head';

import Layout, { siteTitle } from '../components/Layout';
import utilStyle from '../styles/utils.module.css';
import styles from '../styles/Home.module.css';

import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    }
  }
};

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

const Home = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はNextJSエンジニアです。</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>🗒エンジニアのブログ</h2>
        <div className={`${styles.grid}`}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={`${styles.thumbnailImage}`} />
              </Link>
              <Link href={`/posts/${id}`}>
                <span href='/' className={`${utilStyle.boldText}`}>{title}</span>
              </Link>
              <br />
              <small className={`${utilStyle.lightText}`}>{date}</small>
            </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}

export default Home;
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

// マークダウンファイルが入っているパスを取得
const postsDir = path.join(process.cwd(), "posts");

export function getPostsData() {
  const fileNames = fs.readdirSync(postsDir);
  console.log('file name =>', fileNames);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名の取得
    const id = fileName.replace(/\.md$/, "");
    console.log(id);
    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // メタデータを読み取る
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    }
  });
  return allPostsData;
}

export function getAllPostIds() {
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      }
    }
  })
}

// idに基づいてブログ内容を返す関数
export async function getPostData(id) {
  const fullpath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(fullpath, 'utf8');
  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }
}
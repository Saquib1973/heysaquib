import fs from 'fs'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import OnThisPage from '@/components/on-this-page'
import path from 'path'
import FadeInAnimation from '@/components/FadeInAnimation'
const postsDir = path.join(process.cwd(), 'content')

type PageProps = {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: PageProps) {
  const param = await params;
  const { slug } = param;
  // const filepath = `blogs/${slug}.md`
   const newFilePath = path.join(postsDir, `${slug}.mdx`)
  // console.log(filepath);

  if (!fs.existsSync(newFilePath)) {
    console.log("error");
    console.log(newFilePath);
    // notFound()
    // return
  }
      const newFileContents = fs.readFileSync(newFilePath, 'utf8')
  const { data:newData, content:newContent } = matter(newFileContents)
  // const fileContent = fs.readFileSync(filepath, 'utf-8')
  // const { content, data } = matter(fileContent)

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: newData.title || 'Blog Post' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    })

  const newHtmlContent = (await processor.process(newContent)).toString();


  return (
    <FadeInAnimation duration={0.5}>

      <div className="p-2 text-gray-800 dark:text-gray-100">
        {/* Blog Header */}
        <header className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 happymonkey-h1">
            {newData.title}
          </h1>
          <p className="text-gray-500 italic text-lg border-l-4 border-yellow-4 pl-2 mb-2">
            &quot;{newData.description}&quot;
          </p>
          <div className="text-sm text-gray-500 flex gap-2">
            <span className="italic">By {newData.author}</span>
            <span>{newData.date}</span>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex relative flex-col w-full lg:flex-row gap-1">
          {/* Blog Content */}
          <article className="min-w-fit prose dark:prose-invert flex-1">
            <div
              dangerouslySetInnerHTML={{ __html: newHtmlContent }}
              className="p-2"
            />
          </article>
        </div>
      </div>
    </FadeInAnimation>
  )
}

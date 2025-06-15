import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest posts
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, thumbnail } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="xl:grid xl:grid-cols-4 xl:gap-6 xl:items-center">
                    {/* 썸네일 영역 */}
                    {thumbnail && (
                      <div className="xl:col-span-1">
                        <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
                          <img
                            src={thumbnail}
                            alt={`Thumbnail for ${title}`}
                            className="w-full h-40 object-cover rounded-md shadow-sm"
                          />
                        </Link>
                      </div>
                    )}

                    {/* 본문 영역 */}
                    <div className="space-y-4 xl:col-span-3">
                      <div>
                        <h2 className="mb-2 text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tags.sort().map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {/* 전체 보기 링크 */}
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

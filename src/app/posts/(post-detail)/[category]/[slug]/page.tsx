'use client'

import { useEffect } from 'react'
import { Balancer } from 'react-wrap-balancer'
import type { Image, PostModel } from '@mx-space/api-client'

import { ReadIndicator } from '~/components/common/ReadIndicator'
import { useSetHeaderMetaInfo } from '~/components/layout/header/hooks'
import { Markdown } from '~/components/ui/markdown'
import { PostActionAside } from '~/components/widgets/post/PostActionAside'
import { PostMetaBar } from '~/components/widgets/post/PostMetaBar'
import { SubscribeBell } from '~/components/widgets/subscribe/SubscribeBell'
import { TocAside, TocAutoScroll } from '~/components/widgets/toc'
import { XLogInfoForPost, XLogSummaryForPost } from '~/components/widgets/xlog'
import { useCurrentPostData } from '~/hooks/data/use-post'
import { noopArr } from '~/lib/noop'
import { MarkdownImageRecordProvider } from '~/providers/article/MarkdownImageRecordProvider'
import { LayoutRightSidePortal } from '~/providers/shared/LayoutRightSideProvider'
import { WrappedElementProvider } from '~/providers/shared/WrappedElementProvider'

import Loading from './loading'

const useHeaderMeta = (data?: PostModel | null) => {
  const setHeader = useSetHeaderMetaInfo()
  useEffect(() => {
    if (!data) return
    setHeader({
      title: data.title,
      description:
        data.category.name +
        (data.tags.length > 0 ? ` / ${data.tags.join(', ')}` : ''),
      slug: `${data.category.slug}/${data.slug}`,
    })
  }, [
    data?.title,
    data?.category.name,
    data?.tags.length,
    data?.category.slug,
    data?.slug,
  ])
}
const PostPage = () => {
  const data = useCurrentPostData()

  useHeaderMeta(data)
  if (!data) {
    return <Loading />
  }

  return (
    <div>
      <article className="prose">
        <header className="mb-8">
          <h1 className="text-center">
            <Balancer>{data.title}</Balancer>
          </h1>

          <PostMetaBar data={data} className="mb-8 justify-center" />

          <XLogSummaryForPost />
        </header>
        <WrappedElementProvider>
          <MarkdownImageRecordProvider
            images={data.images || (noopArr as Image[])}
          >
            <Markdown
              value={data.text}
              as="main"
              className="min-w-0 overflow-hidden"
            />
          </MarkdownImageRecordProvider>

          <LayoutRightSidePortal>
            <TocAside
              className="sticky top-[120px] ml-4 mt-[120px]"
              treeClassName="max-h-[calc(100vh-6rem-4.5rem-300px)] h-[calc(100vh-6rem-4.5rem-300px)] min-h-[120px] relative"
              accessory={ReadIndicator}
            >
              <PostActionAside className="translate-y-full" />
            </TocAside>
            <TocAutoScroll />
          </LayoutRightSidePortal>
        </WrappedElementProvider>
      </article>

      <SubscribeBell defaultType="post_c" />
      <XLogInfoForPost />
    </div>
  )
}
export default PostPage
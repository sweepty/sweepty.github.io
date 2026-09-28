/** @jsx jsx */
import { jsx, Box, Heading } from "theme-ui"
import { Link } from "gatsby"
import ItemTags from "./item-tags"

type BlogListItemProps = {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }
  showTags?: boolean
}

// 태그 → 제목 → 설명 → 날짜 순으로 보여준다
const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <Box mb={4}>
    {post.tags && showTags && <ItemTags tags={post.tags} />}
    <Link to={post.slug} sx={(t) => ({ ...t.styles?.a, color: `text` })}>
      <Heading as="h2" variant="styles.h3" sx={{ color: `text` }}>
        {post.title}
      </Heading>
    </Link>
    {post.description && <p sx={{ color: `secondary`, mt: 1 }}>{post.description}</p>}
    <p sx={{ color: `secondary`, mt: 1 }}>
      <time>{post.date}</time>
    </p>
  </Box>
)

export default BlogListItem

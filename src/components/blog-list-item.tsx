/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink, Heading } from "theme-ui"
import { Box } from "@theme-ui/components"
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

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  
  <Box>
    {post.tags && showTags && (
        <React.Fragment>
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    <TLink as={Link} to={post.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
    <Heading variant="styles.h4" color='text'>{post.title}</Heading>
    </TLink>
    <p sx={{ color: `secondary`, mt: 1, a: { color: `third` }}}>{post.description}</p>
    <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }}}>
      <time>{post.date}</time>
    </p>
  </Box>
)

export default BlogListItem

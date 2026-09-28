import * as React from "react"
import type { MBPostProps } from "./post"
import Utterances from "./utterances"

// 글 하단에 utterances 댓글을 붙인다
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostFooter = ({ post }: MBPostProps) => <Utterances />

export default PostFooter

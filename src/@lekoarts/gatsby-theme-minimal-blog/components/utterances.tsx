import * as React from "react"
import { useColorMode } from "theme-ui"

const UTTERANCES_SRC = `https://utteranc.es/client.js`
const UTTERANCES_CONFIG = {
  repo: `sweepty/sweepty.github.io`,
  label: `comment`,
  crossorigin: `anonymous`,
  async: `true`,
}
const DARK_THEME = `photon-dark`
const LIGHT_THEME = `github-light`

// 기존 댓글 이슈 제목이 끝 슬래시 없는 전체 URL이라 같은 형태로 맞춘다
// (예: https://sweepty.github.io/optimization-level). 로컬 미리보기에서도 같은 이슈를 찾도록 사이트 주소는 고정한다
const SITE_URL = `https://sweepty.github.io`
const getIssueTerm = () => `${SITE_URL}${window.location.pathname.replace(/\/+$/, ``)}`

// 컬러 모드가 바뀔 때마다 utterances 위젯을 해당 테마로 다시 불러온다
const Utterances = () => {
  const [colorMode] = useColorMode()
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const script = document.createElement(`script`)
    const attributes = {
      ...UTTERANCES_CONFIG,
      src: UTTERANCES_SRC,
      "issue-term": getIssueTerm(),
      theme: colorMode === `dark` ? DARK_THEME : LIGHT_THEME,
    }
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value))

    root.replaceChildren(script)
  }, [colorMode])

  return <div className="utterances" ref={rootRef} />
}

export default Utterances

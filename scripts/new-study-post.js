// 시스템 설계 스터디 글 뼈대를 만든다
// 사용법: npm run new:study -- <권> <시작 장> <끝 장>   (예: npm run new:study -- 2 5 6)
const fs = require(`fs`)
const path = require(`path`)

const ROOT = path.join(__dirname, `..`)
const TEMPLATE_PATH = path.join(ROOT, `templates`, `system-design-study.mdx`)

const parseChapterArgs = (args) => {
  const numbers = args.map((arg) => Number(arg))
  const isValid = numbers.length === 3 && numbers.every((n) => Number.isInteger(n) && n > 0)
  if (!isValid || numbers[1] > numbers[2]) {
    throw new Error(`사용법: npm run new:study -- <권> <시작 장> <끝 장>  (예: npm run new:study -- 2 5 6)`)
  }
  const [vol, from, to] = numbers
  return { vol, from, to }
}

// 같은 날 여러 편을 올려도 순서가 섞이지 않도록 시간까지 넣는다 (KST)
const formatNowKst = () => {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000)
  return `${kst.toISOString().slice(0, 16)}:00+09:00`
}

const main = () => {
  const { vol, from, to } = parseChapterArgs(process.argv.slice(2))
  const postDir = path.join(ROOT, `content`, `posts`, `system-design-interview-vol${vol}-ch${from}-${to}`)
  const postPath = path.join(postDir, `index.mdx`)

  if (fs.existsSync(postPath)) {
    throw new Error(`이미 있는 글입니다: ${path.relative(ROOT, postPath)}`)
  }

  const content = fs
    .readFileSync(TEMPLATE_PATH, `utf8`)
    .replaceAll(`{{VOL}}`, String(vol))
    .replaceAll(`{{FROM}}`, String(from))
    .replaceAll(`{{TO}}`, String(to))
    .replaceAll(`{{DATE}}`, formatNowKst())

  fs.mkdirSync(postDir, { recursive: true })
  fs.writeFileSync(postPath, content)
  process.stdout.write(`만들었어요: ${path.relative(ROOT, postPath)}\n`)
}

try {
  main()
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exit(1)
}

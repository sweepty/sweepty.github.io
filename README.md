# sweepty.github.io

https://sweepty.github.io 블로그 소스입니다.
[`@lekoarts/gatsby-theme-minimal-blog`](https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-minimal-blog) v6 (Gatsby 5, MDX 2, React 18) 기반입니다.

## 브랜치

- `develop`: 소스 (기본 브랜치)
- `master`: 빌드 결과물. `npm run deploy`가 **통째로 덮어쓰므로 직접 커밋하지 않습니다.**

## 개발

Node 18~25가 필요합니다.

```bash
npm install
npm run develop   # http://localhost:8000
npm run build && npm run serve   # 배포본 미리보기 (http://localhost:9000)
npm run deploy    # 빌드 후 master로 배포
```

## 구조

- `content/posts/<slug>/index.mdx`: 블로그 글 (MDX 2 문법. 인라인 HTML의 `style`은 `style={{ ... }}` 객체로 작성)
- `content/pages/`: About 등 페이지
- `static/`: 빌드 결과에 그대로 복사되는 파일
  - `app-ads.txt`, `robots.txt`
  - `goodshotweather/`, `todori/`, `privacy/`, `terms/`: 앱 랜딩·약관 페이지
  - `study/`: 스터디 자료 HTML
- `src/@lekoarts/gatsby-theme-minimal-blog/`: 테마 shadowing
  - 홈 화면(최근 글 목록만), 글 목록 항목, 태그 구분자, 글 상단 태그 숨김
  - `post-footer.tsx` + `utterances.tsx`: 글 하단 utterances 댓글
  - `styles/code.ts`: Swift 코드 블록 라벨

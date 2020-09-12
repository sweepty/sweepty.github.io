import React, { useEffect } from 'react'
import { useColorMode } from "theme-ui"

const src = 'https://utteranc.es/client.js'
const repo = 'sweepty/sweepty.github.io'
const branch = 'master'
const DARK_THEME = 'photon-dark'
const LIGHT_THEME = 'github-light'

export const Utterances = () => {
  const colorMode = useColorMode()
  const rootElm = React.createRef()

  useEffect(() => {
    const isDark = colorMode === `dark`

    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: isDark ? DARK_THEME : LIGHT_THEME,
      label: 'comment',
      async: true,
      'issue-term': 'url',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  })

  return <div className="utterances" ref={rootElm} />
}
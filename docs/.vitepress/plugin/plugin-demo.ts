import MarkdownItContainer from 'markdown-it-container'
import MarkdownIt from 'markdown-it'
import fs from 'fs'
import path from 'path'

export const docRoot = path.resolve(__dirname, '..', '..')

/**
 * 创建 markdown 实例
 *
 * @see markdown-it https://markdown-it.docschina.org
 * @see markdown-it https://juejin.cn/post/6844903688536850440
 */
const markdown = MarkdownIt({
  breaks: true // 转换段落里的 '\n' 到 <br>
})

/**
 * 自定义 md 插件
 *
 * @param { Object } md markdown 实例
 */
export const PluginDemo = (md): void => {
  /**
   * 自定义 md 语法
   *
   * 语法为 ::: demo
   */
  md.use(MarkdownItContainer, 'demo', {
    validate(params: string): boolean {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        const description = m && m.length > 1 ? m[1] : ''

        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        let source = sourceFile

        if (sourceFileToken.type === 'inline') {
          // console.log(`开始加载文件：${sourceFile}`)
          source = fs.readFileSync(
            path.resolve(docRoot, 'components', 'demos', `${sourceFile}.vue`),
            'utf-8'
          )
          // console.log(`加载文件完成: ${sourceFile}`, source);
        }
        // if (!source) throw new Error(`找不到模板文件: ${sourceFile}`)

        const sourceHighlight = '```html\n' + source + '\n```'

        return `<vp-demo
            :demos="demos"
            source="${encodeURIComponent(markdown.render(sourceHighlight))}"
            path="${sourceFile}"
            raw-source="${encodeURIComponent(source)}"
            description="${encodeURIComponent(markdown.render(description))}">
          `
      } else {
        return '</vp-demo>'
      }
    }
  })
}

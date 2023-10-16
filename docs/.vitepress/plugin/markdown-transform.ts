import path from 'path'

export function MarkdownTransform() {
    return {
      name: 'fz-design-md-transform',
      async transform(code, id) {
        if (!id.endsWith('.md')) return
  
        const componentId = path.basename(id, '.md')

        const scriptSetups = `\n<script setup>
  const demos = import.meta.globEager('./demos/${componentId}/*.vue')
</script>
        `
        
        const frontmatterEnds = code.indexOf('---\n\n')
        const firstHeader = code.search(/\n#{1,6}\s.+/)
        const sliceIndex =
          firstHeader < 0
            ? frontmatterEnds < 0
              ? 0
              : frontmatterEnds + 4
            : firstHeader
      
        const formatCode = code.slice(0, sliceIndex) + scriptSetups + code.slice(sliceIndex);
        
        return formatCode;
      },
    }
  }
  
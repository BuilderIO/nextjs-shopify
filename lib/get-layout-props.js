import { resolveBuilderContent } from './resolve-builder-content'

export async function getLayoutProps(targetingAttributes) {
  const theme = await resolveBuilderContent('theme', targetingAttributes)

  return {
    theme: theme || null,
  }
}

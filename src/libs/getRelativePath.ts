import path from 'path';

export const getRelativePath = ({from, to}: {from: string, to: string | undefined}) => {
  if (typeof to === 'string' && to.startsWith('/')) {
    return path.relative(from, to)
  }

  return to
}

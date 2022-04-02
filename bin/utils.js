import pathExists from 'path-exists'
export function exists(p) {
  return pathExists.pathExistsSync(p);
}

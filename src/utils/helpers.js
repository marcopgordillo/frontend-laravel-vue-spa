export function getError (error) {
  console.debug({ error })
  return error.data && error.data.errors ? error.data.errors : error
}

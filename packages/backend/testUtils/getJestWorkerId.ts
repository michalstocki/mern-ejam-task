export function getJestWorkerId():number {
  return parseInt(process.env.JEST_WORKER_ID || '1');
}

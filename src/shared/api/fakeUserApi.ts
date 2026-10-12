export type DemoUser = {
  id: number
  name: string
  role: string
}

const USERS: readonly DemoUser[] = [
  { id: 1, name: '坂本龍馬', role: 'Engineer' },
  { id: 2, name: '西郷隆盛', role: 'Designer' },
  { id: 3, name: '大久保利通', role: 'Product Manager' },
]

// Why not fetch(): 外部 API に繋ぐと、観測した挙動がネットワークの揺れなのか React の仕様なのか
// 切り分けられなくなる。遅延を固定した偽 API にして AbortSignal の扱いだけ本物に合わせる。
export function fetchDemoUser(
  id: number,
  signal: AbortSignal,
  delayMs = 1200,
): Promise<DemoUser> {
  return new Promise<DemoUser>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason)
      return
    }

    const onAbort = () => {
      clearTimeout(timer)
      reject(signal.reason)
    }

    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      const user = USERS.find((candidate) => candidate.id === id)
      if (user === undefined) {
        reject(new Error(`id=${id} のユーザーは存在しない`))
        return
      }
      resolve(user)
    }, delayMs)

    signal.addEventListener('abort', onAbort, { once: true })
  })
}

export const demoUserIds = USERS.map((user) => user.id)

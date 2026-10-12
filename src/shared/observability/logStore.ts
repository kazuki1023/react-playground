export type LogKind = 'setup' | 'cleanup' | 'event' | 'marker'

export type LogEntry = {
  id: number
  time: string
  source: string
  kind: LogKind
  message: string
}

const MAX_ENTRIES = 200

let entries: readonly LogEntry[] = []
let nextId = 0
const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  const ms = String(date.getMilliseconds()).padStart(3, '0')
  return `${hh}:${mm}:${ss}.${ms}`
}

export const logStore = {
  add(source: string, kind: LogKind, message: string) {
    // Why not push: 新しいものを先頭に積み、スクロールせずに最新が読めるようにする。
    const entry: LogEntry = {
      id: nextId++,
      time: formatTime(new Date()),
      source,
      kind,
      message,
    }
    entries = [entry, ...entries].slice(0, MAX_ENTRIES)
    notify()
  },

  clear() {
    entries = []
    notify()
  },

  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  getEntries() {
    return entries
  },
}

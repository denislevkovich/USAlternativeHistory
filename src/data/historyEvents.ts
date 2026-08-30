import spreadsheetEvents from './historyEvents.json'

export type HistoryMode = 'real' | 'alternative'

export type HistorySource = {
  label: string
  url?: string
}

export type HistoryEvent = {
  id: string
  year: number
  yearLabel: string
  title: string
  description: string
  mediaLabel: string
  sources: HistorySource[]
  revealAt: number
}

type RawHistoryEvent = Omit<HistoryEvent, 'id' | 'revealAt'>

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const getRevealLevel = (index: number, total: number) => {
  if (index === 0 || index === total - 1 || index % 8 === 0) return 1
  if (index % 4 === 0) return 1.45
  if (index % 2 === 0) return 3
  return 6
}

const normalizeEvents = (rows: RawHistoryEvent[]): HistoryEvent[] => {
  const usedIds = new Map<string, number>()

  return rows.map((row, index) => {
    const baseId = `${row.year}-${createSlug(row.title)}`
    const occurrence = (usedIds.get(baseId) ?? 0) + 1
    usedIds.set(baseId, occurrence)

    return {
      ...row,
      id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
      sources: row.sources.map((source) => ({
        label: source.label,
        url: 'url' in source ? source.url : undefined,
      })),
      revealAt: getRevealLevel(index, rows.length),
    }
  })
}

export const realHistoryEvents = normalizeEvents(spreadsheetEvents.real)
export const alternativeHistoryEvents = normalizeEvents(
  spreadsheetEvents.alternative,
)

export const historyEvents: Record<HistoryMode, HistoryEvent[]> = {
  real: realHistoryEvents,
  alternative: alternativeHistoryEvents,
}

export const historyDataSource = spreadsheetEvents.source

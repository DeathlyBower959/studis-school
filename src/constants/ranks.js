import { randomRange } from '../utils/numbers'

export default {
  1000000: { title: 'Lexicographer', multiplier: 0 }, // Multiplier must be 0, as it is the max level
  800000: { title: 'Ink Slinger', multiplier: 3 },
  650000: { title: 'Tragedian', multiplier: 2.9 },
  500000: { title: 'Playright', multiplier: 2.8 },
  350000: { title: 'Ghostwriter', multiplier: 2.65 },
  200000: { title: 'Essayist', multiplier: 2.5 },
  150000: { title: 'Vocabulist', multiplier: 2.35 },
  100000: { title: 'Wordsmith', multiplier: 2.20 },
  50000: { title: 'Prodigy', multiplier: 2.05 },
  30000: { title: 'Virtuoso', multiplier: 1.90 },
  20000: { title: 'Savant', multiplier: 1.75 },
  15000: { title: 'Belletrist', multiplier: 1.60 },
  10000: { title: 'Litterateur', multiplier: 1.45 },
  5000: { title: 'Bookworm', multiplier: 1.30 },
  1000: { title: 'Novice', multiplier: 1.15 },
  0: { title: 'Misologist', multiplier: 1 }
}

export const expDelay = 5 * 60 * 1000
export const expToAdd = () => randomRange(20, 95)

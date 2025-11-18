/**
 * Trust Builders - Components that give users confidence that the AI's results
 * are ethical, accurate, and trustworthy.
 * Based on the Shape of AI Trust Builders pattern category.
 */

export { CitationMarks } from './citation-marks'
export type { Citation, CitationMarksProps } from './citation-marks'

export { FootprintsButton } from './footprints-button'
export type {
  FootprintsButtonProps,
  FootprintsData,
  Reviewer,
} from './footprints-button'

export { Caveat } from './caveat'
export type { CaveatItem, CaveatProps } from './caveat'

export { ConsentManager } from './consent-manager'
export type { ConsentItem, ConsentManagerProps } from './consent-manager'

export { DataOwnership } from './data-ownership'
export type { DataCategory, DataOwnershipProps } from './data-ownership'

export { Disclosure } from './disclosure'
export type { DisclosureProps } from './disclosure'

export { IncognitoMode } from './incognito-mode'
export type { IncognitoModeProps } from './incognito-mode'

export { Watermark } from './watermark'
export type { WatermarkProps } from './watermark'

export { TrustPatternLearnMore } from './pattern-learn-more'
export type { TrustPatternLearnMoreProps } from './pattern-learn-more'

/**
 * Inputs - Components that handle user input and interaction.
 * Based on the Shape of AI Inputs pattern category.
 */

export { AutoFill } from './auto-fill'
export type { AutoFillField, AutoFillProps } from './auto-fill'

export { ChainedAction } from './chained-action'
export type { Action, ChainedActionProps } from './chained-action'

export { Describe } from './describe'
export type { DescribeProps, SuggestedPrompt } from './describe'

export { Expand } from './expand'
export type { ExpandProps } from './expand'

export { InlineAction } from './inline-action'
export type { InlineActionProps } from './inline-action'

export { Inpainting } from './inpainting'
export type { InpaintingArea, InpaintingProps } from './inpainting'

export { Madlibs } from './madlibs'
export type { MadlibsProps, MadlibsTemplate } from './madlibs'

export { OpenInput } from './open-input'
export type { OpenInputProps } from './open-input'

export { Regenerate } from './regenerate'
export type { RegenerateProps } from './regenerate'

export { Restructure } from './restructure'
export type { RestructureProps, StructureOption } from './restructure'

export { Restyle } from './restyle'
export type { RestyleProps, StyleOption } from './restyle'

export { Summary } from './summary'
export type { SummaryProps } from './summary'

export { Synthesis } from './synthesis'
export type { SynthesisProps } from './synthesis'

export { Transform } from './transform'
export type { ModalityOption, TransformProps } from './transform'

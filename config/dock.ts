import type { InjectionKey, Ref } from 'vue'
import type { SpringOptions } from '~/composables/useSpringValue'

export type Orientation = 'horizontal' | 'vertical'

export interface DockConfig {
  /** resting icon size in px */
  baseSize: number
  /** icon size when the pointer is dead-centre on it, in px */
  magnification: number
  /** how far (px) the focused icon lifts/bulges out */
  maxLift: number
  /** magnetism reach to either side of an icon, in px (along the main axis) */
  effectRadius: number
  /** gap between icons, in px */
  gap: number
  /** spring physics applied to the magnify factor */
  spring: SpringOptions
}


export const MACOS_DOCK: DockConfig = {
  baseSize: 44,
  magnification: 82,
  maxLift: 14,
  effectRadius: 170,
  gap: 16,
  spring: { mass: 0.1, stiffness: 200, damping: 15 },
};

export interface DockContext {
  /** pointer coordinate along the dock's MAIN axis (clientX or clientY) */
  mousePos: Ref<number>
  orientation: Ref<Orientation>
  config: DockConfig
  showTooltip: Ref<boolean>
}

export const DockKey: InjectionKey<DockContext> = Symbol('dock')

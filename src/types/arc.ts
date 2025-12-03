/**
 * ARC Engine Type Definitions
 */

/**
 * Mode of the center panel:
 * - idle: No input provided, waiting state
 * - summary: Input provided but no spark triggered (neutral summary)
 * - spark: Tension threshold exceeded, spark is generated
 */
export type ArcMode = "idle" | "summary" | "spark";

/**
 * Inferred user emotional/cognitive state
 * Used to compute dynamic threshold for spark generation
 */
export type UserState = "calm" | "uncertain" | "anxious" | "seeking";

/**
 * Response from the ARC Engine evaluation
 */
export interface ArcEngineResponse {
  /** The current mode of the engine */
  mode: ArcMode;
  /** Whether a spark was generated */
  hasSpark: boolean;
  /** Text to display in the center panel */
  centerText: string;
  /** Tension delta between ARC-0 and ARC-1 (0 to 1) */
  delta: number;
  /** Inferred user state */
  userState: UserState;
}

/**
 * Props for individual ARC panels (left/right)
 */
export interface ArcPanelProps {
  /** Label for the panel (e.g., "ARC-0" or "ARC-1") */
  label: string;
  /** Content text to display */
  text: string;
  /** Optional subtitle/description */
  subtitle?: string;
}

/**
 * Props for the center panel
 */
export interface CenterPanelProps {
  /** Current mode of the center panel */
  mode: ArcMode;
  /** Text to display */
  text: string;
  /** Whether a spark is active */
  hasSpark: boolean;
  /** Tension delta value for display */
  delta: number;
}

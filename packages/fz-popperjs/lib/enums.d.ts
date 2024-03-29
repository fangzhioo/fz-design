export declare const top: 'top';
export declare const bottom: 'bottom';
export declare const right: 'right';
export declare const left: 'left';
export declare const auto: 'auto';
export declare type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;
export declare const basePlacements: BasePlacement[];
export declare const start: 'start';
export declare const end: 'end';
export declare type Variation = typeof start | typeof end;
export declare const clippingParents: 'clippingParents';
export declare const viewport: 'viewport';
export declare type Boundary = Element | Element[] | typeof clippingParents;
export declare type RootBoundary = typeof viewport | 'document';
export declare const popper: 'popper';
export declare const reference: 'reference';
export declare type Context = typeof popper | typeof reference;
export declare type VariationPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end';
export declare type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export declare type ComputedPlacement = VariationPlacement | BasePlacement;
export declare type Placement = AutoPlacement | BasePlacement | VariationPlacement;
export declare const variationPlacements: VariationPlacement[];
export declare const placements: Placement[];
export declare const beforeRead: 'beforeRead';
export declare const read: 'read';
export declare const afterRead: 'afterRead';
export declare const beforeMain: 'beforeMain';
export declare const main: 'main';
export declare const afterMain: 'afterMain';
export declare const beforeWrite: 'beforeWrite';
export declare const write: 'write';
export declare const afterWrite: 'afterWrite';
export declare const modifierPhases: ModifierPhases[];
export declare type ModifierPhases = typeof beforeRead | typeof read | typeof afterRead | typeof beforeMain | typeof main | typeof afterMain | typeof beforeWrite | typeof write | typeof afterWrite;

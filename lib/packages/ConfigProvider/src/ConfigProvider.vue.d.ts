declare const _default: import("vue").DefineComponent<{
    locale: {
        type: import("vue").PropType<import("../../_locale").Language>;
    };
    size: {
        type: import("vue").PropType<import("../../_hooks/use-size").ComponentSize>;
        default: string;
    };
    theme: {
        type: import("vue").PropType<import('../../_hooks/use-theme').Theme>;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    locale?: unknown;
    size?: unknown;
    theme?: unknown;
} & {
    size: import("../../_hooks/use-size").ComponentSize;
    theme: import('../../_hooks/use-theme').Theme;
} & {
    locale?: import("../../_locale").Language | undefined;
}>, {
    size: import("../../_hooks/use-size").ComponentSize;
    theme: import('../../_hooks/use-theme').Theme;
}>;
export default _default;

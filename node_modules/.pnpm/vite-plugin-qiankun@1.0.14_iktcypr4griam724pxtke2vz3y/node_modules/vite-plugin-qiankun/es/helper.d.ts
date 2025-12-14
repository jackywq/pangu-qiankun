export interface QiankunProps {
    container?: HTMLElement;
    [x: string]: any;
}
export declare type QiankunLifeCycle = {
    bootstrap: () => void | Promise<void>;
    mount: (props: QiankunProps) => void | Promise<void>;
    unmount: (props: QiankunProps) => void | Promise<void>;
    update: (props: QiankunProps) => void | Promise<void>;
};
export interface QiankunWindow {
    __POWERED_BY_QIANKUN__?: boolean;
    [x: string]: any;
}
export declare const qiankunWindow: QiankunWindow;
export declare const renderWithQiankun: (qiankunLifeCycle: QiankunLifeCycle) => void;
export default renderWithQiankun;

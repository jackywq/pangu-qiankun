import { PluginOption } from 'vite';
export declare type MicroOption = {
    useDevMode?: boolean;
};
declare type PluginFn = (qiankunName: string, microOption?: MicroOption) => PluginOption;
declare const htmlPlugin: PluginFn;
export default htmlPlugin;

/**
 * 响应式命名空间
 */
declare namespace Reactive {
    /**
     * 创建一个可观测的对象，通过数据劫持的方式，进行响应式依赖收集
     * @param target
     * @returns
     */
    function observable<T extends object>(target: T): T;
    /**
     * 绑定响应函数
     * @param target
     * @param fn
     */
    function reaction(watch: () => any, fn: (newValue: any) => void): void;
}
declare const observable: typeof Reactive.observable, reaction: typeof Reactive.reaction;
export { observable, reaction };
export default Reactive;

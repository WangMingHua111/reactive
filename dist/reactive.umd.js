(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactive = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 响应式命名空间
     */
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Reactive;
    (function (Reactive) {
        /**
         * 通过对象引用收集依赖
         */
        const targetMap = new WeakMap();
        /**
         * 正在绑定的响应函数
         */
        let activeReactiveFn = undefined;
        /**
         * 响应式依赖对象
         */
        class Dependency {
            constructor() {
                // 响应式函数数组
                // eslint-disable-next-line @typescript-eslint/naming-convention
                this._fns = new Set();
            }
            // 添加响应式函数
            add(fn) {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { _fns } = this;
                _fns.add(fn);
            }
            // 触发响应式函数
            notify(newValue, oldValue) {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { _fns } = this;
                for (const fn of _fns) {
                    fn(newValue, oldValue);
                }
            }
            // 解析依赖对象
            // eslint-disable-next-line @typescript-eslint/member-ordering
            static resolve(target, property) {
                if (!targetMap.has(target))
                    targetMap.set(target, new Map());
                const dependencyMap = targetMap.get(target);
                if (!dependencyMap.has(property))
                    dependencyMap.set(property, new Dependency());
                const dependency = dependencyMap.get(property);
                return dependency;
            }
        }
        /**
         * 创建一个可观测的对象，通过数据劫持的方式，进行响应式依赖收集
         * @param target
         * @returns
         */
        function observable(target) {
            const proxy = new Proxy(target, {
                get(target, property, receiver) {
                    const dependency = Dependency.resolve(target, property);
                    // 依赖收集
                    activeReactiveFn && dependency.add(activeReactiveFn);
                    return Reflect.get(target, property, receiver);
                },
                set(target, property, newValue, receiver) {
                    var _a;
                    const oldValue = Reflect.get(target, property, receiver);
                    const result = Reflect.set(target, property, newValue, receiver);
                    // 触发响应式执行
                    (_a = Dependency.resolve(target, property)) === null || _a === void 0 ? void 0 : _a.notify(newValue, oldValue);
                    return result;
                },
            });
            return proxy;
        }
        Reactive.observable = observable;
        /**
         * 绑定响应函数
         * @param target
         * @param fn
         */
        function reaction(watch, fn) {
            activeReactiveFn = fn;
            watch();
            activeReactiveFn = undefined;
        }
        Reactive.reaction = reaction;
    })(Reactive || (Reactive = {}));
    const { observable, reaction } = Reactive;
    var Reactive$1 = Reactive;

    exports["default"] = Reactive$1;
    exports.observable = observable;
    exports.reaction = reaction;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

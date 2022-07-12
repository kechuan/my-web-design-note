const isObject = (value) => typeof value === 'object';
// 前提 共同判断语句 
const extend = Object.assign;
//Object.assign() 方法将所有的key做一次交集U合并

//用来实现new proxy(target,handler)流程
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        //proxy + reflect
        const res = Reflect.get(target, key, receiver); //target[key]的获取
        if (!isReadonly) { //只读属性判别
            return;
        }
        if (shallow) { //浅数据直接不处理放行
            return res;
        }
        if (isObject(res)) { //对于对象来说 Vue3会根据对象每个值 逐步判断放行 
            return isReadonly ? isReadonly && (res) : reactive(res); //什么是? boolean签名啊 草
        }
        return res;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver); //target[key]	//通过时proxy拦截取get
    };
}
const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const mutableHandlers = {
    get,
    set
};
const shallowReactiveHandlers = {
    get: shallowGet
};
let readonlyObj = {
    set: (target, key) => {
        console.warn(`set is not available on this ${key} function`);
    }
};
const readonlyHandler = extend({
    get: readonlyGet,
}, readonlyObj);
const shallowReadonlyHandler = extend({
    get: shallowReadonlyGet,
}, readonlyObj);

//Vue的4个对象属性API
function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandler);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandler);
}
//区分于浅深 仅读/写入
const reactiveMap = new WeakMap(); //代理映射Map建立 ——reactive表
const readonlyMap = new WeakMap(); //代理映射Map建立 ——readonly表
function createReactiveObject(target, isReadonly, baseHandlers) {
    if (!isObject(target)) { //如果目标不是对象 那只能直接放行掉
        return target;
    }
    //而如果他已经被代理过了,那应该不需要再代理了
    //为什么这么说? 因为vue 内置的对象处理 本来就是多多少少就已经有什么子方法就代理过了 
    //就当是额外的非"base"筛选吧
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const forwarded = proxyMap.get(target);
    if (forwarded)
        return forwarded; //如果本身已被代理转发 则放行
    const proxy = new Proxy(target, baseHandlers); //对target执行代理
    proxyMap.set(target, proxy); //将目标 和 其的代理 记录保存到一个Map上
    return proxy;
}

export { reactive, readonly, shallowReactive, shallowReadonly };

import {isObject} from '@vue/shared/src'

const mutableHandlers = {

}

const shallowReactiveHandlers = {

}

const readonlyHandler = {

}

const shallowReadonlyHandler = {

}

//Vue的4个对象属性API

export function reactive(target){
	return createReactiveObject(target,false,mutableHandlers)
}

export function shallowReactive(target){
	return createReactiveObject(target,false,shallowReactiveHandlers)
}

export function readonly(target){
	return createReactiveObject(target,true,readonlyHandler)
}

export function shallowReadonly(target){
	return createReactiveObject(target,true,shallowReadonlyHandler)
}

//区分于浅深 仅读/写入

const reactiveMap = new WeakMap();	//代理映射Map建立 ——reactive表
const readonlyMap = new WeakMap();	//代理映射Map建立 ——readonly表


export function createReactiveObject(target,isReadonly,baseHandlers){
	if(!isObject(target)){		//如果目标不是对象 那只能直接放行掉
		return target;
	}

	//而如果他已经被代理过了,那应该不需要再代理了
	//为什么这么说? 因为vue 内置的对象处理 本来就是多多少少就已经有什么子方法就代理过了 
	//就当是额外的非"base"筛选吧

	const proxyMap = isReadonly? readonlyMap:reactiveMap;

	const forwarded = proxyMap.get(target);

	if(forwarded) return forwarded;		//如果本身已被代理转发 则放行

	const proxy = new Proxy(target, baseHandlers);	//对target执行代理
	proxyMap.set(target,proxy)	//将目标 和 其的代理 记录保存到一个Map上

	return proxy
}
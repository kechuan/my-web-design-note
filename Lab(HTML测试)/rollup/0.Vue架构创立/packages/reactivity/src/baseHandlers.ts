//用来实现new proxy(target,handler)流程
//以及readonly,与set时的不同回应
import {extend,isObject} from '@vue/shared/src'
import { reactive } from './reactive';

function createGetter(isReadonly = false,shallow = false){//通过时proxy拦截取get
	return function get(target: any,key: any,receiver: any){	
		//proxy + reflect

	const res = Reflect.get(target,key,receiver); //target[key]的获取

		if(!isReadonly){	//只读属性判别
			return
		}

		if(shallow){		//浅数据直接不处理放行
			return res;
		}

		if(isObject(res)){		//对于对象来说 Vue3会根据对象每个值 逐步判断放行 
			return isReadonly?isReadonly&&(res):reactive(res);	//什么是? boolean签名啊 草
		}
		return res;
	} 
	
}
function createSetter(shallow = false){//Set拦截功能
	return function set(target: any,key: any,value: any,receiver: any){

	const result = Reflect.set(target,key,value,receiver); //target[key]	//通过时proxy拦截取get
	}
}	 


const get = createGetter();
const shallowGet = createGetter(false,true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true,true);

const set = createSetter();
const shallowSet = createSetter();

export const mutableHandlers = {
	get,
	set
}

export const shallowReactiveHandlers = {
	get:shallowGet
}

let readonlyObj = {
	set:(target: any,key: any)=>{
		console.warn(`set is not available on this ${key} function`)
	}
}

export const readonlyHandler = extend({
	get:readonlyGet,
}, readonlyObj)

export const shallowReadonlyHandler = extend({
	get:shallowReadonlyGet,
}, readonlyObj)
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Low, JSONFile } from 'lowdb'
import async from 'async'

const __dirname = dirname(fileURLToPath(import.meta.url)); //node-esm环境转换
const dbFile = join(__dirname, '../../database/db.json')   //db.json位置
const adapter = new JSONFile(dbFile)//读写适配器 对接口来说实例了一个json对象 以json方式对待
const db = new Low(adapter)//对db接口来说 则是根据json方式来写入database

// // Set default data
// db.data ||= { posts: [] } // x||=y => x || y(即如果初始有值采用自身 否则采用y)

async function datascan(name,password){
	await db.read() //读取了之后 db目标才会得知现在的json配置信息

	var existList = db.data.posts
	// console.log('this is old one passport data',db.data.posts)
	
	var profile_array = []
	for(let profile of existList){
	   //第一层遍历 profile
	  profile_array.push(profile.passport)	//获取passport列表
	}

	
	const passport_dulipcate_judge = (string) => string != name //不等于name时返回true


	
	var exists_result = !profile_array.every(passport_dulipcate_judge) //那么存在则和上文反向非
	
	//账号存在 密码开始确认
	if(exists_result){
		// var password_result = false
		console.log(exists_result)
		var login_passport = db.data.posts[db.data.posts.findIndex(x => x.passport === `${name}`)]
		
		if(login_passport.password === password){
			// password_result = true
			
			console.log('auth_pass')
			return 'succ'
		
		}

		else{
			console.log('wrong')
			return 'wrong'
			//密码错误
		}
	}
		
	else{
		console.log('not exist')
		return 'not exist'
	}

	// return exists_result
}

async function datawrite(new_name,new_password){
	await db.read()
	// Set default data
	db.data ||= { posts: [] } // x||=y => x || y(即如果初始有值采用自身 否则采用y)

	var existList = db.data.posts
	
	console.log('This is old one',existList) 

	existList.push({"id":existList.length+1,"passport":new_name,"password":new_password});  //中间层json写入
	db.write()
	console.log('This is new one',existList)
	
}

export {datawrite,datascan}
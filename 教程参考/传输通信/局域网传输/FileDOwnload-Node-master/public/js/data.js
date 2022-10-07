import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Low, JSONFile } from 'lowdb'
import async from 'async'

const __dirname = dirname(fileURLToPath(import.meta.url)); //node-esm环境转换
const dbFile = join(__dirname, '../../database/db.json')   //db.json位置
const adapter = new JSONFile(dbFile)//读写适配器 对接口来说实例了一个json对象 以json方式对待
const db = new Low(adapter)//对db接口来说 则是根据json方式来写入database

// Set default data
db.data ||= { posts: [] } // x||=y => x || y(即如果初始有值采用自身 否则采用y)

async function datawrite(){
	await db.read() //读取了之后 db目标才会得知现在的json配置信息

	let existList = await db.data.posts
	console.log('this is old one passport data',db.data.posts)
	let new_name = 'LTV'
	
	var profile_array = []
	for(let profile of existList){
	   //第一层遍历 profile
	  console.log(profile.passport)
	  profile_array.push(profile.passport)	//获取passport列表
	}

	const judge = (string) => string != new_name
	var result = profile_array.every(judge)
	console.log(result)

	if(result){
		existList.push({"id":existList.length+1,"passport":new_name});  //中间层json写入
		console.log('this is new one passport data',db.data.posts)
	}
	
	await db.write() //真实写入json文件
}

export {datawrite}
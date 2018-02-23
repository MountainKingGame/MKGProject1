declare module xls
{
	/**
	 * ## 对应配置表monsterGroup.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterGroupInfo extends IItemBaseInfo
	{
		/**
		* ### 怪物组ID 
		*/
		id:number;

		/**
		* ### 怪物组队名 
		*/
		name:string;

		/**
		* ### 怪物成员boss的ID 
		*/
		monster_boss_id:number;

		/**
		* ### boss血条显示条数 
		*/
		monster_boss_blood_count:number;

		/**
		* ### 奖励输出方式 
		*/
		reward_mode:number;

		/**
		* ### 素材 
		* >索引表针对该字段做了“link”类型的二维数据索引，link为直接映射方式，实际输出数据类型会更改为映射字段的类型，值也会替换为映射字段值
		* 该例中可通过res直接访问数据
		* 
		* ----
		* ### 映射关联:monsters.xls
		* >
		* >索引字段 id,映射字段 res:
		* `monster_avatars_id	<===>	res`
		* 加载的素材编号
		* ***monsters表字段列表:***
		* 
		* > |id|name|res|res_heroes|level|phy|mentality|agile|body|hp|ac|ad|parry|mc|md|crit|speed|skill|profession|
		* |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
		* |int|string|int|int|int|int|int|int|int|int|int|int|int|int|int|int|int|string|int| 
		*/
		monster_avatars_id:number;

		/**
		* ### 怪物等级 
		*/
		monster_lv:number;

		/**
		* ### 怪物成员 
		* >索引表针对该字段做了“info”类型的二维数据索引，同时保留原始关联数据，实际项目中使用概率较为频繁，规则为关联字段名加“$”作为前缀
		* 该例中关联数据可通过$monsters获得
		* 
		* ----
		* ### 索引关联:$monsters 
		*/
		monsters:number[];

		/**
		* ### 怪物站位 
		*/
		monster_pos:number[];

		/**
		* ### 该组怪掉落奖励 
		* >掉落奖励包概率结构定义。
		* 数组“;”号隔开，字段“,”号隔开,特殊需求需求分隔符可自定义，在[]中定义。
		* 数据安全严谨性考虑不建议使用字符串类型，如果有大量字符描述类可以使用多维表关联替代，定义结构类主要是解决大量随机性数据而设计
		* 该例中的数据可直接通过monster_reward字段获取
		* 
		* ----
		* ### 定义关联:monsterRewardProbabilityDef.xls
		* > ***monsterRewardProbabilityDef表字段列表:***
		* 
		* > |id|monster_reward_prop|probability|
		* |:-:|:-:|:-:|
		* |monsterReward|info|id|uint|uint| 
		*/
		monster_reward:IMonsterRewardProbabilityDefInfo[];

		/**
		* ### 怪物跟踪角色 
		*/
		follow:number;

		/**
		* ### 冒泡对话1 
		*/
		dialogue1:string;

		/**
		* ### 冒泡对话2 
		*/
		dialogue2:string;

		/**
		* ### 间隔时间 
		*/
		dialogue_time:number;

		/**
		* ### 显示用战斗力 
		*/
		battleRating_monsterGroup:number;

		/**
		* ### id 
		* >索引表针对该字段做了“info”类型的二维数据索引，同时保留原始关联数据，实际项目中使用概率较为频繁，规则为关联字段名加“$”作为前缀
		* 该例中关联数据可通过$monsters获得
		* 
		* ----
		* ### 索引关联:monsters.xls
		* >索引字段 id:
		* `$monsters	<===>	id`
		* 
		* ***monsters表字段列表:***
		* 
		* > |id|name|res|res_heroes|level|phy|mentality|agile|body|hp|ac|ad|parry|mc|md|crit|speed|skill|profession|
		* |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
		* |int|string|int|int|int|int|int|int|int|int|int|int|int|int|int|int|int|string|int| 
		*/
		$monsters:IMonstersInfo[];

	}
}

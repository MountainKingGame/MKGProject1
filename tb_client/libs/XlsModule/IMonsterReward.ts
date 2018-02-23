declare module xls
{
	/**
	 * ##配置表monsterReward.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterReward
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterReward.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterReward.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardInfo;

		/**
 		* 通过ID获取MonsterRewardInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardInfo;

		/**
 		* 获取MonsterRewardInfo实例队列.
 		*/
		getItems():IMonsterRewardInfo[];

	}
}

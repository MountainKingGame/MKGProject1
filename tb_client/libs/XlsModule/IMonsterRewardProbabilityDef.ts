declare module xls
{
	/**
	 * ##配置表monsterRewardProbabilityDef.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterRewardProbabilityDef
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardProbabilityDefInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterRewardProbabilityDef.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterRewardProbabilityDef.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardProbabilityDefInfo;

		/**
 		* 通过ID获取MonsterRewardProbabilityDefInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardProbabilityDefInfo;

		/**
 		* 获取MonsterRewardProbabilityDefInfo实例队列.
 		*/
		getItems():IMonsterRewardProbabilityDefInfo[];

	}
}

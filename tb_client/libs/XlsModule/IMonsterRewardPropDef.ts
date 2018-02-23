declare module xls
{
	/**
	 * ##配置表monsterRewardPropDef.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterRewardPropDef
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardPropDefInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterRewardPropDef.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterRewardPropDef.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardPropDefInfo;

		/**
 		* 通过ID获取MonsterRewardPropDefInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardPropDefInfo;

		/**
 		* 获取MonsterRewardPropDefInfo实例队列.
 		*/
		getItems():IMonsterRewardPropDefInfo[];

	}
}

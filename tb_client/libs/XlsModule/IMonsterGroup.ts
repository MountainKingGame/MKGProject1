declare module xls
{
	/**
	 * ##配置表monsterGroup.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterGroup
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterGroupInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterGroup.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterGroup.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterGroupInfo;

		/**
 		* 通过ID获取MonsterGroupInfo实例项.
 		*/
		getItem(id:number):IMonsterGroupInfo;

		/**
 		* 获取MonsterGroupInfo实例队列.
 		*/
		getItems():IMonsterGroupInfo[];

	}
}

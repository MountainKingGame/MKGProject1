declare module xls
{
	/**
	 * ##配置表monsters.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsters
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonstersInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsters.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsters.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonstersInfo;

		/**
 		* 通过ID获取MonstersInfo实例项.
 		*/
		getItem(id:number):IMonstersInfo;

		/**
 		* 获取MonstersInfo实例队列.
 		*/
		getItems():IMonstersInfo[];

	}
}

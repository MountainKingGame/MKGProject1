declare module xls
{
	/**
	 * ##配置表monstersExp.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonstersExp
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonstersExpInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monstersExp.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monstersExp.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonstersExpInfo;

		/**
 		* 通过ID获取MonstersExpInfo实例项.
 		*/
		getItem(id:number):IMonstersExpInfo;

		/**
 		* 获取MonstersExpInfo实例队列.
 		*/
		getItems():IMonstersExpInfo[];

	}
}

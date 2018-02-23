declare module xls
{
	/**
	 * ##配置表tips.xls的表属性.
	 * @author deden-configuration
	*/
	export interface ITips
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载TipsInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取tips.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取tips.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):ITipsInfo;

		/**
 		* 通过ID获取TipsInfo实例项.
 		*/
		getItem(id:number):ITipsInfo;

		/**
 		* 获取TipsInfo实例队列.
 		*/
		getItems():ITipsInfo[];

	}
}

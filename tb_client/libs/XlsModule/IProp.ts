declare module xls
{
	/**
	 * ##配置表prop.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IProp
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载PropInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取prop.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取prop.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IPropInfo;

		/**
 		* 通过ID获取PropInfo实例项.
 		*/
		getItem(id:number):IPropInfo;

		/**
 		* 获取PropInfo实例队列.
 		*/
		getItems():IPropInfo[];

	}
}

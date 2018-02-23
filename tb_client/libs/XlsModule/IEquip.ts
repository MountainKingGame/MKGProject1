declare module xls
{
	/**
	 * ##配置表equip.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IEquip
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载EquipInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取equip.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取equip.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IEquipInfo;

		/**
 		* 通过ID获取EquipInfo实例项.
 		*/
		getItem(id:number):IEquipInfo;

		/**
 		* 获取EquipInfo实例队列.
 		*/
		getItems():IEquipInfo[];

	}
}

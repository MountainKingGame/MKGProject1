declare module xls
{
	/**
	 * ## 对应配置表tips.xls中的数据.
	 * @author deden-configuration
	 */
	export interface ITipsInfo extends IItemBaseInfo
	{
		/**
		* ### id 
		*/
		id:number;

		/**
		* ### 英文提示 
		*/
		prompt:string;

	}
}

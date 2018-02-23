declare module xls
{
	/**
	 * 数据项基本信息.
	 * @author deden-configuration
	 */
	export interface IItemBaseInfo
	{
 		/** 数据ID. */
		id:number;

 		/** 数据名称. */
		name:string;

		/**
 		 * 获取表的类型ID.
 		 */
		getTableId:()=>number;

	}
}

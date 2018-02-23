declare module xls
{
	/**
	 * ## 对应配置表monstersExp.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonstersExpInfo extends IItemBaseInfo
	{
		/**
		* ### id 
		*/
		id:number;

		/**
		* ### 等级 
		*/
		level_monsters:number;

		/**
		* ### 经验 
		*/
		exp_monsters:number;

		/**
		* ### 银币数量 
		*/
		silver:number;

		/**
		* ### 竞技勋章数量 
		*/
		arena_medal:number;

		/**
		* ### 荣誉值 
		*/
		honor:number;

		/**
		* ### 公会贡献（水晶祭坛） 
		*/
		guild:number;

	}
}

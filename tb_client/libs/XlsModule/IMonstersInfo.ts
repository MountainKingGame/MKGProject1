declare module xls
{
	/**
	 * ## 对应配置表monsters.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonstersInfo extends IItemBaseInfo
	{
		/**
		* ### id 
		*/
		id:number;

		/**
		* ### 名称 
		*/
		name:string;

		/**
		* ### 素材 
		* >加载的素材编号 
		*/
		res:number;

		/**
		* ### 英雄素材 
		*/
		res_heroes:number;

		/**
		* ### 等级 
		*/
		level:number;

		/**
		* ### 力量 
		*/
		phy:number;

		/**
		* ### 智力 
		*/
		mentality:number;

		/**
		* ### 敏捷 
		*/
		agile:number;

		/**
		* ### 体质 
		*/
		body:number;

		/**
		* ### 生命 
		*/
		hp:number;

		/**
		* ### 物理攻击 
		*/
		ac:number;

		/**
		* ### 物理防御 
		*/
		ad:number;

		/**
		* ### 格挡 
		*/
		parry:number;

		/**
		* ### 魔法攻击 
		*/
		mc:number;

		/**
		* ### 魔法防御 
		*/
		md:number;

		/**
		* ### 暴击 
		*/
		crit:number;

		/**
		* ### 速度 
		*/
		speed:number;

		/**
		* ### 技能 
		*/
		skill:string;

		/**
		* ### 职业 
		*/
		profession:number;

	}
}

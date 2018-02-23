declare module xls
{
	/**
	 * ## 对应配置表prop.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IPropInfo extends IItemBaseInfo
	{
		/**
		* ### ID 
		*/
		id:number;

		/**
		* ### 物品名称 
		*/
		name:string;

		/**
		* ### 物品种类 
		*/
		type:number;

		/**
		* ### 物品品质 
		*/
		quality:number;

		/**
		* ### 使用等级 
		*/
		needlv:number;

		/**
		* ### 有效期 
		*/
		efftime:number;

		/**
		* ### 是否可叠加 
		*/
		multiply:number;

		/**
		* ### 前置道具id 
		*/
		bef_id:number;

		/**
		* ### 后置道具id 
		*/
		next_id:number;

		/**
		* ### 物品等级 
		*/
		prop_level:number;

		/**
		* ### 是否可交易 
		*/
		trade:number;

		/**
		* ### 是否可使用 
		*/
		useable:number;

		/**
		* ### 购买价格 
		*/
		price:number;

		/**
		* ### 出售价格 
		*/
		sell_price:number;

		/**
		* ### 宝石类型 
		*/
		gem_type:number;

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
		* ### 物攻 
		*/
		ac:number;

		/**
		* ### 物防 
		*/
		ad:number;

		/**
		* ### 魔攻 
		*/
		mc:number;

		/**
		* ### 魔防 
		*/
		md:number;

		/**
		* ### 生命 
		*/
		hp:number;

		/**
		* ### 暴击 
		*/
		crit:number;

		/**
		* ### 格挡 
		*/
		parry:number;

		/**
		* ### 速度 
		*/
		speed:number;

		/**
		* ### 怒气 
		*/
		fury:number;

		/**
		* ### 英雄id 
		*/
		hero_id:number;

		/**
		* ### 关联buffid 
		*/
		buff:number;

		/**
		* ### 冲突buff 
		*/
		buff_rej:string;

		/**
		* ### 经验 
		*/
		exp:number;

		/**
		* ### 描述 
		*/
		tip:string;

		/**
		* ### 洗炼属性类型 
		*/
		refine_type:number;

		/**
		* ### 洗炼星级 
		*/
		refine_star:number;

		/**
		* ### 坐骑使用等级 
		*/
		needlv_horse:number;

	}
}

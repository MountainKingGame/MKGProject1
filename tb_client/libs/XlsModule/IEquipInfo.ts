declare module xls
{
	/**
	 * ## 对应配置表equip.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IEquipInfo extends IItemBaseInfo
	{
		/**
		* ### ID 
		*/
		id:number;

		/**
		* ### 名称 
		*/
		name:string;

		/**
		* ### 品质 
		*/
		quality:number;

		/**
		* ### 是否可叠加 
		*/
		multiply:number;

		/**
		* ### 使用等级 
		*/
		needlv:number;

		/**
		* ### 职业 
		*/
		profession:number;

		/**
		* ### 性别 
		*/
		sex :number;

		/**
		* ### 类型 
		*/
		type:number;

		/**
		* ### 物理攻击 
		*/
		ac:number;

		/**
		* ### 物理防御 
		*/
		ad:number;

		/**
		* ### 魔法攻击 
		*/
		mc:number;

		/**
		* ### 魔法防御 
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
		* ### 可强化等级 
		*/
		stength:number;

		/**
		* ### 品质上限 
		*/
		quality_ceil:number;

		/**
		* ### 绿色战斗力 
		*/
		BR_green:number;

		/**
		* ### 蓝色战斗力 
		*/
		BR_blue:number;

		/**
		* ### 紫色战斗力 
		*/
		BR_purple:number;

		/**
		* ### 橙色战斗力 
		*/
		BR_orange:number;

		/**
		* ### 红色战斗力 
		*/
		BR_red:number;

		/**
		* ### 售价 
		*/
		sell_price:number;

		/**
		* ### 可否交易 
		*/
		trade:number;

		/**
		* ### 是否掉落 
		*/
		dropout:number;

		/**
		* ### 套装编号 
		*/
		suitid:number;

		/**
		* ### 装备组ID 
		*/
		equip_grouop_id:number;

		/**
		* ### 强化成功率组 
		*/
		enhance_group_id:number;

		/**
		* ### 关联buff 
		*/
		buff_id:number;

		/**
		* ### 有效期 
		*/
		duration:number;

		/**
		* ### 时装战斗力 
		*/
		costumeBR:number;

	}
}

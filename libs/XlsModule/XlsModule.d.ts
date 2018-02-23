/**
 * xls配置表模块.
 * @author deden-configuration
*/
declare module xls {
    /** 是否已经初始化模块,并加载完成索引表数据. */
    var hasInitialized: boolean;
    /** 当前加载配置的国家语言. */
    var language: string;
    /** 数据文件存储根目录url路径. */
    var rootPath: string;
    /** 配置表ID是否全局唯一. */
    var isGlobal: boolean;
    /** 生成配置的时间戳. */
    var createTimestamp: number;
    /** 索引表最后修改的时间戳. */
    var modificationTimestamp: number;
    /** 自定义加载器. */
    var customLoader:(isNode: boolean, isEncrypt: boolean,  modification: number, table:string, url: string, compFunc: (data: any, url: string)=>void)=>void;
    /** 获取配置`模块表`列表. */
    var tables: string[];
    /** 获取需要加载的配置项,包含`索引表`和`模块表`列表. */
    var requisites: string[];
    /**
     * 通过全局唯一ID获取独立的数据项信息.
     *```
     * getItem: (globalId: number);
     * ```
     * 通过指定的表索引ID和表的本地ID获取独立数据项信息.
     *```
     * getItem: (localId: number, tableId: number);
     * ```
     */
    var getItem: (id: number, tableId?: number) => IItemBaseInfo;
    /**    
     * 通过指定的表索引ID和表的key获取独立数据项信息.
     *```
     * getSubkeyItem: (localId: number|string, tableId: number);
     * ```
     */
    var getSubkeyItem: (subfield: number | string, subkey: number | string, tableId: number) => IItemBaseInfo;
    /**
     * 通过索引表的索引ID获取整个表的所有数据项信息.
     */
    var getItems: (tableId: number) => IItemBaseInfo[];
    /**
     * 通过表索引表的索引ID获取表属性信息.
     */
    var getAttribute: (tableId: number) => ITableAttributeInfo;
    /**
     * 加载合并的Json大表.
     * @param onFinishedCallBack 加载完成回调.
     */
    var load: (onFinishedCallBack: (data?: any, url?: string) => void) => void;
    /**
    * 加载所有配置.
    * @param onFinishedCallBack 加载完成回调.
    */
    var loadAll: (onFinishedCallBack: (data?: any, url?: string) => void) => void;
}
declare module xls
{
	/**
	 * ###配置表（equip.xls）的数据.
	 */
	var equip:IEquip;
	/**
	 * ###配置表（prop.xls）的数据.
	 */
	var prop:IProp;
	/**
	 * ###配置表（mail.xls）的数据.
	 */
	var mail:IMail;
	/**
	 * ###配置表（monsterGroup.xls）的数据.
	 */
	var monsterGroup:IMonsterGroup;
	/**
	 * ###配置表（monsterReward.xls）的数据.
	 */
	var monsterReward:IMonsterReward;
	/**
	 * ###配置表（monsters.xls）的数据.
	 */
	var monsters:IMonsters;
	/**
	 * ###配置表（monstersExp.xls）的数据.
	 */
	var monstersExp:IMonstersExp;
	/**
	 * ###配置表（tips.xls）的数据.
	 */
	var tips:ITips;
	/**
	 * ###配置表（monsterRewardProbabilityDef.xls）的数据.
	 */
	var monsterRewardProbabilityDef:IMonsterRewardProbabilityDef;
	/**
	 * ###配置表（monsterRewardPropDef.xls）的数据.
	 */
	var monsterRewardPropDef:IMonsterRewardPropDef;

}
declare module xls
{
	/**
	 * ## 对应配置表$items.xls中的数据.
	 * @author deden-configuration
	 */
	export interface ITableAttributeInfo extends IItemBaseInfo
	{
		/**
		* ### 表名 
		* >配置表名，必须和xls文件相同，且只支持xls格式。
		* xlsx格式的文档不做解析，可以为辅助说明文档使用。
		*  
		*/
		name:string;

		/**
		* ### ID 
		* >配置表的唯一编号，也是表的类型标识
		*  
		*/
		id:number;

		/**
		* ### 子健 
		*/
		subkey:string;

		/**
		* ### 类型名称 
		* >配置表类别的名称
		*  
		*/
		typeName:string;

		/**
		* ### 合并到索引表 
		* >是否是独立外部加载，不常用的表可以设置为外部.
		*  
		*/
		merge:number;

		/**
		* ### 多维表关联 
		* >**JSON格式**：
		* ~~~
		*     [
		* {"field":"xxx","table":["tableName"],"type":"info"},
		* {"field":"xxx","table":["tableName","linkField"],"type":"link"}
		* ,...
		* ]
		* ~~~
		* >field:关联字段名
		* table:关联表名，非id
		* type:关联类别("info","definition","link")
		*      info:数据关联。
		*      通过表数据单元id关联，获取该单元的数据结构。
		*      definition:定义关联。
		* 可以有效解决一个字段多种含义特殊需求，会对字段数据进行拆解分析。
		* 例如设计一个掉落奖励概率的设定：
		* 需求是掉落包ID,掉落包数量,掉落概率;…… 其中掉落概率是1-1000的范围值。
		* (860707,1,500;860707,1,500)，另外有一张掉落概率的定义表名为defReward.xls(对应字段：rewardID,count,probability).
		* 该例的关联字段将会被解析为：
		* ~~~
		* var reward:IDefRewardInfo[] = [IDefRewardInfo,IDefRewardInfo];
		* reward[0].rewardID;//获取860707的奖励包id
		* ~~~
		*      link:映射关联。
		*      通过表数据单元id关联，获取该单元的数据结构中制定字段数据。
		*  
		*/
		multidimensional:string;

		/**
		* ### 有效性验证 
		*/
		validation:string;

		/**
		* ### 转换为html格式的字段 
		* >**JSON格式**：
		* ```
		*     ["field1","field2"...]
		* ```
		* >类似html“<b></b>”标签格式的内容将会在解析时还原回来，未标记的字段以文本形式呈现.
		*  
		*/
		htmlField:string;

		/**
		* ### 宏定义命名空间 
		* >宏定义命名空间，如果不需要命名空间可留空 
		*/
		constNamespace:string;

		/**
		* ### 宏定义字段 
		* >**JSON格式**：
		* ~~~
		*     [{"key":"","value":"","desc":""},{"key":"","value":"","desc:"""},...]
		* ~~~
		* >key:宏定义字符字段名,字段可以多个字段组合或加前后缀字符,可用"{字段名}"区分
		* value:宏定义值字字段名
		* desc:宏定义描述字段
		* 形式表示，对应字段将转换到独立的tabelNameConst类中.
		* 如果key值为小写，将会默认转换为大写，key和value可以是相同的字段. 
		*/
		constField:string;

		/**
		* ### ICON目录 
		* >icon路径
		*  
		*/
		iconPath:string;

	}
}
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
declare module xls
{
	/**
	 * ##配置表prop.xls 的表宏定义信息.
	 * @author deden-configuration
	*/
	class PropConst
	{
		/**
		* ## id:130001
		* 2x EXP Scroll
		*/
		static QUALITY_2X_EXP_SCROLL : number;
		/**
		* ## id:130002
		* 2x Trial Card
		*/
		static QUALITY_2X_TRIAL_CARD : number;
		/**
		* ## id:130003
		* Stamina Pot
		*/
		static QUALITY_STAMINA_POT : number;
		/**
		* ## id:130004
		* LV.1 HP Pot
		*/
		static QUALITY_LV_1_HP_POT : number;
		/**
		* ## id:130005
		* LV.1 PATK Pot
		*/
		static QUALITY_LV_1_PATK_POT : number;
		/**
		* ## id:130006
		* LV.1 PDEF Pot
		*/
		static QUALITY_LV_1_PDEF_POT : number;
		/**
		* ## id:130007
		* LV.1 BLOCK Pot
		*/
		static QUALITY_LV_1_BLOCK_POT : number;
		/**
		* ## id:130008
		* LV.1 MATK Pot
		*/
		static QUALITY_LV_1_MATK_POT : number;
		/**
		* ## id:130009
		* LV.1 MDEF Pot
		*/
		static QUALITY_LV_1_MDEF_POT : number;
		/**
		* ## id:130010
		* LV.1 CRIT Pot
		*/
		static QUALITY_LV_1_CRIT_POT : number;
		/**
		* ## id:130011
		* LV.1 SPD Pot
		*/
		static QUALITY_LV_1_SPD_POT : number;
		/**
		* ## id:130012
		* LV.2 HP Pot
		*/
		static QUALITY_LV_2_HP_POT : number;
		/**
		* ## id:130013
		* LV.2 PATK Pot
		*/
		static QUALITY_LV_2_PATK_POT : number;
		/**
		* ## id:130014
		* LV.2 PDEF Pot
		*/
		static QUALITY_LV_2_PDEF_POT : number;
		/**
		* ## id:130015
		* LV.2 BLOCK Pot
		*/
		static QUALITY_LV_2_BLOCK_POT : number;
		/**
		* ## id:130016
		* LV.2 MATK Pot
		*/
		static QUALITY_LV_2_MATK_POT : number;
		/**
		* ## id:130017
		* LV.2 MDEF Pot
		*/
		static QUALITY_LV_2_MDEF_POT : number;
		/**
		* ## id:130018
		* LV.2 CRIT Pot
		*/
		static QUALITY_LV_2_CRIT_POT : number;
		/**
		* ## id:130019
		* LV.2 SPD Pot
		*/
		static QUALITY_LV_2_SPD_POT : number;
		/**
		* ## id:130020
		* LV.3 HP Pot
		*/
		static QUALITY_LV_3_HP_POT : number;
		/**
		* ## id:130021
		* LV.3 PATK Pot
		*/
		static QUALITY_LV_3_PATK_POT : number;
		/**
		* ## id:130022
		* LV.3 PDEF Pot
		*/
		static QUALITY_LV_3_PDEF_POT : number;
		/**
		* ## id:130023
		* LV.3 BLOCK Pot
		*/
		static QUALITY_LV_3_BLOCK_POT : number;
		/**
		* ## id:130024
		* LV.3 MATK Pot
		*/
		static QUALITY_LV_3_MATK_POT : number;
		/**
		* ## id:130025
		* LV.3 MDEF Pot
		*/
		static QUALITY_LV_3_MDEF_POT : number;
		/**
		* ## id:130026
		* LV.3 CRIT Pot
		*/
		static QUALITY_LV_3_CRIT_POT : number;
		/**
		* ## id:130027
		* LV.3 SPD Pot
		*/
		static QUALITY_LV_3_SPD_POT : number;
		/**
		* ## id:130501
		* LV.1 PATK Gem
		*/
		static QUALITY_LV_1_PATK_GEM : number;
		/**
		* ## id:130502
		* LV.2 PATK Gem
		*/
		static QUALITY_LV_2_PATK_GEM : number;
		/**
		* ## id:130503
		* LV.3 PATK Gem
		*/
		static QUALITY_LV_3_PATK_GEM : number;
		/**
		* ## id:130504
		* LV.4 PATK Gem
		*/
		static QUALITY_LV_4_PATK_GEM : number;
		/**
		* ## id:130505
		* LV.5 PATK Gem
		*/
		static QUALITY_LV_5_PATK_GEM : number;
		/**
		* ## id:130506
		* LV.6 PATK Gem
		*/
		static QUALITY_LV_6_PATK_GEM : number;
		/**
		* ## id:130507
		* LV.1 PDEF Gem
		*/
		static QUALITY_LV_1_PDEF_GEM : number;
		/**
		* ## id:130508
		* LV.2 PDEF Gem
		*/
		static QUALITY_LV_2_PDEF_GEM : number;
		/**
		* ## id:130509
		* LV.3 PDEF Gem
		*/
		static QUALITY_LV_3_PDEF_GEM : number;
		/**
		* ## id:130510
		* LV.4 PDEF Gem
		*/
		static QUALITY_LV_4_PDEF_GEM : number;
		/**
		* ## id:130511
		* LV.5 PDEF Gem
		*/
		static QUALITY_LV_5_PDEF_GEM : number;
		/**
		* ## id:130512
		* LV.6 PDEF Gem
		*/
		static QUALITY_LV_6_PDEF_GEM : number;
		/**
		* ## id:130513
		* LV.1 MATK Gem
		*/
		static QUALITY_LV_1_MATK_GEM : number;
		/**
		* ## id:130514
		* LV.2 MATK Gem
		*/
		static QUALITY_LV_2_MATK_GEM : number;
		/**
		* ## id:130515
		* LV.3 MATK Gem
		*/
		static QUALITY_LV_3_MATK_GEM : number;
		/**
		* ## id:130516
		* LV.4 MATK Gem
		*/
		static QUALITY_LV_4_MATK_GEM : number;
		/**
		* ## id:130517
		* LV.5 MATK Gem
		*/
		static QUALITY_LV_5_MATK_GEM : number;
		/**
		* ## id:130518
		* LV.6 MATK Gem
		*/
		static QUALITY_LV_6_MATK_GEM : number;
		/**
		* ## id:130519
		* LV.1 MDEF Gem
		*/
		static QUALITY_LV_1_MDEF_GEM : number;
		/**
		* ## id:130520
		* LV.2 MDEF Gem
		*/
		static QUALITY_LV_2_MDEF_GEM : number;
		/**
		* ## id:130521
		* LV.3 MDEF Gem
		*/
		static QUALITY_LV_3_MDEF_GEM : number;
		/**
		* ## id:130522
		* LV.4 MDEF Gem
		*/
		static QUALITY_LV_4_MDEF_GEM : number;
		/**
		* ## id:130523
		* LV.5 MDEF Gem
		*/
		static QUALITY_LV_5_MDEF_GEM : number;
		/**
		* ## id:130524
		* LV.6 MDEF Gem
		*/
		static QUALITY_LV_6_MDEF_GEM : number;
		/**
		* ## id:130525
		* LV.1 HP Gem
		*/
		static QUALITY_LV_1_HP_GEM : number;
		/**
		* ## id:130526
		* LV.2 HP Gem
		*/
		static QUALITY_LV_2_HP_GEM : number;
		/**
		* ## id:130527
		* LV.3 HP Gem
		*/
		static QUALITY_LV_3_HP_GEM : number;
		/**
		* ## id:130528
		* LV.4 HP Gem
		*/
		static QUALITY_LV_4_HP_GEM : number;
		/**
		* ## id:130529
		* LV.5 HP Gem
		*/
		static QUALITY_LV_5_HP_GEM : number;
		/**
		* ## id:130530
		* LV.6 HP Gem
		*/
		static QUALITY_LV_6_HP_GEM : number;
		/**
		* ## id:130531
		* LV.1 CRIT Gem
		*/
		static QUALITY_LV_1_CRIT_GEM : number;
		/**
		* ## id:130532
		* LV.2 CRIT Gem
		*/
		static QUALITY_LV_2_CRIT_GEM : number;
		/**
		* ## id:130533
		* LV.3 CRIT Gem
		*/
		static QUALITY_LV_3_CRIT_GEM : number;
		/**
		* ## id:130534
		* LV.4 CRIT Gem
		*/
		static QUALITY_LV_4_CRIT_GEM : number;
		/**
		* ## id:130535
		* LV.5 CRIT Gem
		*/
		static QUALITY_LV_5_CRIT_GEM : number;
		/**
		* ## id:130536
		* LV.6 CRIT Gem
		*/
		static QUALITY_LV_6_CRIT_GEM : number;
		/**
		* ## id:130537
		* LV.1 BLOCK Gem
		*/
		static QUALITY_LV_1_BLOCK_GEM : number;
		/**
		* ## id:130538
		* LV.2 BLOCK Gem
		*/
		static QUALITY_LV_2_BLOCK_GEM : number;
		/**
		* ## id:130539
		* LV.3 BLOCK Gem
		*/
		static QUALITY_LV_3_BLOCK_GEM : number;
		/**
		* ## id:130540
		* LV.4 BLOCK Gem
		*/
		static QUALITY_LV_4_BLOCK_GEM : number;
		/**
		* ## id:130541
		* LV.5 BLOCK Gem
		*/
		static QUALITY_LV_5_BLOCK_GEM : number;
		/**
		* ## id:130542
		* LV.6 BLOCK Gem
		*/
		static QUALITY_LV_6_BLOCK_GEM : number;
		/**
		* ## id:130543
		* LV.1 SPD Gem
		*/
		static QUALITY_LV_1_SPD_GEM : number;
		/**
		* ## id:130544
		* LV.2 SPD Gem
		*/
		static QUALITY_LV_2_SPD_GEM : number;
		/**
		* ## id:130545
		* LV.3 SPD Gem
		*/
		static QUALITY_LV_3_SPD_GEM : number;
		/**
		* ## id:130546
		* LV.4 SPD Gem
		*/
		static QUALITY_LV_4_SPD_GEM : number;
		/**
		* ## id:130547
		* LV.5 SPD Gem
		*/
		static QUALITY_LV_5_SPD_GEM : number;
		/**
		* ## id:130548
		* LV.6 SPD Gem
		*/
		static QUALITY_LV_6_SPD_GEM : number;
		/**
		* ## id:130549
		* LV.1 Fury Gem
		*/
		static QUALITY_LV_1_FURY_GEM : number;
		/**
		* ## id:130550
		* LV.2 Fury Gem
		*/
		static QUALITY_LV_2_FURY_GEM : number;
		/**
		* ## id:130551
		* LV.3 Fury Gem
		*/
		static QUALITY_LV_3_FURY_GEM : number;
		/**
		* ## id:130552
		* LV.4 Fury Gem
		*/
		static QUALITY_LV_4_FURY_GEM : number;
		/**
		* ## id:130553
		* LV.5 Fury Gem
		*/
		static QUALITY_LV_5_FURY_GEM : number;
		/**
		* ## id:130554
		* LV.6 Fury Gem
		*/
		static QUALITY_LV_6_FURY_GEM : number;
		/**
		* ## id:130701
		* Diamond Opener
		*/
		static QUALITY_DIAMOND_OPENER : number;
		/**
		* ## id:130702
		* Transfer Stone
		*/
		static QUALITY_TRANSFER_STONE : number;
		/**
		* ## id:130791
		* Horn(L)
		*/
		static QUALITY_HORN_L_ : number;
		/**
		* ## id:130792
		* Horn(S)
		*/
		static QUALITY_HORN_S_ : number;
		/**
		* ## id:130801
		* VIP1 Pack
		*/
		static QUALITY_VIP1_PACK : number;
		/**
		* ## id:130802
		* VIP2 Pack
		*/
		static QUALITY_VIP2_PACK : number;
		/**
		* ## id:130803
		* VIP3 Pack
		*/
		static QUALITY_VIP3_PACK : number;
		/**
		* ## id:130804
		* VIP4 Pack
		*/
		static QUALITY_VIP4_PACK : number;
		/**
		* ## id:130805
		* VIP5 Pack
		*/
		static QUALITY_VIP5_PACK : number;
		/**
		* ## id:130806
		* VIP6 Pack
		*/
		static QUALITY_VIP6_PACK : number;
		/**
		* ## id:130807
		* VIP7 Pack
		*/
		static QUALITY_VIP7_PACK : number;
		/**
		* ## id:130808
		* VIP8 Pack
		*/
		static QUALITY_VIP8_PACK : number;
		/**
		* ## id:130809
		* VIP9 Pack
		*/
		static QUALITY_VIP9_PACK : number;
		/**
		* ## id:130810
		* VIP10 Pack
		*/
		static QUALITY_VIP10_PACK : number;
		/**
		* ## id:130816
		* LV10 Newbie Pack
		*/
		static QUALITY_LV10_NEWBIE_PACK : number;
		/**
		* ## id:130817
		* LV20 Newbie Pack
		*/
		static QUALITY_LV20_NEWBIE_PACK : number;
		/**
		* ## id:130818
		* LV30 Newbie Pack
		*/
		static QUALITY_LV30_NEWBIE_PACK : number;
		/**
		* ## id:130819
		* LV40 Newbie Pack
		*/
		static QUALITY_LV40_NEWBIE_PACK : number;

	}
}
declare module xls
{
	/**
	 * ## 对应配置表mail.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMailInfo extends IItemBaseInfo
	{
		/**
		* ### id 
		*/
		id:number;

		/**
		* ### 邮件类型 
		*/
		type:number;

		/**
		* ### 邮件宏定义_不能被翻译 
		*/
		mail_title_const:string;

		/**
		* ### 邮件标题 
		*/
		mail_title:string;

		/**
		* ### 邮件内容 
		*/
		content:string;

		/**
		* ### 内容类型 
		*/
		content_type:number;

	}
}
declare module xls
{
	/**
	 * ##配置表mail.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMail
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MailInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取mail.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取mail.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMailInfo;

		/**
 		* 通过ID获取MailInfo实例项.
 		*/
		getItem(id:number):IMailInfo;

		/**
 		* 获取MailInfo实例队列.
 		*/
		getItems():IMailInfo[];

	}
}
declare module xls
{
	/**
	 * ##配置表mail.xls 的表宏定义信息.
	 * @author deden-configuration
	*/
	class MailConst
	{
		/**
		* ## id:608201
		* Congrats you obtained [#prop_list#] through AFK in Dungeon.
		*/
		static DUNGEON_AFK : string;
		/**
		* ## id:608202
		* System Mail, don't reply.
		*/
		static SYSTEM_MAIL : string;
		/**
		* ## id:608203
		* Congrats you get [#prop_list#] through combining in Arsenal. 
		*/
		static ARSENAL : string;
		/**
		* ## id:608204
		* Congrats you obtained [#prop_list#] through AFK in Trial Tower.
		*/
		static TRIAL_TOWE_AFK : string;
		/**
		* ## id:608205
		* Congrats you obtained [#prop_list#] in Guild Battle.
		*/
		static REWARDS_FOR_GUILD_BATTLE : string;
		/**
		* ## id:608206
		* Congrats you obtained following rewards in Battle of Gods：#prop_list#
		*/
		static RANKING_REWARDS_IN_BATTLE_OF_GODS : string;
		/**
		* ## id:608207
		* Congrats you finished Escort,obtained #prop_list#
		*/
		static ESCORT_REWARDS : string;
		/**
		* ## id:608208
		* Congrats you get [#prop_list#] for newbie rewards.
		*/
		static NEWBIE_LOGIN_REWARDS : string;
		/**
		* ## id:608209
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static DUNGEON_S_LOOT : string;
		/**
		* ## id:608210
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static REWARDS_FROM_DUNGEON : string;
		/**
		* ## id:608211
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static REWARDS_FROM_UNITY_GATE : string;
		/**
		* ## id:608212
		* Congrats you obtained [#prop_list#] in Crystal Altar.
		*/
		static CRYSTAL_ALTAR_S_LOOT : string;
		/**
		* ## id:608213
		* Congrats you obtained [#prop_list#] in Trial Tower.
		*/
		static TRIAL_TOWE_S_LOOT : string;
		/**
		* ## id:608215
		* Guild Master [#Player_Name#] is offline 7 days. The Guild Master will be automatically transferred when offline for more than 10 days.
		* 1.The Vice Guild Master who has logged on in the past 3 days will be the default candidate for new Guild Master.If no one qualifies, players holding the next highest position will be considered.
		* 2.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, and the candidate with the most votes will be the new guild master.
		* 3.If the Guild Master returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_TRANSFER : string;
		/**
		* ## id:608216
		* Guild Master [#Player_Name#] is offline 15 days. Guild Master transfer to [#Player_Name#], congrats to him/her.
		*/
		static NEW_GUILD_MASTER : string;
		/**
		* ## id:608217
		* Guild Master [#Player_Name#] is offline 10 days, candidates is expecting for your vote. You can click “Election” in Guild to vote.
		* 1.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, candidate with the most votes will be the new guild master.
		* 2.If the guild master returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_ELECTION : string;
		/**
		* ## id:608218
		* The Guild Master [#Player_Name#] returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_RETURNS_ : string;
		/**
		* ## id:608219
		* All members in [#guild_name#] didn't login in 90 days, your guild dismissed.
		*/
		static GUILD_DISMISSED : string;
		/**
		* ## id:608220
		* Congrats you gaind [#prop_list#] as login rewards.
		*/
		static LOGIN_REWARDS : string;
		/**
		* ## id:608221
		* Congrats you obtained [#prop_list#] in Beast Shooting.
		*/
		static REWARDS_FOR_BEAST_SHOOTING : string;
		/**
		* ## id:608222
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 20:00 everyday. Wish you have fun in game.
		*/
		static ONLINE_REWARDS_AT_20_00_EVERYDAY_ : string;
		/**
		* ## id:608223
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 21:00 everyday. Wish you have fun in game.
		*/
		static ONLINE_REWARDS_AT_21_00_EVERYDAY_ : string;
		/**
		* ## id:608224
		* You've made outstanding contribution in Ideas March, you're the 1st, rewarded [#prop_list#]
		*/
		static REWARDS_FROM_IDEAS_OF_MARCH : string;
		/**
		* ## id:608228
		* Congrat you reach to Floor[#n_floor#] in the Trial Tower, obtained the gorgeous rewards.
		*/
		static CLEARANCE_REWARDS_FOR_THE_TRIAL_TOWER : string;
		/**
		* ## id:608229
		* All rewards have been sent to you via the mail as your inventory is full, please sort your inventory as soon as possible.
		*/
		static CLAIM_REWARDS_ : string;
		/**
		* ## id:608233
		* You gave the last hit of the Guard in Honor&amp;Glory, rewarded [#prop_list#]
		*/
		static REWARDS_OF_LAST_HIT : string;
		/**
		* ## id:608234
		* Congrats you obtained [#prop_list#] in Honor&amp;Glory.
		*/
		static REWARDS_FOR_HONOR_AMP_GLORY : string;
		/**
		* ## id:608235
		* Congrats you got guard rewards in Honor&amp;Glory,rewarded [#prop_list#]
		*/
		static REWARDS_FROM_HONOR_AMP_GLORY : string;
		/**
		* ## id:608236
		* Congrats you got [#prop_list#] in Ancient Treasure.
		*/
		static TREASURE_REWARDS : string;
		/**
		* ## id:608238
		* You gave the final blow to the Boss in World Boss, rewarded [#prop_list#]
		*/
		static REWARDS_OF_LAST_HIT_IN_WORLD_BOSS : string;
		/**
		* ## id:608239
		* Congrats you obtained [#prop_list#] in World Boss.
		*/
		static REWARDS_FROM_WORLD_BOSS : string;
		/**
		* ## id:608240
		* Your rewards were sent via the mail as your inventory is full, please sort as soon as possible.
		*/
		static YOUR_INVENTORY_IS_FULL : string;
		/**
		* ## id:608241
		* Dear Warrior，\nYour guild receives a bye in the group stage of Dragon Hegemony, and you will receive the following rewards.
		*/
		static BYE_REWARDS : string;
		/**
		* ## id:608242
		* Dear Player，\nYour guild will fight against [#guild_name#] at 20:00 tonight, it&apos;s your time to shine!
		*/
		static DRAGON_HEGEMONY_NOTICE : string;
		/**
		* ## id:608243
		* Dear Warrior,\nCongrats on getting the rewards in Dragon Hegemony：[#prop_list#].
		*/
		static DRAGON_HEGEMONY_REWARDS : string;
		/**
		* ## id:608244
		* Distinguished Hero,\nCongrats on getting #Rank#th place in Gods'Glory.You have won awesome rewards!
		*/
		static GODS_GLORY_REWARDS : string;
		/**
		* ## id:608245
		* Distinguished Hero,\nCongrats you obtained Group Completion Rewards in Cross-Server Arena.
		*/
		static GROUP_COMPLETION_REWARDS : string;

	}
}
declare module xls
{
	/**
	 * ## 对应配置表monsterGroup.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterGroupInfo extends IItemBaseInfo
	{
		/**
		* ### 怪物组ID 
		*/
		id:number;

		/**
		* ### 怪物组队名 
		*/
		name:string;

		/**
		* ### 怪物成员boss的ID 
		*/
		monster_boss_id:number;

		/**
		* ### boss血条显示条数 
		*/
		monster_boss_blood_count:number;

		/**
		* ### 奖励输出方式 
		*/
		reward_mode:number;

		/**
		* ### 素材 
		* >索引表针对该字段做了“link”类型的二维数据索引，link为直接映射方式，实际输出数据类型会更改为映射字段的类型，值也会替换为映射字段值
		* 该例中可通过res直接访问数据
		* 
		* ----
		* ### 映射关联:monsters.xls
		* >
		* >索引字段 id,映射字段 res:
		* `monster_avatars_id	<===>	res`
		* 加载的素材编号
		* ***monsters表字段列表:***
		* 
		* > |id|name|res|res_heroes|level|phy|mentality|agile|body|hp|ac|ad|parry|mc|md|crit|speed|skill|profession|
		* |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
		* |int|string|int|int|int|int|int|int|int|int|int|int|int|int|int|int|int|string|int| 
		*/
		monster_avatars_id:number;

		/**
		* ### 怪物等级 
		*/
		monster_lv:number;

		/**
		* ### 怪物成员 
		* >索引表针对该字段做了“info”类型的二维数据索引，同时保留原始关联数据，实际项目中使用概率较为频繁，规则为关联字段名加“$”作为前缀
		* 该例中关联数据可通过$monsters获得
		* 
		* ----
		* ### 索引关联:$monsters 
		*/
		monsters:number[];

		/**
		* ### 怪物站位 
		*/
		monster_pos:number[];

		/**
		* ### 该组怪掉落奖励 
		* >掉落奖励包概率结构定义。
		* 数组“;”号隔开，字段“,”号隔开,特殊需求需求分隔符可自定义，在[]中定义。
		* 数据安全严谨性考虑不建议使用字符串类型，如果有大量字符描述类可以使用多维表关联替代，定义结构类主要是解决大量随机性数据而设计
		* 该例中的数据可直接通过monster_reward字段获取
		* 
		* ----
		* ### 定义关联:monsterRewardProbabilityDef.xls
		* > ***monsterRewardProbabilityDef表字段列表:***
		* 
		* > |id|monster_reward_prop|probability|
		* |:-:|:-:|:-:|
		* |monsterReward|info|id|uint|uint| 
		*/
		monster_reward:IMonsterRewardProbabilityDefInfo[];

		/**
		* ### 怪物跟踪角色 
		*/
		follow:number;

		/**
		* ### 冒泡对话1 
		*/
		dialogue1:string;

		/**
		* ### 冒泡对话2 
		*/
		dialogue2:string;

		/**
		* ### 间隔时间 
		*/
		dialogue_time:number;

		/**
		* ### 显示用战斗力 
		*/
		battleRating_monsterGroup:number;

		/**
		* ### id 
		* >索引表针对该字段做了“info”类型的二维数据索引，同时保留原始关联数据，实际项目中使用概率较为频繁，规则为关联字段名加“$”作为前缀
		* 该例中关联数据可通过$monsters获得
		* 
		* ----
		* ### 索引关联:monsters.xls
		* >索引字段 id:
		* `$monsters	<===>	id`
		* 
		* ***monsters表字段列表:***
		* 
		* > |id|name|res|res_heroes|level|phy|mentality|agile|body|hp|ac|ad|parry|mc|md|crit|speed|skill|profession|
		* |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
		* |int|string|int|int|int|int|int|int|int|int|int|int|int|int|int|int|int|string|int| 
		*/
		$monsters:IMonstersInfo[];

	}
}
declare module xls
{
	/**
	 * ##配置表monsterGroup.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterGroup
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterGroupInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterGroup.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterGroup.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterGroupInfo;

		/**
 		* 通过ID获取MonsterGroupInfo实例项.
 		*/
		getItem(id:number):IMonsterGroupInfo;

		/**
 		* 获取MonsterGroupInfo实例队列.
 		*/
		getItems():IMonsterGroupInfo[];

	}
}
declare module xls
{
	/**
	 * ## 对应配置表monsterReward.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardInfo extends IItemBaseInfo
	{
		/**
		* ### 掉落包id 
		*/
		id:number;

		/**
		* ### 物品串 
		* >
		* 
		* ----
		* ### 定义关联:monsterRewardPropDef.xls
		* > ***monsterRewardPropDef表字段列表:***
		* 
		* > |id|monster_reward_prop|
		* |:-:|:-:|
		* |uint|uint| 
		*/
		monster_reward_prop:IMonsterRewardPropDefInfo[];

	}
}
declare module xls
{
	/**
	 * ##配置表monsterReward.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterReward
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterReward.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterReward.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardInfo;

		/**
 		* 通过ID获取MonsterRewardInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardInfo;

		/**
 		* 获取MonsterRewardInfo实例队列.
 		*/
		getItems():IMonsterRewardInfo[];

	}
}
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
declare module xls
{
	/**
	 * ##配置表monsters.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsters
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonstersInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsters.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsters.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonstersInfo;

		/**
 		* 通过ID获取MonstersInfo实例项.
 		*/
		getItem(id:number):IMonstersInfo;

		/**
 		* 获取MonstersInfo实例队列.
 		*/
		getItems():IMonstersInfo[];

	}
}
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
declare module xls
{
	/**
	 * ## 对应配置表monsterRewardProbabilityDef.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardProbabilityDefInfo extends IItemBaseInfo
	{
		/**
		* ### 掉落包ID 
		* >奖励包内容表的id,关联掉落包内容
		* 
		* ----
		* ### 索引关联:$id 
		*/
		id:number;

		/**
		* ### 掉落包数量 
		* >掉落数量 
		*/
		monster_reward_prop:number;

		/**
		* ### 掉落概率 
		* >掉落概率是0-1000的值，放大百分百到千位数 
		*/
		probability:number;

		/**
		* ### 掉落包id 
		* >奖励包内容表的id,关联掉落包内容
		* 
		* ----
		* ### 索引关联:monsterReward.xls
		* >索引字段 id:
		* `$id	<===>	id`
		* 
		* ***monsterReward表字段列表:***
		* 
		* > |id|monster_reward_prop|
		* |:-:|:-:|
		* |int|monsterRewardPropDef[]| 
		*/
		$id:IMonsterRewardInfo;

	}
}
declare module xls
{
	/**
	 * ##配置表monsterRewardProbabilityDef.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterRewardProbabilityDef
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardProbabilityDefInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterRewardProbabilityDef.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterRewardProbabilityDef.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardProbabilityDefInfo;

		/**
 		* 通过ID获取MonsterRewardProbabilityDefInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardProbabilityDefInfo;

		/**
 		* 获取MonsterRewardProbabilityDefInfo实例队列.
 		*/
		getItems():IMonsterRewardProbabilityDefInfo[];

	}
}
declare module xls
{
	/**
	 * ## 对应配置表monsterRewardPropDef.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardPropDefInfo extends IItemBaseInfo
	{
		/**
		* ### 物品ID 
		* >奖励包内容表的id 
		*/
		id:number;

		/**
		* ### 物品数量 
		* >掉落数量 
		*/
		monster_reward_prop:number;

	}
}
declare module xls
{
	/**
	 * ##配置表monsterRewardPropDef.xls的表属性.
	 * @author deden-configuration
	*/
	export interface IMonsterRewardPropDef
	{
 		/** 表数据内容是否已经加载完成. */
		hasLoaded:()=>boolean;

		/**
 		* 加载MonsterRewardPropDefInfo配置表数据.
 		*/
		load(onFinishedCallBack:()=>void):void;

		/**
 		* 获取monsterRewardPropDef.xls表属性.
 		*/
		getAttribute():ITableAttributeInfo;
		
		/**
 		* 通过子健获取monsterRewardPropDef.xls实例项.
 		*/
		getSubkeyItem(subfield: number | string, subkey: number | string):IMonsterRewardPropDefInfo;

		/**
 		* 通过ID获取MonsterRewardPropDefInfo实例项.
 		*/
		getItem(id:number):IMonsterRewardPropDefInfo;

		/**
 		* 获取MonsterRewardPropDefInfo实例队列.
 		*/
		getItems():IMonsterRewardPropDefInfo[];

	}
}
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

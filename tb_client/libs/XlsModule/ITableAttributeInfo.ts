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

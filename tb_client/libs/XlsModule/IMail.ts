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

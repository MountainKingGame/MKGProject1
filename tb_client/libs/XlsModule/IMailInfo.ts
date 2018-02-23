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

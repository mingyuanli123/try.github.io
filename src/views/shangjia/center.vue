
<template>
	<div>
		<div class="app-contain">
			<el-form class="userinfo_form" ref="userinfoFormRef" :model="form" label-width="$template2.back.add.form.base.labelWidth">
				<el-row>
					<el-col :span="12">
						<el-form-item label="商家账号" prop="shangjiazhanghao">
							<el-input class="list_inp" v-model="user.shangjiazhanghao" readonly placeholder="商家账号" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商家名称" prop="shangjiamingcheng">
							<el-input class="list_inp" v-model="user.shangjiamingcheng"  placeholder="商家名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="xingbie">
							<el-select 
								class="list_sel" 
								v-model="user.xingbie" 
								placeholder="请选择性别"
								>
								<el-option v-for="item in shangjiaxingbieLists" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="店铺图片" prop="dianputupian">
							<uploads
								action="file/upload" 
								tip="请上传店铺图片" 
								:limit="3" 
								style="width: 100%;text-align: left;"
								:fileUrls="user.dianputupian?user.dianputupian:''" 
								@change="shangjiadianputupianUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号码" prop="shoujihaoma">
							<el-input class="list_inp" v-model="user.shoujihaoma"  placeholder="手机号码" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人" prop="lianxiren">
							<el-input class="list_inp" v-model="user.lianxiren"  placeholder="联系人" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="经营地址" prop="jingyingdizhi">
							<el-input class="list_inp" v-model="user.jingyingdizhi"  placeholder="经营地址" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="主要经营" prop="zhuyaojingying">
							<el-input class="list_inp" v-model="user.zhuyaojingying"  placeholder="主要经营" clearable />
						</el-form-item>
					</el-col>
					<span class="userinfo_form_btn_box">
						<el-button class='userinfo_confirm' type="primary" @click="onSubmit">保存</el-button>
					</span>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script setup>
	import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/toolUtil";
	import {
		reactive,
		ref,
		getCurrentInstance
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const tableName = ref('shangjia')
	const user = ref({})
	const shangjiaxingbieLists = ref([])
	const init = () => {
		shangjiaxingbieLists.value = "男,女".split(',')
	}
	const shangjiadianputupianUploadSuccess=(fileUrls)=> {
	    user.value.dianputupian = fileUrls;
	}
	const onSubmit = () => {
		if((!user.value.shangjiazhanghao)){
			context?.$toolUtil.message(`商家账号不能为空`,'error')
			return false
		}
		if((!user.value.mima)){
			context?.$toolUtil.message(`密码不能为空`,'error')
			return false
		}
		if((!user.value.shangjiamingcheng)){
			context?.$toolUtil.message(`商家名称不能为空`,'error')
			return false
		}
		if(user.value.dianputupian!=null){
			user.value.dianputupian = user.value.dianputupian.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if((!user.value.shoujihaoma)){
			context?.$toolUtil.message(`手机号码不能为空`,'error')
			return false
		}
		if((user.value.shoujihaoma)&&(!context?.$toolUtil.isMobile(user.value.shoujihaoma))){
			context?.$toolUtil.message(`手机号码应输入手机格式`,'error')
			return false
		}
		context?.$http({
			url: `${tableName.value}/update`,
			method: 'post',
			data: user.value
		}).then(res => {
			context?.$toolUtil.message('修改成功','success')
		})

	}
	const getInfo = () => {
		context?.$http({
			url: `${tableName.value}/session`,
			method: 'get'
		}).then(res => {
			user.value = res.data.data
			init()
		})
	}
	getInfo()
</script>

<style lang="scss" scoped>
	// 表单
	.userinfo_form {
		border-radius: 6px;
		padding: 30px;
		box-shadow: 0 0px 0px rgba(85, 255, 255, 0.5);
		// form item
		:deep(.el-form-item) {
			border: 1px solid #ddd;
			margin: 0;
			display: flex;
			// 内容盒子
			.el-form-item__content{
				padding: 0 20px;
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
			}
			// 输入框
			.list_inp {
				border: 1px solid #ddd;
				box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
				padding: 0 10px;
				width: 100%;
				line-height: 36px;
				box-sizing: border-box;
				height: 36px;
				//去掉默认样式
				.el-input__wrapper{
					border: none;
					box-shadow: none;
					background: none;
					border-radius: 0;
					height: 100%;
					padding: 0;
				}
				.is-focus {
					box-shadow: none !important;
				}
			}
			//下拉框样式
			.list_sel {
				border: 1px solid #ddd;
				border-radius: 0;
				box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
				padding: 0 10px;
				width: 100%;
				line-height: 36px;
				box-sizing: border-box;
				//去掉默认样式
				.select-trigger{
					height: 100%;
					.el-input{
						height: 100%;
						.el-input__wrapper{
							border: none;
							box-shadow: none;
							background: none;
							border-radius: 0;
							height: 100%;
						}
						.is-focus {
							box-shadow: none !important;
						}
					}
				}
			}
			//图片上传样式
			.el-upload-list  {
				//提示语
				.el-upload__tip {
					margin: 7px 0 0;
					color: #999;
					display: flex;
					font-size: 12px;
					justify-content: flex-start;
					align-items: center;
				}
				//外部盒子
				.el-upload--picture-card {
					border: 1px dashed #000;
					cursor: pointer;
					background-color: #fff;
					border-radius: 8px;
					width: 100px;
					line-height: 110px;
					text-align: center;
					height: 100px;
					//图标
					.el-icon{
						color: #000;
						font-size: 32px;
					}
				}
				.el-upload-list__item {
					border: 1px dashed #000;
					cursor: pointer;
					background-color: #fff;
					border-radius: 8px;
					width: 100px;
					line-height: 110px;
					text-align: center;
					height: 100px;
				}
			}

		}
		// 按钮盒子
		.userinfo_form_btn_box {
			padding: 40px 0 0;
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			// 确定按钮
			.userinfo_confirm {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 0 10px 0 0;
				outline: none;
				color: #fff;
				background: rgba(241, 49, 100, 1);
				width: auto;
				font-size: 14px;
				height: 32px;
			}
			// 确定按钮-悬浮
			.userinfo_confirm:hover {
				background: rgba(241, 49, 100, .5);
			}
		}
	}
</style>

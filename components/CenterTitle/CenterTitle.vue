<template>
	<view class="title">
		<text class="titleContent">{{titleName}}</text>
		<slot name="hotDate"></slot>
		<slot name="selectCtegory"></slot>
		<button type="default" class="checkAll">查看全部</button>
	</view>
</template>

<script>
	export default {
		props: ['titleName']
	}
</script>

<style lang="scss">
	.title {
		height: 100rpx;
		line-height: 120rpx;
		border-bottom: 1px solid rgb(227, 227, 227);
		margin-top: 40rpx;


		.titleContent {
			float: left;
			font-size: 40rpx;
			font-weight: 600;

		}

		.checkAll {
			float: right;
			background-color: #ffffff;
			font-size: 25rpx;
			font-weight: 600;
			margin-top: 25rpx;
		}
	}
</style>
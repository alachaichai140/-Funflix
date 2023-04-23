<template>
	<view class="hot_body">
		<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
			<view id="demo2" class="scroll-view-item_H ">
				<view class="card_pic">
					img
				</view>
				<view class="card__info">
					content
				</view>
			</view>
			<view id="demo2" class="scroll-view-item_H ">
				<view class="card_pic">
					img
				</view>
				<view class="card__info">
					content
				</view>
			</view>
			<view id="demo2" class="scroll-view-item_H ">
				<view class="card_pic">
					img
				</view>
				<view class="card__info">
					content
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>

</script>

<style lang="scss">
	.hot_body {
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			height: 600rpx;

			.scroll-view-item_H {
				display: inline-block;
				margin-right: 20rpx;
				width: 60%;
				height: 580rpx;
				font-size: 36rpx;
				box-sizing: border-box;
				border-radius: 40rpx;




				.card_pic {
					height: 70%;
					width: 100%;
					background-color: red;
					border-radius: 30rpx 30rpx 0rpx 0rpx;
				}

				.card__info {
					height: 30%;
					background-color: white;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
					border-radius: 0rpx 0rpx 30rpx 30rpx;
				}
			}
		}
	}
</style>
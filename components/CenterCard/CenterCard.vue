<template>
	<view class="hot_body">
		<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
			<view v-for="item,index in movieDataList" :key="item.id" id="item.id" class="scroll-view-item_H ">
				<view class="card_pic">
					<img :src="item.cover.url?item.cover.url:item.cover_url" alt="">
				</view>
				<view class="card__info">
					<view class="card_info_title">{{item.title}}{{item.original_title?'/'+item.original_title:''}}
					</view>

					<view class="card_info_detail">
						<text>{{item.card_subtitle}}</text>
					</view>
					<view class="card_info_rank">
						<uni-rate v-model="item.rating.star_count" allow-half :readonly="true" size="18"
							:is-fill="false"></uni-rate>
						<text>{{item.rating.value}}分</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			movieDataList: {
				type: Array,
				default: []
			},
		},
	}
</script>

<style lang="scss">
	.hot_body {
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			height: 600rpx;

			.scroll-view-item_H {
				position: relative;
				overflow: hidden;
				display: inline-block;
				margin-right: 20rpx;
				width: 60%;
				height: 580rpx;
				font-size: 36rpx;
				box-sizing: border-box;
				border-radius: 40rpx;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);



				.card_pic {
					height: 100%;
					width: 100%;
					border-radius: 30rpx 30rpx 0rpx 0rpx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.card__info {
					position: absolute;
					height: 32%;
					width: 100%;
					bottom: 0;
					z-index: 99;
					color: white;
					line-height: 1.5;
					background: linear-gradient(to bottom, rgba(128, 128, 128, 0.5) 0%, rgba(128, 128, 128, 0) 50%);
					background-color: rgba(255, 255, 255, 0.4);
					backdrop-filter: blur(3px);
					border-radius: 0rpx 0rpx 30rpx 30rpx;
					box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.5);
					text-shadow: 1px 1px 2px #666;

					.card_info_title {
						margin: 5rpx 10rpx 5rpx 10rpx;
						font-weight: 600;
						text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
						overflow: hidden;
						text-overflow: ellipsis;
						text-shadow: 1px 1px 2px #666;
					}

					.card_info_rank {
						margin-left: 7rpx;

						uni-rate {
							display: inline-block;
							margin-right: 10rpx;
						}

						text {

							font-size: 30rpx;
						}
					}


					.card_info_detail {
						font-size: 25rpx;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-bottom: 5rpx;

						text {

							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							white-space: normal;
							padding: 0 10rpx;
						}
					}

				}
			}
		}
	}
</style>
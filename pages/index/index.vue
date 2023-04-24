<template>
	<view class="container">
		<view class="header">
			<view class="background"
				:style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(255,255,255,1) 100%),  url(${movie.bgImage})` }">
			</view>
			<view class="header_bar">
				<uni-icons type="bars" style="position: absolute;left: 20rpx;top: 30rpx;width: 20%" color="white"
					size="30"></uni-icons>
				<uni-search-bar bgColor="#EEEEEE" radius="100" @focus="focusSearch" cancelButton="none"
					style="width: 80%;position: absolute;left: 90rpx;"></uni-search-bar>
			</view>

			<view class="scroll_list">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" ref="scrollView">
					<view id="demo2" class="scroll-view-item_H active">电影</view>
					<view id="demo3" class="scroll-view-item_H ">游戏</view>
					<view id="demo3" class="scroll-view-item_H ">电视剧集</view>
					<view id="demo3" class="scroll-view-item_H ">动画</view>
					<view id="demo3" class="scroll-view-item_H ">文章</view>
					<view id="demo3" class="scroll-view-item_H ">书籍</view>
					<view id="demo3" class="scroll-view-item_H ">CDD</view>
				</scroll-view>
			</view>

			<view class="swiper" style="height: 750rpx;">
				<swiper :autoplay="true" :interval="4000" :duration="1000" @change='currentChange'
					previous-margin='30rpx' next-margin='30rpx' style="height: 100%;">
					<swiper-item v-for="item in movie.todayShowingMovieList.slice(0,5)">
						<view class="swiper-item"><img :src="item.cover.url" alt=""></view>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<view class="center">
			<view class="showing">
				<CenterTitle titleName='今日上映'></CenterTitle>
				<view class="show_body">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
						<view :id="item.id" class="scroll-view-item_H"
							v-for="item,index in movie.todayShowingMovieList.slice(5,10)" :key="item.id"><img
								:src="item.cover.url" alt=""></view>
					</scroll-view>
				</view>
			</view>
			<view class="top250">
				<CenterTitle titleName='Top250'></CenterTitle>
				<view class="top_body">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" show-scrollBar="true">
						<view class="scroll-view-item_H" v-for="row,index in 4" :key="index">
							<view class="top_title">
								<text class="top_title_index">排名</text>
								<text class="top_title_rank">评分</text>
							</view>
							<ul>
								<li v-for="item,idx in movie.top250MovieList.slice(index*5,(index+1)*5)" :key="item.id">
									<view class="top_index">{{item.honor_infos[0].rank}}</view>
									<view class="top_img">
										<img :src="item.cover_url" alt="">
									</view>
									<view class="top_info">
										<view class="top_info_title">
											{{item.title}}
										</view>
										<view class="top_info_detail">{{item.card_subtitle}}</view>
									</view>
									<view class="top_rank">{{item.rating.value}}⭐</view>
								</li>
							</ul>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="hot">
				<CenterTitle titleName='热门电影'>
					<view slot="hotDate" class="hotDate">
						<button :class="{'active':dateHandler.dayHandler==true}" :disabled="dateHandler.dayHandler"
							@click="handleDate(1)">日</button>
						<button :class="{'active':dateHandler.weeksHandler==true}" :disabled="dateHandler.weeksHandler"
							@click="handleDate(2)">周</button>
						<button :class="{'active':dateHandler.monthHandler==true}" :disabled="dateHandler.monthHandler"
							@click="handleDate(3)">月</button>
					</view>
				</CenterTitle>
				<CenterCard :movieDataList="movie.hotMovieList.slice(0,5)"></CenterCard>
			</view>
			<view class="weekly_best">
				<CenterTitle titleName='一周口碑'></CenterTitle>
				<CenterCard :movieDataList="movie.weeklyBestMovieList.slice(0,5)"></CenterCard>
			</view>
			<view class="movieCategory">
				<CenterTitle titleName='分类电影'>
					<view slot="selectCtegory" class="selectCtegory">
						<uni-data-select :localdata="movie.type" :clear="false"
							v-model="movie.selectTypeValue"></uni-data-select>
					</view>
				</CenterTitle>
				<CenterCard></CenterCard>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		test
	} from '../../api/index.js'
	import moment from 'moment';
	import {
		months
	} from 'moment';
	export default {
		data() {
			return {
				dateHandler: {
					dayHandler: true,
					weeksHandler: false,
					monthHandler: false
				},
				movie: {
					page: 1,
					selectTypeValue: 0,
					currentSwiperItem: 0,

					bgImage: '',
					type: [{
							value: 0,
							text: "动作"
						},
						{
							value: 1,
							text: "喜剧"
						},
						{
							value: 2,
							text: "科幻"
						}, {
							value: 2,
							text: "爱情"
						},
					],
					top250MovieList: [],
					todayShowingMovieList: [],
					hotMovieList: [],
					weeklyBestMovieList: []
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				date: {
					today: moment().format('YYYYMMDD'),
					weeks: moment().subtract(7, 'days').format('YYYYMMDD'),
					month: moment().subtract(1, 'month').format('YYYYMMDD')
				}
			}
		},
		methods: {
			focusSearch() {

			},
			currentChange(event) {
				this.movie.currentSwiperItem = event.detail.current
				this.movie.bgImage = this.movie.todayShowingMovieList[this.movie.currentSwiperItem].cover.url
			},
			handleDate(type) {
				for (let i in this.dateHandler) {
					this.dateHandler[i] = false
				}
				switch (type) {
					case 1:
						this.dateHandler.dayHandler = true
						this.getHotMovie(this.date.today)
						break;
					case 2:
						this.dateHandler.weeksHandler = true
						this.getHotMovie(this.date.weeks)
						break;
					case 3:
						this.dateHandler.monthHandler = true
						this.getHotMovie(this.date.month)
						break;
				}
			},
			getToday() {
				let td = moment();
				this.date.today = td.format('YYYYMMDD');
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			getTopMovie() {
				uni.request({
					url: `https://rank.8610000.xyz/top250/${this.movie.page}.json`,
					success: res => {
						this.movie.top250MovieList = res.data.subject_collection_items
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			getTodayShowing() {
				uni.request({
					url: `https://rank.8610000.xyz/hot/${this.date.today}/movie_showing.json`,
					success: res => {
						this.movie.todayShowingMovieList = res.data
						this.movie.bgImage = res.data[0].cover.url
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			getHotMovie(date) {
				uni.request({
					url: `https://rank.8610000.xyz/hot/${date}/movie_hot_gaia.json`,
					success: res => {
						this.movie.hotMovieList = res.data
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			getWeeklyBestMovie() {
				uni.request({
					url: 'https://rank.8610000.xyz/weekly_best/movie/1.json',
					success: res => {
						this.movie.weeklyBestMovieList = res.data.subject_collection_items
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			getCategoryMovie(type) {
				uni.request({
					url: `https://rank.8610000.xyz/category/${type}/1.json`,
					success: res => {
						console.log(res.data);
					},
					fail: err => {
						console.log(err);
					}
				})
			}
		},
		mounted() {
			this.getTopMovie()
			this.getTodayShowing()
			this.getHotMovie(this.date.today)
			this.getWeeklyBestMovie()
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		font-size: 14px;
		line-height: 24px;

		.header {
			position: relative;

			.background {
				position: absolute;
				width: 100%;
				height: 100%;

				background-repeat: no-repeat;
				transition: background-image 0.3s linear 0s;

				filter: blur(30px);
			}

			.header_bar {
				height: 56px;
			}

			.scroll_list {
				height: 80rpx;
				margin: 20rpx 0;

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;

					.scroll-view-item_H {
						display: inline-block;
						width: 120rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: white;
						text-align: center;
						font-size: 30rpx;
						font-weight: 500;
						margin-left: 25rpx;
					}

					.active {
						border: 1px solid rgba(0, 0, 0, 0.1);
						background-color: rgba(255, 255, 255, 0.12);
						border-radius: 10px;
					}
				}
			}

			.swiper {


				swiper-item {
					text-align: center;
					height: 100%;


					.swiper-item {
						border-radius: 16px;
						box-sizing: border-box;
						height: 100%;
						margin: 0 10rpx;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.center {
			padding: 0 30rpx;

			.showing {
				margin-top: 20rpx;

				.show_body {
					.scroll-view_H {
						white-space: nowrap;
						width: 100%;
						height: 350rpx;

						.scroll-view-item_H {
							display: inline-block;
							margin-right: 20rpx;
							width: 100%;
							height: 100%;
							border-radius: 40rpx;
							overflow: hidden;

							img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}

			}

			.hot {
				margin-top: 40rpx;

				.hotDate {
					display: inline-block;
					margin-left: 65rpx;

					button {
						margin-top: 24rpx;
						margin-right: 10rpx;
						// background-color: white;
						float: left;
						font-size: 25rpx;
						font-weight: 500;
						ackground: linear-gradient(45deg, #f7f7f7 0%, #f2f2f2 25%, #e9e9e9 50%, #e3e3e3 75%, #dbdbdb 100%);
						color: #444;
						border: none;
						border-radius: 5px;
						box-shadow: 0 3px 0 #ccc;
						transition: all 0.2s ease;
					}

					button::after {
						border: none;
					}

					.active {
						box-shadow: none;
						transform: translateY(3px);
						background: linear-gradient(45deg, #e3e3e3 0%, #dbdbdb 25%, #d3d3d3 50%, #ccc 75%, #c4c4c4 100%);

					}
				}

			}

			.weekly_best {}

			.movieCategory {
				.selectCtegory {
					margin-top: 25rpx;
					margin-left: 50rpx;
					float: left;
					width: 40%;

					.el-input__inner {
						background-color: aqua;
					}
				}
			}

			.top250 {
				.top_body {
					.scroll-view_H {
						white-space: nowrap;
						width: 100%;
						height: 850rpx;

						.scroll-view-item_H {
							display: inline-block;
							margin-right: 20rpx;
							width: 90%;
							height: 100%;


							.top_title {
								overflow: hidden;
								height: 40rpx;
								width: 100%;

								.top_title_index {
									float: left;
								}

								.top_title_rank {
									float: right;
									margin-right: 30rpx;
								}

								text {
									font-weight: 600;
								}
							}

							ul {
								height: 100%;

								li {
									list-style: none;
									height: 160rpx;
									padding-right: 30rpx;

									.top_index,
									.top_img,
									.top_info {
										float: left;
									}

									.top_index,
									.top_img,
									.top_rank {
										line-height: 160rpx;
									}

									.top_index {
										font-size: 35rpx;
										text-align: center;
										width: 10%;
										color: #646d75;
										margin-right: 8rpx;
									}

									.top_img {
										height: 100rpx;
										width: 17%;
										background-color: aquamarine;
										margin-top: 15px;
										border-radius: 20rpx;
										overflow: hidden;
										box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

										img {
											max-width: 100%;
											max-height: 100%;

										}
									}

									.top_info {
										height: 100rpx;
										width: 50%;
										margin-top: 18px;
										margin-left: 5%;

										.top_info_title {
											width: 100%;
											font-size: 30rpx;
											font-weight: 600;
											margin-bottom: 10rpx;
										}

										.top_info_detail {
											width: 100%;
											color: rgb(100, 109, 117);
										}

										.top_info_title,
										.top_info_detail {
											white-space: nowrap;
											text-overflow: ellipsis;
											overflow: hidden;
										}
									}



									.top_rank {
										width: 10%;
										float: right;
										text-align: center;
									}
								}

							}

						}
					}
				}
			}
		}


	}
</style>
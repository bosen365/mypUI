<template>
	<loading :class="['myp-loading', 'myp-flex-'+flex, 'myp-align-center', flex==='row'&&'myp-justify-center']" @loading="onloading" :display="isLoading ? 'show' : 'hide'" :style="boxStyle">
		<image v-if="hasMore&&isLoading" class="myp-loading-img" :src="loadingSrc" mode="aspectFill"></image>
		<text v-if="isLoading || (!hasMore&&showNoMore)" class="myp-loading-text">{{loadText}}</text>
		<text v-if="!isLoading&&hasMore" class="myp-loading-text">{{mainText}}</text>
	</loading>
</template>

<script>
	// 
	// 注意：在iOS-app中，当scroll的内容不足一个scroll的高度（也就是scroll无法滚动的时候），无法触发下拉刷新和上提加载
	// list中无此问题
	// list中如果内容不足一个list的高度，则下拉刷新之后，会同时显示出来load，所以我们增加了几个v-if，仅仅只是在真正需要的时候显示load内容
	// 但是增加v-if的问题来了：上提的时候无法看到文字描述，只有开始加载的时候才有
	// 也许当uni解决了这个问题之后，我们就去掉v-if
	// loading组件需要上提触发，并不是滚动到底触发
	//
	export default {
		props: {
			/**
			 * 超时时间，0表示不限制
			 */
			maxTime: {
				type: Number,
				default: 0
			},
			/**
			 * 可以上提时的文字提示
			 */
			mainText: {
				type: String,
				default: '继续上拉加载更多'
			},
			/**
			 * 加载中的文字提示
			 */
			loadingText: {
				type: String,
				default: '正在加载'
			},
			/**
			 * 没有更多时的文字提示
			 */
			noMoreText: {
				type: String,
				default: '没有更多啦'
			},
			/**
			 * 是否还有更多
			 */
			hasMore: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否展示没有更多
			 */
			showNoMore: {
				type: Boolean,
				default: true
			},
			/**
			 * 加载中的gif图片
			 */
			loadingSrc: {
				type: String,
				default: '/static/ui/loading-small.gif'
			},
			/**
			 * 内容的布局方式
			 */
			flex: {
				type: String,
				default: 'column'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isLoading: false
			}
		},
		computed: {
			loadText() {
				if (!this.hasMore) {
					return this.noMoreText
				}
				return this.isLoading ? this.loadingText : this.mainText
			}
		},
		methods: {
			// onLoading意味着触发了上提加载，正在请求数据
			onloading(e) {
				// console.log("正在加载")
				this.isLoading = true
				this.$emit("loading")
				if (!this.hasMore) return;
				// this.isLoading = true
				// this.$emit("loading")
				if (this.maxTime <= 0) return;
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
				const that = this
				this.loadTimeOut = setTimeout(()=>{
					that.$emit("timeout")
					that.cancel()
				}, this.maxTime)
			},
			cancel() {
				this.isLoading = false
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-loading {
		width: 750rpx;
		padding: 20rpx;
		height: 120rpx;
		&-img {
			width: 40rpx;
			height: 40rpx;
		}
		&-text {
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
			padding-left: 12rpx;
			padding-right: 12rpx;
		}
	}
</style>

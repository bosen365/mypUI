<template>
	<view>
		<myp-navbar :fixed="false" title="我欲乘风归去"></myp-navbar>
		<myp-tabs-h :value="mypCurrentTab" :items="tabs" :delay="50" :isTap="mypIsTap" :offset="mypDx" :last="mypLastTabIndex" textType="second" activeTextType="text" activeTextStyle="font-weight:700;" width="100rpx" height="80rpx" @change="mypToTabTab"></myp-tabs-h>
		<!-- #ifndef APP-NVUE -->
		<myp-content-box extra="status-nav-x-50px-80rpx">
		<!-- #endif -->
		<swiper :current="mypCurrentTab" style="width: 750rpx;flex: 1;" @change="mypOnSwiperChange" @animationfinish="mypOnSwiperAnimationFinish" @onAnimationEnd="mypOnSwiperAnimationFinish" @transition="mypOnSwiperScroll">
			<swiper-item v-for="(tab,idx) in tabs" :key="idx">
				<album-list :current='mypCurrentTab' :index="idx" extra="status-nav-x-50px-80rpx"></album-list>
			</swiper-item>
		</swiper>
		<!-- #ifndef APP-NVUE -->
		</myp-content-box>
		<!-- #endif -->
	</view>
</template>

<script>
	import albumList from './albumList.vue'
	import tabsSwiperMixin from '@/mypUI/myp-tabs-h/tabsSwiperMixin.js'
	
	export default {
		components: {
			albumList
		},
		mixins: [tabsSwiperMixin],
		data() {
			return {
				tabs: ['科技','动漫','电影','八卦','新闻','时政','运动','搞笑','音乐','原创','FM','交友','直播']
			}
		}
	}
</script>

<style>
</style>

export function getElSize(name, ins) {
	return new Promise((res, rej) => {
		// #ifndef APP-NVUE
		const el = uni.createSelectorQuery().in(ins).select('#' + name);
		el.fields({
			size: true,
			rect: true
		}, (data) => {
			if (data) {
				res(data);
			} else {
				rej({})
			}
		}).exec();
		// #endif
		// #ifdef APP-NVUE
		let _el = ins.$refs[name][0]
		if (!_el) {
			_el = ins.$refs[name]
		}
		dom.getComponentRect(_el, (data) => {
			if (data.result) {
				res(data.size)
			} else {
				rej({})
			}
		})
		// #endif
	})
}

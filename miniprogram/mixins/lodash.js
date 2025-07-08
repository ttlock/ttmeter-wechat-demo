// mixins/logMixin.js
module.exports = {
    data: {},
    throttle(func, timeout, ...args) {
        const name = `__${func?.name}_throttle_timer_`;
        clearTimeout(this[name]);
        const _that = this;
        this[name] = setTimeout((...args) => {
            clearTimeout(_that[name]);
            _that[name] = null;
            func.apply(_that, args);
        }, timeout, ...args)
    },
    debounce(func, timeout, ...args) {
        const name = `__${func?.name}_debounce_timer_`;
        if (!!this[name]) return;
        const _that = this;
        clearTimeout(this[name]);
        this[name] = setTimeout(() => {
            clearTimeout(_that[name]);
            _that[name] = null;
        }, timeout)
        func.apply(this, args);
    },
};
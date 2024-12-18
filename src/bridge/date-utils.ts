import {format} from 'date-fns';

export let dateUtils = {
    getDate(): string {
        const nowUtc = new Date();  // 当前时间
        return format(nowUtc, "yyyy-MM-dd HH:mm:ss");  // 格式化为 UTC
    }
}
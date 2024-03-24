import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

const time1 = dayjs('09:48:00', 'HH:mm:ss');
const time2 = dayjs('09:33:27', 'HH:mm:ss');

const diff = time1.diff(time2, 'second'); // 返回的差值是以秒为单位的

console.log(parseInt(diff/210)+1); // 输出差值
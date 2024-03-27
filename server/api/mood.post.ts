
import _ from 'lodash';
import dayjs from 'dayjs';
import { prisma } from '~/prisma';
import { REQ } from '~/server/utils';

export default defineEventHandler(async (event) => {
  console.log("post");

  const _date = await readBody(event)
  const trade_date = async (date: string, prev = 30) => {
    const res: any = await REQ(`https://data.10jqka.com.cn/dataapi/limit_up/trade_day?date=${date}&stock=stock&next=1&prev=${prev}`)
    return _.differenceWith<string>(res?.data?.prev_dates, _date)
  }
  const lb = async (date: string) => {
    const res: any = await REQ(`https://data.10jqka.com.cn/dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date=${date}`)
    const lb = res?.data?.[0]
    const height = lb?.height
    const name = lb?.code_list?.map((l: any) => l?.name)
    return { gdb: { name, height } }
  }

  const fb = async (date: string) => {
    const res: any = await REQ(`https://data.10jqka.com.cn/dataapi/limit_up/limit_up_pool?page=1&limit=100&filter=HS,GEM2STAR&date=${date}`)
    const fb = res?.data
    const zt = fb?.limit_up_count?.today
    const dt = fb?.limit_down_count?.today
    const zt_num = +zt?.num
    const zt_fbl = +(zt?.rate * 100).toFixed(2)
    const dt_num = +dt?.num
    const dt_fbl = +(dt?.rate * 100).toFixed(2)
    return { zt_num, zt_fbl, dt_num, dt_fbl }
  }
  const jjl = async (date: string) => {
    const res: any = await REQ(`https://data.10jqka.com.cn/mobileapi/hotspot_focus/stock_pool/v1/get_tab_info?date=${date}`)
    const obj: any = {}
    res?.data?.tabs?.forEach((tab: any) => {
      const v = tab?.sub_tabs?.[0]?.extra?.num
      switch (tab?.name) {
        case '连板天梯':
          let zzt_num = 0;
          let lb_num = 0;
          for (let i of tab?.sub_tabs) {
            const num = +i?.extra?.num
            const ratio = +i?.extra?.ratio
            _.set(obj, `zt_jjl.${i?.key.replace('limit_up_', '')}`, { num, ratio })
            if (num && ratio) {
              lb_num += num;
              zzt_num += num / ratio;
            }
          }
          _.set(obj, 'zt_jjl.all.ratio', +(lb_num / zzt_num).toFixed(2))
          break;
        case '百日新高':
          obj['high_100'] = +v;
          break;
        case '打板大面':
          obj['dm_num'] = +v;
          break;
      }
    })
    return obj;

  }
  const mood = async (date: string) => {
    const key = 'ths_mood_index,market_continue_board,continue_limit_up_risk,market_turnover,limit_up_turnover,last_trade_day_limit_up,last_trade_day_limit_up_continue_success,last_trade_day_limit_up_open_board,north_net_buy,one_hundred_day_high'
    const t = dayjs(date, 'YYYYMMDD').valueOf()
    const res: any = await REQ(`https://data.10jqka.com.cn/mobileapi/hotspot_focus/chart/v1/get_chart?chart_key=${key}&end_time=${t}&size=1`)
    const obj: any = {}
    const p8 = Math.pow(10, 8)
    res?.data?.charts?.forEach((chart: any) => {
      const end = chart?.point_list?.at(0)
      switch (chart?.name) {
        case '同花顺情绪指标':
          obj['ths_mood'] = end[1];
          break;
        case '全市场量能':
          obj['all_vol'] = +(+end[1] / p8).toFixed(0);
          break;
        case '涨停量能':
          obj['zt_vol'] = +(end[1] / p8).toFixed(0);
          break;
        case '北向净买':
          obj['bx'] = { sh: +(+end[1] / p8).toFixed(0), sz: +(+end[2] / p8).toFixed(0) };
          break;

        case '昨日涨停今日收益':
          _.set(obj, 'zr_jsy.zt', end[1])
          break;
        case '昨日连板今日收益':
          _.set(obj, 'zr_jsy.lb', end[1])
          break;
        case '昨日炸板今日收益':
          _.set(obj, 'zr_jsy.zb', end[1])
          break;
      }
    })
    return obj;
  }
  const v_trade_date = await trade_date(dayjs().add(1, "day").format("YYYYMMDD"), 60)
  console.log(v_trade_date);

  const tasks = v_trade_date?.map(async (date: string) => {
    const v_lb = await lb(date)
    const v_fb = await fb(date)
    const v_jjl = await jjl(date)
    const v_mood = await mood(date)
    // console.log({ ...v_lb, ...v_fb, ...v_jjl, ...v_mood });
    return { date, ...v_lb, ...v_fb, ...v_jjl, ...v_mood }
  })

  const data = tasks && await Promise.all(tasks)

  // console.log(data);



  return prisma.mood.createMany({ data })
})
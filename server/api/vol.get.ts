import { REQ } from "../utils";

export default defineEventHandler(async (event) => {
  console.log(222);

  const { code, time, bs } = getQuery(event)
  let arr: any[] = [];
  let p = 0
  // console.log(code, time, bs);

  while (1) {
    const res: any = await REQ(`https://stock.gtimg.cn/data/index.php?appn=detail&action=data&c=${code}&p=${p}`)
    if (!res) break
    arr = arr?.concat(res?.split('"')?.[1]?.split('|')?.map((i: string) => i?.split('/')));
    p += 1;
  }
  const df = arr.map((row: string[]) => {
    const [index, time, price, chg, vol, vol_amount, type] = row;
    return { index, time, price, chg, vol, vol_amount, type };
  });
  console.log(df, time, bs);

  const df1 = df.filter((row) => row.time >= time && row.type == bs);
  console.log(df1);

  const sumVol = df1.reduce((sum, row) => sum + Number(row.vol_amount), 0);

  return sumVol / 10000;
})
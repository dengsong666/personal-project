interface Mood {
  date: string;
  gdb: Gdb;
  zt_num: number;
  zt_fbl: number;
  dt_num: number;
  dt_fbl: number;
  zt_jjl: Ztjjl;
  high_100: number;
  dm_num: number;
  ths_mood: number;
  all_vol: number;
  zt_vol: number;
  zr_jsy: Zrjsy;
  bx: Bx;
}

interface Bx {
  sh: number;
  sz: number;
}

interface Zrjsy {
  zt: number;
  lb: number;
  zb: number;
}

interface Ztjjl {
  all: All;
  one: All;
  two: All;
  three: All;
  four: All;
  high: All;
}

interface All {
  num: number;
  ratio: number;
}

interface Gdb {
  name: string[];
  height: number;
}
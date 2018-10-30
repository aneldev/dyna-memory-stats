export interface IMemoryStats {
  // in mb
  residentSetState: number;
  heapTotal: number;
  heapUsed: number;
  heapLimit: number;
  boundCppObjects: number;
}

const isNode: boolean = typeof process !== "undefined" && !!process.memoryUsage;

if (isNode) require('console.table');

export const getMemoryStats = (): IMemoryStats => {
  return isNode
    ? getMemoryStatsFromNodeJs()
    : getMemoryStatsFromBrowser();
};

const getMemoryStatsFromNodeJs = (): IMemoryStats => {
  const mem = process.memoryUsage();
  return {
    residentSetState: roundValue(mem.rss),
    heapTotal: roundValue(mem.heapTotal),
    heapUsed: roundValue(mem.heapUsed),
    heapLimit: null,
    boundCppObjects: roundValue(mem.external),
  };
};

const getMemoryStatsFromBrowser = (): IMemoryStats => {
  const mem = (window.performance as any).memory;
  return {
    residentSetState: null,
    heapTotal: roundValue(mem.totalJSHeapSize),
    heapUsed: roundValue(mem.usedJSHeapSize),
    heapLimit: roundValue(mem.jsHeapSizeLimit),
    boundCppObjects: null,
  };
};

let intervalTimer: any = null;
let memoryStats: IMemoryStats[] = null;
export const consoleMemoryStatsStart = (timeout: number = 3000): void => {
  if (intervalTimer) return;
  memoryStats = [];
  intervalTimer = setInterval(consoleMemoryStats, timeout);
  consoleMemoryStats();
};

export const consoleMemoryStatsStop = (): void => {
  clearInterval(intervalTimer);
  consoleMemoryStats();
  console.table(
    graphTable<IMemoryStats>(
      memoryStats,
      {residentSetState: 0.1, heapTotal: 0.1, heapUsed: 0.1, heapLimit: 0.1, boundCppObjects: 0.1},
    )
  );
};

export const consoleMemoryStats = (): void => {
  const memStats = getMemoryStats();
  memoryStats.push((memStats));
  console.log('consoleMemoryStats', JSON.stringify(memStats, null, 4));
};

const roundValue = (value: number): number => Math.round(value / 1024 / 1024 * 10) / 10;

const graphTable = <TData>(objArray: TData[], objGraphFactor: TData): any[] => {
  return objArray.map((obj: any) => {
    const newObj: any = {};
    Object.keys(obj)
      .forEach((key: string) => {
        newObj[key + '_graph'] = graphValue(obj[key], objGraphFactor[key]);
        newObj[key + '_value'] = obj[key];
      });
    return newObj;
  })
};

const graphValue = (value: number, graphFactor: number): string => {
  return Array(Math.round(value * graphFactor)).fill('#').join('');
};

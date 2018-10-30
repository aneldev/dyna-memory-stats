export interface IMemoryStats {
    residentSetState: number;
    heapTotal: number;
    heapUsed: number;
    heapLimit: number;
    boundCppObjects: number;
}
export declare const getMemoryStats: () => IMemoryStats;
export declare const consoleMemoryStatsStart: (timeout?: number) => void;
export declare const consoleMemoryStatsStop: () => void;
export declare const consoleMemoryStats: () => void;

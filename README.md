# About

Universal get memory stats.

Supports from browser (Chrome only) and NodeJs environments.

Console the stats in tables.

# Methods

## getMemoryStats = (): IMemoryStats

## const consoleMemoryStats = (): void

## consoleMemoryStatsStart = (timeout: number = 3000): void

## consoleMemoryStatsStop = (): void

# Interfaces

## IMemoryStats
This is the memory stats interface, not that according the environment no all properties have values, some of them might be null.
```
interface IMemoryStats {
  // all are in mb
  residentSetState: number;
  heapTotal: number;
  heapUsed: number;
  boundCppObjects: number;
}
```

# process.memoryUsage explanation

- **rss** stands for Resident Set Size, it is the total memory allocated for the process execution
- **heapTotal** is the total size of the allocated heap
- **heapUsed** is the actual memory used during the execution of our process
- **external** refers to the memory usage of C++ objects bound to JavaScript objects managed by V8

# References

https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for?noredirect=1&lq=1

https://www.valentinog.com/blog/memory-usage-node-js/

// import "dyna-node-console";

import "../utils/unhandledPromiseRejections";
import {consoleMemoryStatsStart, consoleMemoryStatsStop} from "../src";

consoleMemoryStatsStart(500);

setTimeout(()=>{
  consoleMemoryStatsStop();
},3000)

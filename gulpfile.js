"use strict";

eval(require("typescript").transpile(require("fs").readFileSync("./gulpfileMain.ts").toString()));

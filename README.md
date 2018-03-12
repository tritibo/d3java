# d3java
Run d3 from java

## How it works
It uses the Java ScriptEngine to load d3.js.

The dom abstraction is provided by a patched version of domino https://github.com/fgnass/domino.

The modules are loaded by an adapted version of requirejs.

## How to use

```
D3JavaChart d3JavaChart = D3JavaChart.getInstance();
String chart = d3JavaChart.getChart("pie.js");
System.out.println(chart);
```
pie.js is the porting of this chart https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0 that you can find in test resources.

The following svg is generated:

<img src="./test.svg" alt="Pie">

## Performance
After the first run (initialization) you can generate charts in a few milliseconds < 10 on typical pc workstation.

## Credits
I was inspired by this work http://jazdw.net/content/server-side-svg-generation-using-d3js

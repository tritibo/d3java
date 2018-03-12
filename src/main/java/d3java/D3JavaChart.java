package d3java;
import java.io.InputStreamReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class D3JavaChart {
	
	private static D3JavaChart instance = new D3JavaChart();
	private ScriptEngine engine;

	private D3JavaChart() {
		ScriptEngineManager factory = new ScriptEngineManager();
	    engine = factory.getEngineByName("JavaScript");
		try {
			engine.eval(new InputStreamReader(getClass().getClassLoader().getResourceAsStream("d3java/js/require.js")));
			engine.eval(new InputStreamReader(getClass().getClassLoader().getResourceAsStream("d3java/js/d3.v4.min.js")));
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	public static D3JavaChart getInstance() {
		return instance;
	}
	
	public String getChart(String chartFile) {
		try {
			return engine.eval(new InputStreamReader(getClass().getClassLoader().getResourceAsStream(chartFile))).toString();
		} catch (ScriptException e) {
			e.printStackTrace();
			return null;
		}
	}
}

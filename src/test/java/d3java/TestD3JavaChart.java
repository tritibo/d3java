package d3java;

import org.junit.Test;

public class TestD3JavaChart {

	@Test
	public void testPrintChart() {
		D3JavaChart d3JavaChart = D3JavaChart.getInstance();
		String chart = d3JavaChart.getChart("pie.js");
		System.out.println(chart);
	}
}

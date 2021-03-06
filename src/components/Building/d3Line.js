import * as d3 from 'd3'
import moment from 'moment'
import hexToRgba from 'hex-to-rgba'

import { ClearDay, ClearNight, Cloudy, Fog, PartlyCloudyDay, PartlyCloudyNight, Rain, Sleet, Snow, Wind, } from '../../assets/weathericons'
import { store } from '../../Providers'
import { getWeather } from 'data/weather';

const getMedianLineData = (data) => {
	let medianValues = []
	if (data.length > 0) {
		let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
		let avrg = parseFloat((sum / data.length).toFixed(3))
		medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]
	}

	return medianValues
}

const getMax = (arr) => {
	if (arr.length > 0) {
		let max = Math.max(...arr.map(d => d.value))

		if (max < 1) {
			return max + 0.01;
		} else if (max < 5) {
			return max + 1;
		} else if (max > 100000) {
			return max + 10000;
		} else if (max > 10000) {
			return max + 1000;
		} else if (max > 1000) {
			return max + 500;
		} else if (max > 100) {
			return max + 200;
		} else if (max > 5) {
			return max + 10;
		}
	}
}
const getMin = (arr) => {
	return 0;
}

class d3Line {
	containerEl
	props
	svg
	classes
	state = [];

	constructor(containerEl, props, classes) {
		this.classes = classes
		this.setLine = props.setLine
		this.containerEl = containerEl
		this.props = props
		this.period = props.period
		this.margin = { top: 30, right: 50, bottom: 50, left: 50 }
		// let data = props.data ? props.data[props.id] : []
		//Get the height and width from the container
		this.height = containerEl.clientHeight
		this.width = containerEl.clientWidth
		this.weatherData = props.weatherData ? props.weatherData : []
		this.svg = d3.select(`#${props.id}`)
		this.state = store.getState().appState.lines
		this.generateXAxis()
		this.generateYAxis()

		//Define the area for the values
		this.valueArea = d3.area()
			.x((d) => { return this.x(moment(d.date).valueOf()) })
			.y0(this.y(0))
			.y1((d) => { return this.y(d.value) })

		this.valueLine = d3.line()
			.curve(d3.curveCatmullRom)
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y(d.value))
		this.div = d3.select(`#tooltip${props.id}`)
			.style("opacity", 0)
		this.medianTooltip = d3.select(`#medianTooltip${this.props.id}`)
			.style("opacity", 0)

		//#region Ticks

		this.update()
	}
	setState = (key, value, noUpdate) => {
		this.setLine(key, value)
		// this.state[key] = value
		this.state = store.getState().appState.lines
		if (!noUpdate) {

			this.update()
		}

	}
	update = () => {
		//#region Update Y-Axis
		let data = this.props.data ? this.props.data[this.props.id] : []
		let newData = data.filter(f => !this.state['L' + f.name])
		let allData = [].concat(...newData.map(d => d.data))
		// this.y.domain([Math.floor(getMin(allData)), Math.round(getMax(allData))])
		this.y.domain([getMin(allData), getMax(allData)])
		this.yAxis.remove()
		this.svg.selectAll("*").remove()
		this.generateXAxis()
		this.generateYAxis()
		this.generateLines()
		this.generateWeather()
		this.generateMedian()
		this.generateLegend()
		this.generateDots()
	}

	generateYAxis = (noDomain) => {
		const classes = this.classes
		const height = this.height
		// let data = this.props.data ? this.props.data[this.props.id] : []
		if (this.y === undefined) {
			// let allData = [].concat(...data.map(d => d.data))
			this.y = d3.scaleLinear().range([height - this.margin.bottom, this.margin.top + 20])
			// this.y.domain([getMin(allData), getMax(allData)])
		}

		let yAxis = this.yAxis = this.svg.append("g")
			.attr('transform', `translate(${this.margin.left + 28}, 0)`)
			.call(d3.axisLeft(this.y).tickFormat(d => {
				var da_DK = {
					"decimal": ",",
					"thousands": ".",
					"grouping": [3],
					"currency": ["", " dkk"],
				}
				return d3.formatLocale(da_DK).format(',')(d)
			}))

		yAxis.selectAll('path').attr('class', classes.axis)
		// yAxis.selectAll('line').attr('class', classes.yAxisLine).attr('x2', this.width)
		yAxis.selectAll('line').attr('class', classes.axis)
		yAxis.selectAll('text').attr('class', classes.axisTick)

		yAxis.append('text')
			.attr('transform', `translate(15, ${this.margin.top - 15 })`)
			.attr('class', classes.axisText)
			.html(this.props.unit)
	}

	generateXAxis = () => {
		const width = this.width

		this.x = d3.scaleTime().range([this.margin.left + 45, width - this.margin.right])
		let period = this.props.period
		let data = this.props.data ? this.props.data[this.props.id] : []
		let newData = data.filter(f => !this.state['L' + f.name])
		let allData = [].concat(...newData.map(d => d.data))
		let from = moment.min(allData.map(d => moment(d.date))).startOf('day')
		let to = moment.max(allData.map(d => moment(d.date)))

		this.x.domain([from, to])


		const classes = this.classes
		const height = this.height
		let timeType = period.timeType
		let counter = moment(from)
		let hourTicks = []
		this.ticks = []
		let monthTicks = []
		let add = 1
		let lb = 0
		if (moment(counter).diff(to, 'day') > 14) {
			add = 3
		}

		/**
		 * Month tick generator
		 */
		if (timeType === 4) {
			monthTicks.push(counter.valueOf())
			while (moment(counter).diff(to, 'day') < 0) {
				this.ticks.push(counter.valueOf())
				if (lb === 0) {
					counter.add(14, 'day')
					lb = 1
				} else {
					let diff = -1 * moment(counter).diff(moment(counter).endOf('month'), 'days')
					counter.add(diff + 1, 'day')
					lb = 0
				}

				if (
					monthTicks.findIndex(f => {
						return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
					}) === -1
				) {
					monthTicks.push(counter.valueOf())
				}
			}
			to = moment(to).add(1, 'day');
			this.ticks.push(to.valueOf())
			monthTicks.push(to.valueOf())
		} else if (timeType === 1) {
			while (moment(counter).diff(to, 'hour') < 0) {
				hourTicks.push(counter.valueOf())
				counter.add(add, 'hour')
			}
			hourTicks.push(to.valueOf())
		} else {
			/**
			 * Day tick generator
			 */
			while (moment(counter).diff(to, 'day') < 0) {
				this.ticks.push(counter.valueOf())
				counter.add(add, 'day')
			}
			this.ticks.push(to.valueOf())

			monthTicks.push(counter.valueOf())
			while (moment(counter).diff(to, 'day') < 0) {
				counter.add(add, 'day')
				if (
					monthTicks.findIndex(f => {
						return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
					}) === -1
				) {

					monthTicks.push(counter.valueOf())
				}
			}
			monthTicks.push(to.valueOf())
		}

		/**
		  * Generate Hour axis
		  */
		var xAxis_hours = this.xAxis_hours = d3.axisBottom(this.x)
			// .tickFormat(d3.timeFormat("%d"))
			.tickFormat(f => moment(f).format('HH:mm'))
			.tickValues(hourTicks)

		/**
		 * Append Day Axis
		 */
		this.xAxisHours = this.svg.append("g")
			.attr("transform", `translate(0,  ${(height - this.margin.bottom + 5)})`)
			.call(xAxis_hours)

		/**
 		* Day Axis Styling
 		*/
		this.xAxisHours.selectAll('path').attr('class', classes.axis)
		// this.xAxis.selectAll('line').attr('class', classes.yAxisLine).attr('y2', `-${this.height - this.margin.bottom - 20}`)
		this.xAxisHours.selectAll('line').attr('class', classes.axis)
		this.xAxisHours.selectAll('text').attr('class', classes.axisTick)


		/**
		 * Generate Day axis
		 */
		var xAxis_woy = this.xAxis_days = d3.axisBottom(this.x)
			// .tickFormat(d3.timeFormat("%d"))
			.tickFormat(f => moment(f).format('D'))
			.tickValues(this.ticks)

		/**
		 * Append Day Axis
		 */
		this.xAxis = this.svg.append("g")
			.attr("transform", `translate(0,  ${(height - this.margin.bottom + 5)})`)
			.call(xAxis_woy)

		/**
 		* Day Axis Styling
 		*/
		this.xAxis.selectAll('path').attr('class', classes.axis)
		// this.xAxis.selectAll('line').attr('class', classes.yAxisLine).attr('y2', `-${this.height - this.margin.bottom - 20}`)
		this.xAxis.selectAll('line').attr('class', classes.axis)
		this.xAxis.selectAll('text').attr('class', classes.axisTick)

		/**
		 * Generate Month Axis
		 */
		var xAxis_months = this.xAxis_months = d3.axisBottom(this.x)
			.tickFormat(d => moment(d).format('MMM'))
			.tickValues(monthTicks)
		/**
		 * Append Month Axis
		 */
		this.xAxisMonths = this.svg.append("g")
			.attr("transform", "translate(-8," + (height - this.margin.bottom + 26) + ")")
			.call(xAxis_months)
		/**
		* Month Axis Styling
		*/
		this.xAxisMonths.selectAll('path').attr('class', classes.axis)
		this.xAxisMonths.selectAll('line').attr('class', classes.axis)
		this.xAxisMonths.selectAll('text').attr('class', classes.axisText)
		// this.xAxis.append('text')
		// 	.attr('transform', `translate(0,50)`)
		// 	.attr('class', classes.axisText)
		// 	.html(toUppercase(moment(ticks[0].date).format('MMMM')))
	}

	generateWeather = async () => {
		const classes = this.classes
		const height = this.height
		const margin = this.margin

		let weatherData = [];
		if (this.period.timeType === 2) { // only generate weather for week view
			if (this.props.building.lat && this.props.building.lon) {
				let dates = [];
				for (var m = moment(this.period.from); m.diff(this.period.to, 'days') <= 0; m.add(1, 'days')) {
					dates.push(m.format('YYYY-MM-DD'));
				}

				let weather = await Promise.all(dates.map((d) => getWeather(d, this.props.building.lat, this.props.building.lon))).then(rs => rs)
				let fWeather = weather.map(r => r.daily.data[0])
				let finalData = fWeather.map(w => ({
					date: moment(w.time),
					icon: w.icon,
					description: w.summary
				}));

				weatherData = finalData;
			}
		}

		const getIcon = (icon) => {
			switch (icon) {
				case 'clear-day':
					return ClearDay
				case 'clear-night':
					return ClearNight
				case 'cloudy':
					return Cloudy
				case 'fog':
					return Fog
				case 'partly-cloudy-day':
					return PartlyCloudyDay
				case 'partly-cloudy-night':
					return PartlyCloudyNight
				case 'rain':
					return Rain
				case 'sleet':
					return Sleet
				case 'snow':
					return Snow
				case 'wind':
					return Wind
				default:
					break
			}
		}
		this.xAxis.selectAll('.tick').each(function (d, i) {
			let parent = d3.select(this)
			if (this.nextSibling) {
				if (i % 2 === 0) {
					parent.append('rect')
						.attr('class', classes.axisLineWhite)
						.attr("width", this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x)
						.attr("height", height - margin.bottom - 26)
						.attr('style', `transform: translate(0px, -${height + 5 - margin.bottom - 26}px)`)
					if (weatherData[i]) {
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					}
					// .attr("width", 32)
					// .attr("height", 32)
				} else {
					if (weatherData[i])
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					// .attr("width", 32)
					// .attr("height", 32)
				}
				// }
			}
		})
		this.xAxisHours.selectAll('.tick').each(function (d, i) {
			let parent = d3.select(this)
			if (this.nextSibling) {

				if (i % 2 === 0) {
					parent.append('rect')
						.attr('class', classes.axisLineWhite)
						.attr("width", this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x)
						.attr("height", height - margin.bottom - 26)
						.attr('style', `transform: translate(0px, -${height + 5 - margin.bottom - 26}px)`)
					if (weatherData[i]) {
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					}
					// .attr("width", 32)
					// .attr("height", 32)
				}
				else {
					if (weatherData[i]) {
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					}
					// .attr("width", 32)
					// .attr("height", 32)
				}
				// }
			}
		})
	}

	generateDots = () => {
		let data = this.props.data ? this.props.data[this.props.id] : []
		const setTooltip = this.props.setTooltip
		const width = this.width
		data.forEach((line) => {
			if (line.onlyMedian) {
				return
			}
			let tooltipDiv = d3.select(`#tooltip${this.props.id}`)
			this.svg.selectAll(".dot")
				.data(line.data)
				.enter()
				.append("circle") // Uses the enter().append() method
				.on("mouseover", function (event, d) {
					d3.select(this).transition().duration(200).attr('opacity', 1)
					tooltipDiv.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040)
					// let left = event.pageX < 175 ? 245 : d3.event.pageX
					// left = event.pageX > width - 175 ? width - 150 : left
					let left = event.pageX;
					if (left + 300 > width) {
						left -= 300;
					}
					tooltipDiv.style("left", left + "px").style("top", (event.pageY + 10) + "px")
					setTooltip(d, line.name)
				}).on("mouseout", function () {
					// setExpand(false)
					d3.select(this).transition().duration(200).attr('opacity', 0)
					tooltipDiv.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0)
				})
				.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
				// .attr("class", classes[`${line.name}Dot`]) // Assign a class for styling
				.attr("cy", (d) => { return this.y(d.value) })
				.attr('opacity', 0)
				.transition()
				.attr("id", `Dots${line.name}`)
				// .style("opacity", this.state['L' + line.name] ? 0 : 1)
				.delay((d, i) => { return i * (1500 / line.data.length) })
				.attr("r", 8)
				.attr("fill", line.color);
		})
	}

	generateLegend = () => {
		let data = this.props.data[this.props.id]
		data.forEach((line) => {
			if (line.median & !line.noMedianLegend) {
				let LegendMCheck = d3.select(`#LegendMedianCheckbox${line.name}`)
				let LegendM = d3.select(`#LegendMedian${line.name}`)
				let LegendMLabel = d3.select(`#LegendMedianLabel${line.name}`)
				LegendMCheck.on('click', () => {

					var active = this.state['Median' + line.name] ? false : true,
						newOpacity = active ? 0 : 1, display = active ? 'none' : undefined,
						newColor = active ? 'steelblue' : line.color ? line.color : "#fff"

					// Hide or show the elements

					d3.selectAll(`#MedianL${line.name}`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					d3.selectAll(`#MedianLegend${line.name}`)
						.transition().duration(200)
						.style("fill", newColor)
					d3.select(`#MedianH${line.name}`)
						.transition().duration(200)
						.style("display", display)

					// LegendMCheck
					// 	.attr('value', active)
					LegendM
						.style("color", active ? 'rgba(255, 255, 255, 0.3)' : line.color)
					LegendMLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')
					this.setState('Median' + line.name, active)
				})
			}

			let Legend = d3.select(`#Legend${line.name}`)
			let LegendCheck = d3.select(`#LegendCheckbox${line.name}`)
			let LegendLabel = d3.select(`#LegendLabel${line.name}`)
			LegendCheck.on('click', () => {
				let active = this.state['L' + line.name] ? false : true,
					newOpacity = active ? 0 : 1, display = active ? 'none' : undefined
				// Hide or show the elements

				d3.select(`#L${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.selectAll(`#Dots${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#Area${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#MArea${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#HArea${line.name}`)
					.transition().duration(200)
					.style("display", display)
				// LegendCheck
				// 	.attr('value', active)
				Legend
					.style("color", active ? 'rgba(255,255,255,0.3)' : line.prev ? '#fff' : line.color)
				LegendLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')

				this.setState('L' + line.name, active)
			})


		})

	}

	generateLines = () => {
		let data = this.props.data[this.props.id]
		let animArea0 = d3.area()
			.y0(this.height - this.margin.bottom)
			.y1(this.height - this.margin.bottom)
			.x((d) => { return this.x(moment(d.date).valueOf()) })
		data.forEach((line, i) => {
			//#region Generate Line Area
			if (data) {
				if (line.onlyMedian) {
					return
				}
				if (!line.noArea) {
					let defArea = d3.area()
						.curve(d3.curveCatmullRom)
						.x((d) => { return this.x(moment(d.date).valueOf()) })
						// .y0(this.y(((i === 0) || (line.prev) || (!line.smallArea)) ? 0 : min > 1 ? min - 10 : min - 0.1))
						.y0(this.height - this.margin.bottom)
						.y1((d) => { return this.y(d.value) })
					this.svg.append("path")
						.attr('id', 'Area' + line.name)
						.data([line.data])
						.attr("opacity", this.state['L' + line.name] ? 0 : 1)
						.attr('fill', hexToRgba(line.color, 0.3))
						.attr("d", animArea0)
						.transition()
						.duration(1500)
						.attr("d", defArea)
					if (line.noMedianLegend) {
						let setMedianTooltip = this.props.setMedianTooltip
						var medianTooltip = this.medianTooltip
						let medianData = getMedianLineData(line.data)

						let medianLine = this.svg.append('path')
							.data([medianData])
							.attr('fill', 'none')
							.attr('stroke', 'rgba(255,255,255, 0.1)')
							.attr('stroke-width', '4px')
							// .attr('class', classes.medianLinePrev)
							.attr('d', this.valueLine)
							.attr('id', 'Median' + line.name)
							.attr('opacity', this.state[`L${line.name}`] ? 0 : 1)
							.attr('stroke-dasharray', ("3, 3"))

						// Hidden overlay for Median tooltip
						this.svg.append('path')
							.data([medianData])
							// .attr('class', classes.hiddenMedianLine)
							.attr('stroke', '#fff')
							.attr('opacity', 0)
							.attr('stroke-width', '7px')
							.attr('d', this.valueLine)
							.attr('id', 'HArea' + line.name)
							.on("mouseover", (event, d) => {
								if (!this.state[`L${line.name}`]) {

									medianLine.transition()
										.duration(100)
										.style('stroke-width', '7px')

									medianTooltip.transition()
										.duration(200)
										.style("opacity", 1)
										.style('z-index', 1040)

									medianTooltip.style("left", (event.pageX) - 82 + "px")
										.style("top", (event.pageY) - 41 + "px")

									setMedianTooltip(d[0])
								}

							}).on("mouseout", function () {
								// setExpand(false)
								medianLine.transition()
									.duration(100)
									.style('stroke-width', '4px')
								medianTooltip.transition()
									.duration(500)
									.style('z-index', -1)
									.style("opacity", 0)
							}).on('click', function () {
								// setExpand(true)
							})
					}
				}
				//#endregion
				//#region Generate Line
				if (!line.prev)
					if (line.dashed) {
						//Set up your path as normal
						var path = this.svg.append("path")
							.data([line.data])
							.attr('id', 'L' + line.name)
							.attr('fill', 'none')
							.attr('stroke', line.color)
							.attr('stroke-width', '4px')
							.attr('d', this.valueLine)
							.attr("opacity", this.state['L' + line.name] ? 0 : 1)

						//Get the total length of the path
						var totalLength = 0
						if (path.node())
							totalLength = path.node().getTotalLength()

						/////// Create the required stroke-dasharray to animate a dashed pattern ///////

						//Create a (random) dash pattern
						//The first number specifies the length of the visible part, the dash
						//The second number specifies the length of the invisible part
						var dashing = "6, 6"

						//This returns the length of adding all of the numbers in dashing
						//(the length of one pattern in essence)
						//So for "6,6", for example, that would return 6+6 = 12
						var dashLength =
							dashing
								.split(/[\s,]/)
								.map(function (a) { return parseFloat(a) || 0 })
								.reduce(function (a, b) { return a + b })

						//How many of these dash patterns will fit inside the entire path?
						var dashCount = Math.ceil(totalLength / dashLength)

						//Create an array that holds the pattern as often
						//so it will fill the entire path
						var newDashes = new Array(dashCount).join(dashing + " ")
						//Then add one more dash pattern, namely with a visible part
						//of length 0 (so nothing) and a white part
						//that is the same length as the entire path
						var dashArray = newDashes + " 0, " + totalLength

						/////// END ///////

						//Now offset the entire dash pattern, so only the last white section is
						//visible and then decrease this offset in a transition to show the dashes
						path
							.attr("stroke-dashoffset", totalLength)
							//This is where it differs with the solid line example
							.attr("stroke-dasharray", dashArray)
							.transition().duration(1500)
							.attr("stroke-dashoffset", 0)
					}
					else {

						this.svg.append('path')
							.data([line.data])
							.attr('id', 'L' + line.name)
							// .attr('class', classes[line.name])
							.attr('fill', 'none')
							.attr('stroke', line.color)
							.attr('stroke-width', '4px')
							.attr('d', this.valueLine)
							.attr("stroke-dasharray", function () {
								return this.getTotalLength()
							})
							.attr("stroke-dashoffset", function () {
								return this.getTotalLength()
							})
							.attr("opacity", this.state["L" + line.name] ? 0 : 1)
							.transition()
							.duration(1500)
							.attr('stroke-dashoffset', 0)
							.transition()
							.duration(100)
							.style("stroke-dasharray", undefined)


						//#endregion
					}
			}
		})
	}

	generateMedian = () => {
		const { setMedianTooltip } = this.props
		const classes = this.classes
		//Median tooltip
		let data = this.props.data[this.props.id]
		var medianTooltip = this.medianTooltip
		data.forEach((line) => {
			if (line.onlyMedian) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					// .attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianL${line.name}`)
					.attr("opacity", this.state['L' + line.name] ? 0 : 1)
					.attr('stroke-width', '4px')
					.attr('stroke', '#FA0000')
					.attr('stroke-dasharray', ("3, 3"))

				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianH${line.name}`)
					.style('display', this.state['Median' + line.name] ? 'none' : undefined)
					.on("mouseover", (event, d) => {
						if (!this.state[`Median${line.name}`]) {

							medianLine.transition()
								.duration(100)
								.style('stroke-width', '7px')

							if (line.noTooltip) {

							}
							else {
								medianTooltip.transition()
									.duration(200)
									.style("opacity", 1)
									.style('z-index', 1040)
								medianTooltip.style("left", (event.pageX) - 82 + "px")
									.style("top", (event.pageY) - 41 + "px")

								setMedianTooltip(d[0])
							}
						}

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
						if (line.noTooltip) {

						}
						else {
							medianTooltip.transition()
								.duration(500)
								.style('z-index', -1)
								.style("opacity", 0)
						}
					})
			}

			//Median line
			if ((line.median && !line.noMedianLegend)) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					// .attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianL${line.name}`)
					.attr('opacity', this.state[`Median${line.name}`] ? 0 : 1)
					.attr('stroke-width', '4px')
					.attr('stroke', '#FA0000')
					.attr('stroke-dasharray', ("3, 3"))

				// Hidden overlay for Median tooltip
				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianH${line.name}`)
					.style('display', this.state['Median' + line.name] ? 'none' : undefined)
					.on("mouseover", (event, d) => {
						if (!this.state[`Median${line.name}`]) {

							medianLine.transition()
								.duration(100)
								.style('stroke-width', '7px')

							medianTooltip.transition()
								.duration(200)
								.style("opacity", 1)
								.style('z-index', 1040)

							medianTooltip.style("left", (event.pageX) - 82 + "px")
								.style("top", (event.pageY) - 41 + "px")

							setMedianTooltip(d[0])
						}

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
						medianTooltip.transition()
							.duration(500)
							.style('z-index', -1)
							.style("opacity", 0)
					}).on('click', function () {
						// setExpand(true)
					})
			}
		})
	}

	destroy = () => {
		// this.svg.remove()
		this.svg.selectAll("*").remove()
	}
}

export default d3Line;

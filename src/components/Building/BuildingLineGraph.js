import React, { useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import d3Line from './d3Line'
import usePrevious from '../../hooks/usePrevious'
import lineGraphStyles from '../../styles/lineGraphStyles'
// import Tooltip from './Tooltip'
// import MedianTooltip from './MedianTooltip'
// import Legend from './Legend'
import CircularLoader from '../CircularLoader'
// import d3LineFS from 'Components/Graphs/classes/d3LineFullScreen'
import { setGraphLine, setGraphLines } from '../../redux/appState'
import { getDeviceData } from '../../redux/lineData';

let line = null

const BuildingLineGraph = (props) => {
	//Hooks
	const classes = lineGraphStyles()
	const dispatch = useDispatch() 
	//Redux
	const deviceData = useSelector(s => s.lineData.data)
	const loading = useSelector(s => s.lineData.loading)
	// const weatherData = useSelector(s => s.data.weatherData)
	const period = useSelector(s => s.dateTime.period)
	const mUnit = useSelector(s => s.settings.mUnit)
	const fsLG = useSelector(s => s.appState.fullScreenLineChart)
	const graphLines = useSelector(s => s.appState.lines)
	//State
	const lineChartContainer = useRef(React.createRef())
	// const [value, setValue] = useState({ value: null, date: null })
	// const [medianValue, setMedianValue] = useState({ value: null, date: null })

	//usePrevious
	const prevId = usePrevious(props.id)
	let prevData = usePrevious(deviceData)
	let prevLoading = usePrevious(props.loading)
	let prevFullScreen = usePrevious(fsLG)
	//Const

	//useCallbacks

	//useEffects
	const setLines = useCallback((lineState) => {
		dispatch(setGraphLines(lineState))
	}, [dispatch])

	const setLine = useCallback((id, value) => {
		dispatch(setGraphLine(id, value))
	}, [dispatch])

	useEffect(() => {
		dispatch(getDeviceData(2641, period, 'co2'));
	}, [dispatch, period]);

	useLayoutEffect(() => {
		const genNewLine = () => {
			/**
			 * Generate state in redux
			 **/
			let lineState = {}
			 if (deviceData[props.id] &&
			 	(Object.keys(graphLines).length === 0 || Object.keys(graphLines).length !== Object.keys(lineState).length)) {

			 	deviceData[props.id].forEach(line => {
					// 		if (!line.noMedianLegend && line.median) {
					// 			lineState['Median' + line.name] = true
					// 			lineState['L' + line.name] = line.hidden ? true : false
					// 			lineState['MedianfsLG' + line.name] = line.hidden ? true : false
					// 			lineState['LfsLG' + line.name] = line.hidden ? true : false
					// 		}
					// 		else {
					// 			lineState['L' + line.name] = line.hidden ? true : false
					// 			lineState['LfsLG' + line.name] = line.hidden ? true : false
					// 		}
				 });

			 	setLines(lineState);
			}

			let cProps = {
				unit: 'tons',
				id: props.id,
				data: deviceData,
				setLine: setLine,
				// setTooltip: setValue,
				// setMedianTooltip: setMedianValue,
				period: period,
				// weatherData: weatherData,
				fsLG: props.fullScreen
			}

			// if (props.fullScreen) {
			// 	line = new d3LineFS(lineChartContainer.current, cProps, classes)
			// }
			// else {
			line = new d3Line(lineChartContainer.current, cProps, classes)
			// }
		}
		console.log(deviceData);
		if (deviceData && (props.id !== prevId) && line && lineChartContainer.current) {
			genNewLine()
		}

		if (deviceData && ((lineChartContainer.current && !line && !props.loading) || ((prevLoading !== props.loading) && !props.loading))) {
			genNewLine()
		}

		let resizeTimer
		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				genNewLine()
			}, 300)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}

	}, [classes, setLine, prevId, props.id, deviceData, period, prevData, props.loading, prevLoading, mUnit, fsLG, graphLines, setLines, prevFullScreen, props.fullScreen])//weatherData

	//Handlers

	return (
		loading ? <CircularLoader fill /> :
			<div style={{ width: '100%', height: '100%' }}>
				{/* <Tooltip fs={props.fullScreen} tooltip={value} id={props.id} unit={mUnit} /> */}
				{/* <MedianTooltip fs={props.fullScreen} tooltip={medianValue} id={props.id} unit={mUnit} /> */}
				<svg id={props.fullScreen ? props.id + 'fsLG' : props.id} ref={lineChartContainer}
					style={{
						width: '100%',
						height: '90%',
						minHeight: 300
					}}>

				</svg>
				{/* <Legend graphLines={graphLines} fullScreen={props.fullScreen} id={props.id} data={deviceData} /> */}
			</div>
	)
}

export default BuildingLineGraph;

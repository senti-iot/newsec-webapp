import React, { useRef, useLayoutEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import d3Line from './d3Line';
import usePrevious from 'hooks/usePrevious';
import lineGraphStyles from 'styles/lineGraphStyles';
import { setGraphLine, setGraphLines } from 'redux/appState';
import CircularLoader from 'components/CircularLoader';
import Tooltip from 'components/customComponents/Tooltip';

let line = null

const BuildingLineGraph = (props) => {
	//Hooks
	const classes = lineGraphStyles();
	const dispatch = useDispatch();
	//Redux
	const deviceData = useSelector(s => s.lineData);
	const weatherData = useSelector(s => s.lineData.weatherData);
	const period = useSelector(s => s.dateTime.period);
	const mUnit = useSelector(s => s.settings.mUnit);
	const graphLines = useSelector(s => s.appState.lines);
	const loading = useSelector(s => s.lineData.loading);
	//State
	const lineChartContainer = useRef(React.createRef());
	const [value, setValue] = useState({ value: null, date: null });
	const [tooltipType, setTooltipType] = useState('');

	//usePrevious
	const prevId = usePrevious(props.id)

	//Const

	//useCallbacks

	//useEffects
	const setLines = useCallback((lineState) => {
		dispatch(setGraphLines(lineState))
	}, [dispatch])

	const setLine = useCallback((id, value) => {
		dispatch(setGraphLine(id, value))
	}, [dispatch])

	useLayoutEffect(() => {
		const genNewLine = () => {
			/**
			 * Generate state in redux
			 **/
			let lineState = {}
			 if (deviceData[props.id] &&
			 	(Object.keys(graphLines).length === 0)) /* || Object.keys(graphLines).length !== Object.keys(lineState).length) */  {
			 	deviceData[props.id].forEach(line => {
					if (!line.noMedianLegend && line.median) {
						// lineState['Median' + line.name] = true
						lineState['L' + line.name] = line.hidden ? true : false
						// lineState['MedianfsLG' + line.name] = line.hidden ? true : false
						// lineState['LfsLG' + line.name] = line.hidden ? true : false
					}
					else {
						lineState['L' + line.name] = line.hidden ? true : false
						// lineState['LfsLG' + line.name] = line.hidden ? true : false
					}
				 });

			 	setLines(lineState);
			}

			let cProps = {
				unit: 'G pr. m2',
				id: props.id,
				data: deviceData,
				setLine: setLine,
				setTooltip: setTooltip,
				setMedianTooltip: () => { console.log('MedianTooltip')},
				period: period,
				weatherData: weatherData,
				building: props.building,
			}
			line = new d3Line(lineChartContainer.current, cProps, classes)
		}
		if ((props.id !== prevId) && line && lineChartContainer.current) {
			console.log('Generate Line because of id')
			genNewLine()
		}

		if (lineChartContainer.current && !line && !loading) {
			console.log('Generate Line because of no line')
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
			line = null
		}

	}, [classes, setLine, prevId, props.id, deviceData, period, loading, mUnit, graphLines, setLines, weatherData, props.building]);

	//Handlers
	const setTooltip = (value, lineName) => {
		setValue(value);
		setTooltipType(lineName);
	}

	return (

		loading ? <CircularLoader fill style={{ minHeight: 500 }}/> : <div style={{ width: '100%', height: '100%' }}>
			<Tooltip tooltip={value} id={props.id} tooltipType={tooltipType} />
			<svg id={props.id} ref={lineChartContainer}
				style={{
					width: '100%',
					height: '500px',
				}}>
			</svg>
		</div>
	)
}
let rmBuildingLineGraph = React.memo(BuildingLineGraph)
export default rmBuildingLineGraph;

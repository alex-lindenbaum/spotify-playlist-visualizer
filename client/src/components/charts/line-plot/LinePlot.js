import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';

import Button from '../../button';
import Select from '../../forms/select';
import Option from '../../forms/option';

import FeaturesUtil from '../../../util/features-util';

const LinePlot = ({ workspace }) => {
    const { tracks, audioFeatures } = workspace;

    const [axes, setAxes] = useState({ x: 'track', y: 'tempo' });
    const [start, setStart] = useState(0);
    const [step, setStep] = useState(tracks.length);

    const isTrack = () => axes.x === 'track';

    const tracksLength = () => {
        if (tracks.length === 0)
            return 0;

        if (isTrack())
            return tracks.length;

        const index = audioFeatures['duration_ms'].length - 1;
        return FeaturesUtil.getDurationArray(audioFeatures)[index] + audioFeatures['duration_ms'][index];
    };

    const shiftFirst = () => setStart(0);
    const shiftLeft = () => setStart(Math.max(start - step, 0));
    const shiftRight = () => setStart(Math.min(start + step, tracksLength() - step));
    const shiftLast = () => setStart(tracksLength() - step);

    const toggleXAxis = () => {
        setStart(0);

        if (isTrack()) {
            setAxes({ x: 'duration_ms', y: axes.y });
            const index = audioFeatures['duration_ms'].length - 1;
            setStep(FeaturesUtil.getDurationArray(audioFeatures)[index] + audioFeatures['duration_ms'][index]);
        } else {
            setAxes({ x: 'track', y: axes.y });
            setStep(tracks.length);
        }
    };

    const prepareAndSlice = () => {
        const data = FeaturesUtil.prepareScatterData(audioFeatures, axes.x, axes.y);

        if (isTrack())
            return {points: data.slice(start, start + step), labels: tracks.slice(start, start + step).map(track => track.name)};

        const points = [], labels = [];
        data.forEach((point, index) => {
            if (point.x >= start && point.x <= start + step) {
                points.push(point);
                labels.push(tracks[index].name);
            }
        });

        return { points, labels };
    }

    const generateDataset = () => {
        const labeledData = prepareAndSlice();

        return {
            label: labeledData.labels,
            datasets: [{
                label: axes.y.charAt(0).toUpperCase() + axes.y.substr(1),
                pointBackgroundColor: '#c8134f',
                pointRadius: 5,
                borderColor: '#c8134f',
                showLine: true,
                fill: false,
                data: labeledData.points
            }]
        };
    };

    const generateOptions = () => {
        return {
            maintainAspectRatio: false,
            responsive: true,
            hover: {
                mode: 'nearest',
                intersect: true
            },
            tooltips: {
                enabled: true,
                intersect: false,
                mode: 'index',
                callbacks: {
                    label: (tooltipItem, data) => (data.label[tooltipItem.index]),
                    afterLabel: (tooltipItem, data) => (data.datasets[0].label + ': ' + tooltipItem.yLabel)
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: isTrack() ? 'Track' : 'Duration (ms)',
                        fontFamily: 'Segoe UI',
                        fontSize: 14
                    },
                    gridLines: { display: false },
                    ticks: { beginAtZero: !isTrack() }
                }],
                yAxes: [{
                    display: true,
                    gridLines: { display: false },
                    ticks: { beginAtZero: true }
                }]
            },
            legend: { display: false }
        };
    };

    return (
        <>
            <div style={{ width: '75vw', height: '75vh' }}>
                <Scatter data={generateDataset()} options={generateOptions()} />
            </div>

            <Button small onClick={shiftFirst}>first</Button>
            <Button small onClick={shiftLeft}>left</Button>
            <Button small onClick={shiftRight}>right</Button>
            <Button small onClick={shiftLast}>last</Button>
            <Button small onClick={toggleXAxis}>Toggle X Axis</Button>

            <Select value={axes.y} onChange={e => setAxes({ x: axes.x, y: e.target.value })}>
                {FeaturesUtil.FEATURES.map(key => <Option key={key} value={key}>{key}</Option>)}
            </Select>
        </>
    );
};

export default LinePlot;
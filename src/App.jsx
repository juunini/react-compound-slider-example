import React, { useState } from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import ValueViewer from "./ValueViewer";
import { SliderRail, Handle, Track } from "./components";

const sliderStyle = {
  position: "relative",
  width: "100%",
  touchAction: "none"
};

const domain = [100, 500];
const defaultValues = [150];

export default function App() {
  const [state, setState] = useState({
    values: defaultValues.slice(),
    update: defaultValues.slice()
  });

  const onUpdate = (update) => setState({ update });
  const onChange = (values) => setState({ values });

  return (
    <div style={{ height: 120, width: "100%" }}>
      <ValueViewer values={state.values} update={state.update} />
      <Slider
        mode={1}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        values={state.values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
}

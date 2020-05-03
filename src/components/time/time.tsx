import React from "react";
import styled from "styled-components";
import { getHours, getMinutes, getSeconds } from "./timeFormat";
import moment from "moment";

interface Props {
  time: moment.Moment;
  displaySeconds?: boolean;
}

const Time : React.FC<Props> = ({ time, displaySeconds = false }) => {
  if (!time || !time.isValid()) return <span></span>;
  return (
    <span>
      <span>{getHours(time)}</span>
      <span>h</span>
      <span>{getMinutes(time)}</span>
      {displaySeconds && (
        <>
          <Seconds>{getSeconds(time)}</Seconds>
        </>
      )}
    </span>
  );
};

const Seconds = styled.span`
  font-size: 70%;
  position: relative;
  top: -0.3rem;
  margin-left: 0.1rem;
`;

export default Time;

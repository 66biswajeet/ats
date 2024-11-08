import React from "react";
import styled from "styled-components";

const GaugeMeter = ({ value, min = 0, max = 100 }) => {
  const angle = ((value - min) / (max - min)) * 180;

  return (
    <GaugeContainer>
      <svg viewBox="0 0 200 100">
        <path
          d="M20 90 A 70 70 0 0 1 180 90"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="20"
        />
        <path
          d="M20 90 A 70 70 0 0 1 180 90"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="20"
          strokeDasharray="251"
          strokeDashoffset={251 - (angle / 180) * 251}
        />
        <defs>
          <linearGradient id="gradient">
            {/* <stop offset="0%" stopColor="var(--third-color)" />
            <stop offset="50%" stopColor="var(--secondary-color)" />
            <stop offset="100%" stopColor="var(--primary-color)" /> */}
            <stop offset="0%" stopColor="red" />
            <stop offset="50%" stopColor="yellow" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
        <NeedleContainer>
          <Needle transform={`rotate(${angle} 100 90)`} />
        </NeedleContainer>
        <text x="100" y="85" textAnchor="middle" fontSize="15" fill="#333">
          {value}
        </text>
      </svg>
      <Labels>
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </Labels>
    </GaugeContainer>
  );
};

const GaugeContainer = styled.div`
  width: 300px;
  position: relative;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: -20px;

  span {
    font-size: 14px;
    color: #666;
  }
`;

const NeedleContainer = styled.g`
  transform-origin: 100px 90px;
  transition: transform 0.5s ease-out;
`;

const Needle = styled.path`
  d: M 95 90 L 100 10 L 105 90 Z;
  fill: #333;
`;

export default GaugeMeter;

import React from "react";

const Snus = props => {
  return (
    <div className="snus" style={{backgroundImage: `url(${props.background})`, backgroundPosition: 'center'}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <defs>
        <linearGradient
          id="gradient-0"
          x1="247.432"
          x2="247.432"
          y1="132.493"
          y2="438.839"
          gradientTransform="matrix(1.50098 .0035 -.00296 1.27006 -123.237 -69.23)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FCFCFC"></stop>
          <stop offset="1" stopColor="#DBDBDB"></stop>
        </linearGradient>
        <linearGradient
          id="gradient-1"
          x1="247.432"
          x2="247.432"
          y1="132.493"
          y2="438.839"
          gradientTransform="matrix(1.3762 .0032 -.00272 1.16449 -92.596 -41.424)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FCFCFC"></stop>
          <stop offset="1" stopColor="#DBDBDB"></stop>
        </linearGradient>
        <style>
          @import
          url(https://fonts.googleapis.com/css2?family=Black+Han+Sans%3Aital%2Cwght%400%2C400&amp;display=swap);
        </style>
      </defs>
      <ellipse
        className="firstEllipse"
        cx="246.854"
        cy="259.08"
        fill="url(#gradient-0)"
        stroke="#000"
        strokeOpacity="0"
        paintOrder="stroke"
        rx="229.455"
        ry="229.91"
      ></ellipse>
      <ellipse
        cx="246.731"
        cy="259.593"
        fill="url(#gradient-1)"
        stroke="#000"
        strokeOpacity="0.36"
        paintOrder="fill"
        rx="210.383"
        ry="210.799"
      ></ellipse>
      <ellipse
        style={{fill: props.color}}
        cx="245.418"
        cy="261.021"
        stroke="#000"
        strokeOpacity="0"
        paintOrder="stroke"
        rx="190.987"
        ry="191.365"
      ></ellipse>
      <text
        style={{ whiteSpace: "pre" }}
        x="253.505"
        y="285.134"
        fill="#FFF"
        fontFamily="Black Han Sans"
        fontSize="41.5"
        textAnchor="middle"
      >
        {props.name}
      </text>
      <text
        style={{ whiteSpace: "pre" }}
        x="252.599"
        y="195.039"
        fill="#FFF"
        fontFamily="Black Han Sans"
        fontSize="31.7"
        textAnchor="middle"
      >
        SERIE NO. X
      </text>
      <text
        style={{ whiteSpace: "pre" }}
        x="243.53"
        y="354.66"
        fill="#FFF"
        fontFamily="Black Han Sans"
        fontSize="15.7"
        textAnchor="middle"
      >
        Med smak av {"\n"}
        "{props.flavour}"
      </text>
    </svg>
    </div>
  );
}

export default Snus;

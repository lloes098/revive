import styles from './IsometricMap.module.css'

export default function IsometricMap() {
  return (
    <div className={styles.mapContainer}>
      <svg
        viewBox="0 0 300 200"
        className={styles.map}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Roads */}
        <path
          d="M50 150 L250 150 M150 50 L150 150"
          stroke="#9E9E9E"
          strokeWidth="3"
          fill="none"
        />

        {/* Building 1 - VINTAGE (Orange) */}
        <g transform="translate(80, 100)">
          <polygon
            points="0,30 20,20 20,50 0,60"
            fill="#FF9800"
            stroke="#E68900"
            strokeWidth="1"
          />
          <polygon
            points="20,20 30,15 30,45 20,50"
            fill="#FFB74D"
            stroke="#E68900"
            strokeWidth="1"
          />
          <text
            x="10"
            y="45"
            fontSize="8"
            fill="white"
            fontWeight="bold"
            textAnchor="middle"
          >
            VINTAGE
          </text>
          {/* Scroll icon */}
          <circle cx="15" cy="15" r="3" fill="white" />
        </g>

        {/* Building 2 - RECORDS (Teal) */}
        <g transform="translate(150, 80)">
          <polygon
            points="0,50 25,40 25,80 0,90"
            fill="#4DB6AC"
            stroke="#26A69A"
            strokeWidth="1"
          />
          <polygon
            points="25,40 35,35 35,75 25,80"
            fill="#80CBC4"
            stroke="#26A69A"
            strokeWidth="1"
          />
          <text
            x="12.5"
            y="70"
            fontSize="8"
            fill="white"
            fontWeight="bold"
            textAnchor="middle"
          >
            RECORDS
          </text>
          {/* Spool icon */}
          <circle cx="17.5" cy="25" r="4" fill="white" />
          <circle cx="17.5" cy="25" r="2" fill="#4DB6AC" />
        </g>

        {/* Building 3 - BOOKS (Yellow) */}
        <g transform="translate(200, 110)">
          <polygon
            points="0,25 18,18 18,48 0,55"
            fill="#FFC107"
            stroke="#FFA000"
            strokeWidth="1"
          />
          <polygon
            points="18,18 26,15 26,45 18,48"
            fill="#FFD54F"
            stroke="#FFA000"
            strokeWidth="1"
          />
          <text
            x="9"
            y="42"
            fontSize="8"
            fill="white"
            fontWeight="bold"
            textAnchor="middle"
          >
            BOOKS
          </text>
          {/* Flame icon */}
          <path
            d="M13 8 L13 12 L11 14 L13 16 L11 18 L13 20 L15 18 L13 16 L15 14 L13 12 Z"
            fill="white"
          />
        </g>

        {/* Building 4 - Small building with flame */}
        <g transform="translate(50, 120)">
          <polygon
            points="0,20 15,15 15,45 0,50"
            fill="#9E9E9E"
            stroke="#757575"
            strokeWidth="1"
          />
          <polygon
            points="15,15 22,12 22,42 15,45"
            fill="#BDBDBD"
            stroke="#757575"
            strokeWidth="1"
          />
          <path
            d="M11 5 L11 8 L9 10 L11 12 L9 14 L11 16 L13 14 L11 12 L13 10 L11 8 Z"
            fill="#FF6F00"
          />
        </g>

        {/* Building 5 - Small building with book */}
        <g transform="translate(220, 130)">
          <polygon
            points="0,15 12,12 12,42 0,45"
            fill="#795548"
            stroke="#5D4037"
            strokeWidth="1"
          />
          <polygon
            points="12,12 18,10 18,40 12,42"
            fill="#A1887F"
            stroke="#5D4037"
            strokeWidth="1"
          />
          <rect x="5" y="8" width="4" height="6" fill="white" />
        </g>
      </svg>
    </div>
  )
}





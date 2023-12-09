import '../../../markup/css/spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-container" data-testid={'spinner'}>
      <svg
        width="100%"
        viewBox="0 0 276 276"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="spinner">
          <circle
            id="upper"
            cx="138"
            cy="138"
            r="123"
            stroke="#fff"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="373 100"
          />
        </g>
      </svg>
      <p></p>
    </div>
  );
}

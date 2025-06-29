import './DiceFace.css';

const DiceFace = ({ value, isRolling }) => {
  const dots = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
  };

  return (
    <svg
      className={`dice ${isRolling ? 'rolling' : ''}`}
      viewBox="0 0 120 120"
    >
      <rect width="120" height="120" rx="15" fill="#fff" stroke="#000" strokeWidth="4" />
      {dots[value].map(([row, col], idx) => (
        <circle
          key={idx}
          cx={30 + col * 30}
          cy={30 + row * 30}
          r="8"
          fill="black"
        />
      ))}
    </svg>
  );
};


export default DiceFace;

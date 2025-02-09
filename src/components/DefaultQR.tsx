export default function DefaultQR() {
  return (
    <div className="default-qr">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        className="dark:fill-gray-700 fill-gray-200"
      >
        {/* Top-left block */}
        <path d="M0,200h200V0H0v200ZM50,50h100v50h-50v50h-50V50Z" />
        {/* Top-right block */}
        <path d="M300,0v200h200V0h-200Zm150,100h-50v50h-50V50h100v50Z" />
        {/* Bottom-left block */}
        <path d="M0,500h200v-200H0v200Zm50-150h100v50h-50v50h-50v-100Z" />
        {/* Middle small squares */}
        <rect x="300" y="300" width="50" height="50" />
        <rect x="450" y="300" width="50" height="50" />
        <rect x="375" y="367.4" width="50" height="50" />
        <rect x="300" y="425" width="50" height="50" />
        <rect x="375" y="450" width="50" height="50" />
        <rect x="450" y="425" width="50" height="50" />
      </svg>
    </div>
  );
}

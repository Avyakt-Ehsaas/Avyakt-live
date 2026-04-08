import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F3FAF1] overflow-hidden">

      {/* Floating leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-40 animate-leaf"
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            🍃
          </span>
        ))}
      </div>

      {/* glowing aura */}
      <div className="absolute w-[500px] h-[500px] bg-[#B6E2AA] opacity-20 rounded-full blur-[120px] animate-pulse"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* breathing circle */}
        <div className="relative mb-10">
          <div className="w-48 h-48 rounded-full bg-[#B6E2AA] opacity-50 animate-breathe"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-green-800">404</h1>
            <p className="text-sm text-green-900 mt-1">Lost in the moment</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Take a deep breath…
        </h2>

        <p className="text-gray-600 mt-3 max-w-md leading-relaxed">
          The page you’re looking for doesn’t exist.  
          Just like meditation, sometimes getting lost helps us find the right path.
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-3 rounded-full bg-[#B6E2AA] text-green-900 font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all"
        >
          Return to Calm
        </Link>
      </div>

      {/* animations */}
      <style>
        {`
        @keyframes breathe {
          0%,100% { transform: scale(0.85); opacity:0.5; }
          50% { transform: scale(1.15); opacity:0.8; }
        }

        .animate-breathe{
          animation: breathe 6s ease-in-out infinite;
        }

        @keyframes leaf {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity:0;
          }
          30%{
            opacity:0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity:0;
          }
        }

        .animate-leaf{
          animation: leaf 14s linear infinite;
        }
        `}
      </style>

    </div>
  );
};

export default ErrorPage;
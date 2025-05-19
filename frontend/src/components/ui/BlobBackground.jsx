import { useTheme } from "./ThemeContext"; // Adjust path if needed

export default function BlobBackground() {
  const { isDark } = useTheme();

  const blobs = isDark
    ? [
        { bg: "bg-pink-500", opacity: "opacity-30", size: "w-[350px] h-[350px]", position: "top-[-80px] right-[-80px]" },
        { bg: "bg-sky-400", opacity: "opacity-20", size: "w-[280px] h-[280px]", position: "top-[40%] left-[-100px] delay-2000" },
        { bg: "bg-purple-600", opacity: "opacity-20", size: "w-[280px] h-[280px]", position: "top-[50%] right-[-100px] delay-3000" },
        { bg: "bg-orange-400", opacity: "opacity-20", size: "w-[300px] h-[300px]", position: "bottom-[-100px] left-1/2 transform -translate-x-1/2 delay-4000" },
      ]
    : [
        { bg: "bg-blue-200", opacity: "opacity-30", size: "w-[300px] h-[300px]", position: "top-[-60px] right-[-60px]" },
        { bg: "bg-cyan-100", opacity: "opacity-20", size: "w-[250px] h-[250px]", position: "top-[40%] left-[-80px] delay-2000" },
        { bg: "bg-purple-200", opacity: "opacity-20", size: "w-[250px] h-[250px]", position: "top-[50%] right-[-80px] delay-3000" },
        { bg: "bg-orange-200", opacity: "opacity-20", size: "w-[270px] h-[270px]", position: "bottom-[-80px] left-1/2 transform -translate-x-1/2 delay-4000" },
      ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute ${blob.size} ${blob.bg} ${blob.opacity} blur-[60px] ${blob.position} rounded-full animate-blob`}
        />
      ))}
    </div>
  );
}

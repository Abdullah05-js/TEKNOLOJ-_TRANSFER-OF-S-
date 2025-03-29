const Toast = ({ text, isVisible }) => {
    return (
        <div className={`absolute top-10 right-10 min-w-28 bg-black border-2 rounded-lg p-2 z-50 border-green-300 ${isVisible ? "block" : "hidden"}`}>
            <p className="text-xl font-bold text-white break-words text-left line-clamp-3 text-wrap">{text}</p>
        </div>
    );
}

export default Toast;

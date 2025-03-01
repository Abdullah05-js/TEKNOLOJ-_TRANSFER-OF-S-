const Toast = ({ text, isVisible }) => {
    return (
        <div className={`absolute top-10 right-10 min-w-28 bg-black border-2 rounded-lg p-2 z-50 border-green-300 ${isVisible ? "block" : "hidden"}`}>
            <h1 className="text-xl font-bold text-white">{text}</h1>
        </div>
    );
}

export default Toast;

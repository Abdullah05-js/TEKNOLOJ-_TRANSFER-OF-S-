import React, { useState, useEffect } from 'react';
import Input from './Uİ/Input';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr';
import { format } from 'date-fns';

// Register Turkish locale
registerLocale('tr', tr);

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        description: '',
        deadline: new Date(),
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Custom styles for the date picker
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button
            className="text-white bg-transparent hover:border-green-300 hover:border-2 rounded-xl border-white border-2 p-2 focus:border-green-300 focus:border-2 outline-none min-w-[200px] text-left"
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ));

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setError(null);
            const fetchedTodos = await window.electron.ipcRenderer.invoke('GetUserTodos');
            console.log('Fetched todos:', fetchedTodos);
            if (Array.isArray(fetchedTodos)) {
                setTodos(fetchedTodos);
            } else {
                console.error('Unexpected todos format:', fetchedTodos);
                setError('Görevler beklenmeyen bir formatta geldi.');
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            setError('Görevler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.description || !newTodo.deadline) return;

        try {
            setError(null);
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
                return;
            }

            const todoData = {
                description: newTodo.description,
                deadline: newTodo.deadline.toISOString(),
                userId,
                completed: false
            };

            console.log('Creating todo with data:', todoData);
            const createdTodo = await window.electron.ipcRenderer.invoke('CreateTodo', todoData);
            console.log('Created todo:', createdTodo);
            if (createdTodo) {
                setTodos(prevTodos => [createdTodo, ...prevTodos]);
                setNewTodo({
                    description: '',
                    deadline: new Date()
                });
            } else {
                setError('Görev oluşturulamadı.');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
            setError('Görev eklenirken bir hata oluştu.');
        }
    };

    const toggleTodo = async (todoId, currentStatus) => {
        try {
            setError(null);
            const updatedTodo = await window.electron.ipcRenderer.invoke('UpdateTodoStatus', {
                todoId,
                completed: !currentStatus
            });

            if (updatedTodo) {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === todoId ? updatedTodo : todo
                    )
                );
            } else {
                setError('Görev durumu güncellenemedi.');
            }
        } catch (error) {
            console.error('Error updating todo status:', error);
            setError('Görev durumu güncellenirken bir hata oluştu.');
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            setError(null);
            const success = await window.electron.ipcRenderer.invoke('DeleteTodo', todoId);
            if (success) {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
            } else {
                setError('Görev silinemedi.');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Görev silinirken bir hata oluştu.');
        }
    };

    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <h2 className='text-2xl text-green-300'>Yükleniyor...</h2>
            </div>
        );
    }

    return (
        <div className='w-screen h-screen overflow-hidden flex flex-col justify-start items-center gap-7 p-6'>
            <h1 className='text-3xl font-bold text-green-300'>Görev Listesi</h1>
            
            {error && (
                <div className='w-full max-w-2xl p-4 bg-red-500/10 border-2 border-red-500 rounded-xl'>
                    <p className='text-red-500 text-center'>{error}</p>
                </div>
            )}
            
            {/* Add Todo Form */}
            <form onSubmit={handleAddTodo} className='w-full max-w-2xl flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <Input
                        type="text"
                        placeholder="Görev açıklaması"
                        value={newTodo.description}
                        onchange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    />
                    <DatePicker
                        selected={newTodo.deadline}
                        onChange={(date) => setNewTodo({ ...newTodo, deadline: date })}
                        dateFormat="dd/MM/yyyy"
                        locale="tr"
                        customInput={<CustomInput />}
                        minDate={new Date()}
                    />
                    <button 
                        type="submit"
                        className='px-6 py-2 bg-green-300 text-black rounded-xl font-bold hover:bg-green-400 transition-colors'
                    >
                        Ekle
                    </button>
                </div>
            </form>

            {/* Todo List */}
            <div className='w-full max-w-2xl flex flex-col gap-3 overflow-y-auto'>
                {todos.map(todo => (
                    <div 
                        key={todo._id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                            todo.completed ? 'border-green-300 bg-green-300/10' : 'border-white'
                        }`}
                    >
                        <div className='flex items-center gap-4'>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo._id, todo.completed)}
                                className='h-6 w-6 accent-green-300'
                            />
                            <div className={`flex flex-col ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                <span className='font-medium'>{todo.description}</span>
                                <div className='text-sm flex gap-4'>
                                    <span>Oluşturan: {todo.userId.UserName}</span>
                                    <span>Oluşturma: {new Date(todo.createdAt).toLocaleDateString('tr-TR')}</span>
                                    <span>Bitiş: {new Date(todo.deadline).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo._id)}
                            className='text-red-500 hover:text-red-600 transition-colors'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Custom styles for the date picker */}
            <style>{`
                .react-datepicker {
                    background-color: black !important;
                    border: 2px solid #00ff88 !important;
                    border-radius: 0.75rem !important;
                    font-family: inherit !important;
                }
                .react-datepicker__header {
                    background-color: black !important;
                    border-bottom: 1px solid #00ff88 !important;
                }
                .react-datepicker__current-month,
                .react-datepicker__day-name {
                    color: #00ff88 !important;
                }
                .react-datepicker__month {
                    background-color: black !important;
                }
                .react-datepicker__day {
                    color: white !important;
                }
                .react-datepicker__day:hover {
                    background-color: #00ff88 !important;
                    color: black !important;
                }
                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    background-color: #00ff88 !important;
                    color: black !important;
                }
                .react-datepicker__day--disabled {
                    color: #666 !important;
                }
                .react-datepicker__triangle {
                    display: none !important;
                }
                .react-datepicker-popper {
                    padding-top: 0 !important;
                }
                .react-datepicker__navigation-icon::before {
                    border-color: #00ff88 !important;
                }
                .react-datepicker__navigation:hover *::before {
                    border-color: white !important;
                }
            `}</style>
        </div>
    );
};

export default TodoList; 
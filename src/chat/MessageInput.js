import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, Timestamp, getDocs, query, where, writeBatch } from 'firebase/firestore'; // Добавляем необходимые импорты
import { db } from '../firebase/firebaseConfig';
import { ReactComponent as BarsIcon } from '../icons/bars-solid.svg';
import '../styles/MessageInput.css';

const MessageInput = ({ addMessage, clearMessages }) => {
  const [inputText, setInputText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      try {
        const newMessage = {
          text: inputText,
          sender: 'User',
          createdAt: Timestamp.fromDate(new Date()),
        };
  
        await addDoc(collection(db, 'messages'), newMessage);
  
        addMessage(newMessage);
  
        setInputText('');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClearChat = async () => {
    try {
      // Запрос для удаления всех сообщений, отправленных пользователем 'User'
      const q = query(collection(db, 'messages'), where('sender', '==', 'User')); // Можно адаптировать для конкретного пользователя

      // Получаем все сообщения, которые нужно удалить
      const querySnapshot = await getDocs(q);

      // Создаем пакет для удаления
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref); // Удаляем каждое сообщение
      });

      // Применяем пакетное удаление
      await batch.commit();

      // Очищаем локальные сообщения
      clearMessages();
      setShowDropdown(false);
    } catch (error) {
      console.error("Ошибка при очистке чата: ", error);
    }
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="message-input">
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-button" onClick={toggleDropdown}>
          <BarsIcon className={showDropdown ? 'icon-rotate' : ''} />
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleClearChat}>Очистить чат</button>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default MessageInput;

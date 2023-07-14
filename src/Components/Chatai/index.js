import styles from './chatai.module.css';
import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        role: 'user',
        content: inputValue
      };

      setMessages([...messages, newMessage]);
      setInputValue('');

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [...messages, newMessage]
          })
        });

        if (response.status === 401) {
          throw new Error('Error de autenticación');
        }

        if (!response.ok) {
          throw new Error('Error al enviar el mensaje');
        }

        const data = await response.json();

        const botResponse = {
          role: 'bot',
          content: data.data.choices[0].message.content
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error de envío o recepción de mensajes
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className={`message ${message.role}`}>
            {message.content}
          </li>
        ))}
      </ul>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;

import React from 'react';
import './FrontPage.css';

function FrontPage() {
  return (
    <div className="container">
            <header className="header">
                <h1>Psedu Chatbot</h1>
                <p>Nothing here.</p>
            </header>
            <main className="main-content">
                <button className="nav-button" onClick={() => window.location.href= '/main/index.html'}>
                    Go to Chatbot
                </button>
            </main>
        </div>
  );
}

export default FrontPage;
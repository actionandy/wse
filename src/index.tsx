import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Details from './pages/Details';
import Movies from './pages/Movies';
import Header from './components/Header';
import Footer from './components/Footer';
import {MovieContextProvider} from './components/Movie/MovieContext';

ReactDOM.render(
    <BrowserRouter>

      <Header />
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <MovieContextProvider>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/filme/:id/:title" element={<Details />} />
          </Routes>
        </MovieContextProvider>

      </div>
      <Footer />

    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

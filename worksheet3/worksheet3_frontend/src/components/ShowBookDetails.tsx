'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function ShowBookDetails() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8082/api/books/${id}`)
      .then((res) => res.json())
      .then((json) => setBook(json))
      .catch((err) => {
        console.log('Error from ShowBookDetails: ' + err);
      });
  }, [id]);

  const onDeleteClick = (id: string) => {
    fetch(`http://localhost:8082/api/books/${id}`, { method: 'DELETE' })
      .then(() => {
        navigate.push('/');
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails_deleteClick: ' + err);
      });
  };

  const BookItem = (
    <div>
      <table className='table table-hover table-dark table-striped table-bordered'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          {/* Add more table rows to display other book properties */}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link href='/' className='btn btn-info'>
              Back to Home
            </Link>
            <br />
            <br />
            <h1 className='display-4 text-center'>Book Details</h1>
            {BookItem}
            <br />
            <button
              className='btn btn-danger btn-lg btn-block'
              onClick={() => onDeleteClick(id)}
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;

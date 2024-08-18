import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function UpdateBookInfo() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetch('process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`')
      .then((res) => res.json())
      .then((json) => setBook(json))
      .catch((err) => {
        console.log('Error from UpdateBookInfo: ' + err);
      });
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        console.log('Updated:', res);
        router.push(`/show-book/${id}`);
      })
      .catch((err) => {
        console.log('Error from onSubmit:', err);
      });
  };

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link href="/" className="btn btn-info">
              Back to Home
            </Link>
            <br />
            <br />
            <h1 className="display-4 text-center">Edit Book</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Description"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={handleChange}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;

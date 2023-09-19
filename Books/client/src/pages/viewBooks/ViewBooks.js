import React, { useEffect, useState } from "react";
import SingleBook from "../../components/singleBook/SingleBook";
import { axiosClient } from ".././../utils/axiosClient";

function ViewBooks() {
  async function getAllBooks()
  {
    const Books=await axiosClient.get('/all');
    setAllBooks(Books.data.allBooks)
  }
  const [allBooks, setAllBooks] = useState([]);
  useEffect(()=>
  {
    getAllBooks();
  },[])
  return <div className="viewBooks">
    {
     allBooks?.map(book=><SingleBook key={book?.title} book={book}/>)
    }
  </div>;
}

export default ViewBooks;

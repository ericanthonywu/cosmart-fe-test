"use client";

import React, { useEffect, useState } from "react";
import { Books } from "@/model/books";
import { useGetBooksQuery } from "@/repository/books/getBooks";
import { toast } from "react-toastify";
import { useAddScheduleMutation } from "@/repository/schedule/addSchedule";
import moment from "moment";

const BookList = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [genre, setGenre] = useState<string>("love");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(12);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [pickupTime, setPickupTime] = useState<string>("");

    const booksListQuery = useGetBooksQuery({
        genre,
        page,
        limit,
    });

    const addSchedules = useAddScheduleMutation();

    useEffect(() => {
        if (booksListQuery.data) {
            setBooks(booksListQuery.data);
        }
    }, [booksListQuery.data]);

    const openSchedulePopup = (bookKey: string) => {
        setSelectedBook(bookKey);
        setShowPopup(true);
    };

    const closeSchedulePopup = () => {
        setSelectedBook(null);
        setPickupTime("");
        setShowPopup(false);
    };

    const handleAddSchedule = () => {
        if (!pickupTime) {
            toast.error("Please select a pickup time!");
            return;
        }

        if (!selectedBook) {
            return;
        }

        addSchedules.mutate(
            {
                bookKey: selectedBook,
                pickupTime: moment(pickupTime).toISOString(),
            },
            {
                onSuccess: () => {
                    toast.success("Schedule successfully added!");
                    closeSchedulePopup();
                },
                onError: () => {
                    toast.error("Failed to add schedule!");
                },
            }
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Book List</h1>

            {/* Genre Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Books List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book: Books) => (
                    <li
                        key={book.key}
                        className="border p-4 rounded shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-sm text-gray-600">Author(s): {book.authors}</p>
                        <p className="text-sm text-gray-600">
                            Edition Count: {book.editionCount}
                        </p>
                        <button
                            onClick={() => openSchedulePopup(book.key)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Book a Schedule!
                        </button>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`py-2 px-4 rounded ${
                        page === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Previous
                </button>
                <span>
          Page <strong>{page}</strong>
        </span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Next
                </button>
            </div>

            {/* Popup for Scheduling */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Schedule a Pickup</h3>
                        <p className="mb-4 text-gray-700">
                            Set a pickup time for the book: <strong>{selectedBook}</strong>
                        </p>
                        <input
                            type="datetime-local"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="border p-2 w-full rounded mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeSchedulePopup}
                                className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddSchedule}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Add Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
